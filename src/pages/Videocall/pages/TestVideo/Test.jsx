import React from 'react';

class MyWebRTC extends React.Component {
    state = {
        localStream: null,
        remoteStream: null,
        peerConnection: null,
        serverConnection: null,
        serverConnected: false,
    };

    componentDidMount() {
        // Initialize the server connection
        this.serverConnection = new WebSocket('wss://my-webrtc-server.com');
        this.serverConnection.onopen = () => {
            this.setState({ serverConnected: true });
        };

        // Set up the local stream
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                this.setState({ localStream: stream });
            })
            .catch((error) => {
                // Handle error
            });
    }

    createPeerConnection = () => {
        // Create a new peer connection
        const peerConnection = new RTCPeerConnection();

        // Set up event handlers for the connection
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                // Send the candidate to the remote peer
                this.serverConnection.send(
                    JSON.stringify({
                        type: 'candidate',
                        candidate: event.candidate,
                    })
                );
            }
        };
        peerConnection.onaddstream = (event) => {
            // Set the remote stream on state so we can display it in the app
            this.setState({ remoteStream: event.stream });
        };

        // Add the local stream to the peer connection
        peerConnection.addStream(this.state.localStream);

        // Save the peer connection on state
        this.setState({ peerConnection });
    };

    createOffer = () => {
        // Create an offer to send to the remote peer
        this.state.peerConnection
            .createOffer()
            .then((offer) => {
                // Set the local description on the peer connection
                this.state.peerConnection.setLocalDescription(offer);

                // Send the offer to the remote peer
                this.serverConnection.send(
                    JSON.stringify({
                        type: 'offer',
                        offer,
                    })
                );
            })
            .catch((error) => {
                // Handle error
            });
    };

    handleServerMessage = (message) => {
        // Parse the message from the server
        const { type, offer, answer, candidate } = JSON.parse(message.data);

        // Handle the different message types
        switch (type) {
            case 'offer':
                // Create the peer connection if it doesn't exist yet
                if (!this.state.peerConnection) {
                    this.createPeerConnection();
                }

                // Set the remote description on the peer connection
                this.state.peerConnection.setRemoteDescription(
                    new RTCSessionDescription(offer)
                );

                // Create an answer to send back to the remote peer
                this.state.peerConnection
                    .createAnswer()
                    .then((answer) => {
                        // Set the local description on the peer connection
                        this.state.peerConnection.setLocalDescription(answer);
                        // Send the answer to the remote peer
                        this.serverConnection.send(
                            JSON.stringify({
                                type: 'answer',
                                answer,
                            })
                        );
                    })
                    .catch((error) => {
                        // Handle error
                    });
                break;
            case 'answer':
                // Set the remote description on the peer connection
                this.state.peerConnection.setRemoteDescription(
                    new RTCSessionDescription(answer)
                );
                break;
            case 'candidate':
                // Add the candidate to the peer connection
                this.state.peerConnection.addIceCandidate(
                    new RTCIceCandidate(candidate)
                );
                break;
            default:
                // Unknown message type
                break;
        }
    };

    render() {
        return (
            <div>
                {this.state.serverConnected && (
                    <button onClick={this.createOffer}>Create Offer</button>
                )}
                {this.state.localStream && (
                    <video src={this.state.localStream} />
                )}
                {this.state.remoteStream && (
                    <video src={this.state.remoteStream} />
                )}
            </div>
        );
    }
}

export default MyWebRTC;

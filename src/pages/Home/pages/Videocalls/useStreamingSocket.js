import { useEffect } from 'react';
import { API } from 'resources/constants/urls';
import openSocket from 'socket.io-client';
//import adapter from 'webrtc-adapter';

const socket = openSocket(API);
let pc;
let isStarted = false;
let isInitiator = false;
let turnReady;

let pcConfig = {
    iceServers: [
        {
            urls: 'stun:stun.terappy.mx:5349',
        },
        {
            urls: 'turn:turn.terappy.mx:5349',
            credential: 'tdKp3tbOOzWl0vSZ7kGwE97t5',
            username: 'coturn'
        }
    ],
};

// if (window.location.hostname !== 'localhost') {
//     requestTurn('https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913');
// }

// function requestTurn(turnURL) {
//     var turnExists = false;
//     for (var i in pcConfig.iceServers) {
//         if (pcConfig.iceServers[i].urls.substr(0, 5) === 'turn:') {
//             turnExists = true;
//             turnReady = true;
//             break;
//         }
//     }
//     if (!turnExists) {
//         console.log('Getting TURN server from ', turnURL);
//         // No TURN server. Get one from computeengineondemand.appspot.com:
//         var xhr = new XMLHttpRequest();
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 var turnServer = JSON.parse(xhr.responseText);
//                 console.log('Got TURN server: ', turnServer);
//                 pcConfig.iceServers.push({
//                     urls: 'turn:' + turnServer.username + '@' + turnServer.turn,
//                     credential: turnServer.password,
//                 });
//                 turnReady = true;
//             }
//         };
//         xhr.open('GET', turnURL, true);
//         xhr.send();
//     }
// }

export const useStreamingSocket = (localStream, setRemoteStream, setOnCall, remoteStream) => {
    const connectToRoom = (roomId) => {
        socket.emit('create or join', roomId);
    };

    useEffect(() => {
        window.onbeforeunload = () => sendMessage('bye');
    }, []);

    useEffect(() => {
        socket.off('created').on('created', (room, clientId) => {
            console.log('created: ' + room);
            isInitiator = true;
        });

        socket.off('joined').on('joined', (room, clientId) => {
            console.log('joined: ' + room);
        });

        socket.off('join').on('join', (room) => {
            console.log('Another peer made a request to join room ' + room);
            console.log('This peer is the initiator of room ' + room + '!');
        });

        socket.off('ready').on('ready', () => {
            start();
        });

        socket.off('full').on('full', (room) => console.log('Message from client: Room ' + room + ' is full :^('));

        socket.off('ipaddr').on('ipaddr', (ipaddr) => console.log('Message from client: Server IP address is ' + ipaddr));

        socket.off('log').on('log', (array) => console.log.apply(console, array));

        socket.off('message').on('message', (message) => {
            console.log('Client received message:', message);
            if (message.type === 'offer') {
                if (!!pc) {
                    pc.setRemoteDescription(new RTCSessionDescription(message));
                    doAnswer();
                } else {
                    console.log('PeerConnectionNotCreated');
                }
            } else if (message.type === 'answer' && isStarted) {
                pc.setRemoteDescription(new RTCSessionDescription(message));
            } else if (message.type === 'candidate' && isStarted) {
                var candidate = new RTCIceCandidate({
                    sdpMLineIndex: message.label,
                    candidate: message.candidate,
                });
                pc.addIceCandidate(candidate);
            } else if (message === 'bye' && isStarted) {
                handleRemoteHangup();
            }
        });
    });

    function start() {
        console.log('>>>>>> start');
        console.log(localStream);
        if (!isStarted && !!localStream && !pc) {
            console.log('>>>>>> creating peer connection');
            createPeerConnection();
        }
        if (isInitiator && !!pc) {
            pc.addStream(localStream);
            isStarted = true;
            pc.createOffer(
                (sessionDescription) => {
                    pc.setLocalDescription(sessionDescription);
                    console.log('setLocalAndSendMessage sending message', sessionDescription);
                    sendMessage(sessionDescription);
                },
                (e) => console.log('createOffer() error: ', e)
            );
        }
    }

    const sendMessage = (message) => {
        console.log('Client sending message: ', message);
        socket.emit('message', message);
    };

    function doAnswer() {
        console.log('Sending answer to peer.');
        pc.createAnswer().then(
            (sessionDescription) => {
                pc.setLocalDescription(sessionDescription);
                console.log('setLocalAndSendMessage sending message', sessionDescription);
                sendMessage(sessionDescription);
            },
            (e) => console.log('createOffer() error: ', e)
        );
    }

    function hangup() {
        console.log('Hanging up.');
        stop();
        sendMessage('bye');
    }

    function handleRemoteHangup() {
        console.log('Session terminated.');
        stop();
        isInitiator = true;
    }

    function stop() {
        isStarted = false;
        pc.close();
        pc = null;
        if (remoteStream) {
            remoteStream.getTracks().forEach((track) => {
                track.stop();
            });
            setRemoteStream(null);
        }
        setOnCall(false);
    }

    function createPeerConnection() {
        try {
            pc = new RTCPeerConnection(pcConfig);
            pc.onicecandidate = handleIceCandidate;
            pc.onaddstream = handleRemoteStreamAdded;
            pc.onremovestream = handleRemoteStreamRemoved;
            console.log('Created RTCPeerConnnection');
        } catch (e) {
            console.log('Failed to create PeerConnection, exception: ' + e.message);
            alert('Cannot create RTCPeerConnection object.');
        }
    }

    function handleIceCandidate(event) {
        console.log('icecandidate event: ', event);
        if (event.candidate) {
            sendMessage({
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate,
            });
        } else {
            console.log('End of candidates.');
        }
    }

    function handleRemoteStreamAdded(event) {
        console.log('Remote stream added.');
        setRemoteStream(event.stream);
    }

    function handleRemoteStreamRemoved(event) {
        console.log('Remote stream removed. Event: ', event);
    }

    return { connectToRoom, hangup };
};

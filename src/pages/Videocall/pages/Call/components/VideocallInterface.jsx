import { Ring } from '@uiball/loaders';
import Video from 'pages/Videocall/components/Video';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useStreamingSocket } from '../useStreamingSocket';
import TherappyLogo from 'resources/img/therappy-logo-white.png';

const Window = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`;

const RemoteVideoContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: black;
`;

const LocalVideo = styled(Video)`
    position: absolute;
    right: 10px;
    top: 10px;
    width: 30%;
    max-width: 250px;
`;

const Watermark = styled.div`
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Logo = styled.img`
    width: 100px;
    opacity: 0.6;
`;

const VideocallInterface = ({ appointments, localStream, roomId }) => {
    const { remoteStream } = useStreamingSocket(roomId, localStream);

    const localVideoRef = useRef();
    const remoteVideoRef = useRef();

    useEffect(() => {
        if (localStream && localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream, localVideoRef]);

    useEffect(() => {
        if (remoteStream && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream, remoteVideoRef]);

    return (
        <Window>
            <RemoteVideoContainer>
                {remoteStream ? (
                    <Video
                        ref={remoteVideoRef}
                        style={{ width: '100%', height: '100%' }}
                    />
                ) : (
                    <Ring color="#ffffff" size={45} />
                )}
                <LocalVideo ref={localVideoRef} autoPlay playsInline muted />
                <Watermark>
                    <Logo src={TherappyLogo} alt={'Logo Therappy'} />
                    {appointments.appointment?.name &&
                        appointments.appointment?.lastName && (
                            <p
                                style={{
                                    textAlign: 'center',
                                    margin: '10px',
                                    color: 'white',
                                }}
                            >
                                En llamada con:<br />
                                {`${
                                    appointments.appointment?.title ?? ''
                                } ${appointments.appointment?.name} ${
                                    appointments.appointment?.lastName
                                }`}
                            </p>
                        )}
                </Watermark>
            </RemoteVideoContainer>
        </Window>
    );
};

export default VideocallInterface;

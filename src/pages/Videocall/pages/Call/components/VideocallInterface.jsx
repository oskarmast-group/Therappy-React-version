import { Ring } from '@uiball/loaders';
import Video from 'pages/Videocall/components/Video';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useStreamingSocket } from '../useStreamingSocket';
import TherappyLogo from 'resources/img/therappy-logo-white.png';
import MicOnSVG from 'resources/img/mic-on.svg';
import MicOffSVG from 'resources/img/mic-off.svg';
import CamOnSVG from 'resources/img/cam-on.svg';
import CamOffSVG from 'resources/img/cam-off.svg';
import SoundOnSVG from 'resources/img/sound-on.svg';
import SoundOffSVG from 'resources/img/sound-off.svg';
import HangupCall from 'resources/img/icons/videocall-hangup-icon.svg';
import CircleActionButton from 'pages/Home/pages/Videocalls/components/CircleActionButton';
import { useState } from 'react';

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

const VideocallInterface = ({ appointments, localStream, roomId, toggleMic, toggleVideo, videoEnabled, micEnabled }) => {
    const { remoteStream } = useStreamingSocket(roomId, localStream);
    const [soundEnabled, setSoundEnabled] = useState(false);

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
                <Video
                    ref={remoteVideoRef}
                    style={{ width: '100%', height: '100%' }}
                    autoPlay
                    playsInline
                    muted={soundEnabled}
                />
                {!remoteStream && (
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Ring color="#ffffff" size={45} />
                    </div>
                )}

                <LocalVideo ref={localVideoRef} autoPlay playsInline muted />
                <div style={{ display: 'flex', gap: '10px', position: 'absolute', bottom: '130px', left: 0, right: 0, justifyContent: 'center' }}>
                <CircleActionButton
                    src={micEnabled ? MicOnSVG : MicOffSVG}
                    onClick={toggleMic}
                    alt={'Mutear'}
                />
                <CircleActionButton
                    src={videoEnabled ? CamOnSVG : CamOffSVG}
                    onClick={toggleVideo}
                    alt={'Apagar video'}
                />
                <CircleActionButton
                    src={soundEnabled ? SoundOnSVG : SoundOffSVG}
                    onClick={()=>setSoundEnabled(!soundEnabled)}
                    alt={'Apagar sonido'}
                />
                <CircleActionButton
                    src={HangupCall}
                    onClick={()=>window.location.href = ''}
                    alt={'Apagar sonido'}
                    style={{ backgroundColor: 'red' }}
                />
                </div>
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
                                En llamada con:
                                <br />
                                {`${appointments.appointment?.title ?? ''} ${
                                    appointments.appointment?.name
                                } ${appointments.appointment?.lastName}`}
                            </p>
                        )}
                </Watermark>
            </RemoteVideoContainer>
        </Window>
    );
};

export default VideocallInterface;

import { DEVICES_TYPES, useUserMedia } from 'hooks/useUserMedia';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CircleActionButton from './components/CircleActionButton';
import MicOnSVG from 'resources/img/mic-on.svg';
import MicOffSVG from 'resources/img/mic-off.svg';
import CamOnSVG from 'resources/img/cam-on.svg';
import CamOffSVG from 'resources/img/cam-off.svg';
import Button from 'components/Button';
import { useStreamingSocket } from './useStreamingSocket';

const VideoContainer = styled.div`
    display: flex;
    position: relative;
    min-height: 200px;
    max-height: 250px;
    background-color: black;
    margin-bottom: 20px;
`;

const OwnVideo = styled.video`
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    height: auto;
    display: block;
    position: relative;
    &.active {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 30%;
        max-width: 30%;
        border-radius: 10px;
        box-shadow: 5px 5px 9px 0px rgba(0,0,0,0.43);
    }
`;

const RemoteVideo = styled.video`
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    height: auto;
    display: none;
    &.active {
        display: block;
    }
`;

const Title = styled.h2`
    margin: 0;
    text-align: center;
    color: #687711;
`;

const SelectorContainer = styled.div`
    label {
        display: block;
        font-size: 0.875rem;
        color: #687711;
        margin-bottom: 5px;
    }
    select {
        display: block;
        width: 100%;
        padding: 5px 0;
    }
    margin-bottom: 10px;
`;

const Videocalls = () => {
    const videoRef = useRef();
    const remoteVideoRef = useRef();
    const { mediaStream, devices, selectedDevices, changeSelectedDevice, videoEnabled, toggleVideo, micEnabled, toggleMic } =
        useUserMedia();
    const [remoteStream, setRemoteStream] = useState(null);
    const [onCall, setOnCall] = useState(false);
    const { connectToRoom, hangup } = useStreamingSocket(mediaStream, setRemoteStream, setOnCall, remoteStream);

    useEffect(() => {
        if (mediaStream && videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            
        }
    }, [mediaStream]);

    const changeAudioSource = (deviceId) => {
        changeSelectedDevice(DEVICES_TYPES.AUDIO_INPUT, deviceId);
    };

    const changeVideoSource = (deviceId) => {
        changeSelectedDevice(DEVICES_TYPES.VIDEO_INPUT, deviceId);
    };

    const changeAudioDestination = async (deviceId) => {
        if (videoRef.current && videoRef.current.srcObject && typeof videoRef.current.sinkId !== 'undefined') {
            try {
                await videoRef.current.setSinkId(deviceId);
                changeSelectedDevice(DEVICES_TYPES.AUDIO_OUTPUT, deviceId);
            } catch (e) {
                console.error(e);
            }
        } else {
            console.log('something failed');
        }
    };

    useEffect(() => {
        console.log("remoteStream", remoteStream);
        if (remoteStream && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    const callAction = () => {
        setOnCall(true);
        connectToRoom('abcde');
    };

    const hangupAction = () => {
        hangup();
    };

    return (
        <div>
            <Title style={{ marginBottom: '10px' }}>Videollamada</Title>
            {!onCall && (
                <>
                    <SelectorContainer>
                        <label htmlFor="audioSource">Micrófono: </label>
                        <select
                            id="audioSource"
                            disabled={!('sinkId' in HTMLMediaElement.prototype)}
                            value={selectedDevices[DEVICES_TYPES.AUDIO_INPUT]}
                            onChange={(e) => changeAudioSource(e.target.value)}
                        >
                            {devices[DEVICES_TYPES.AUDIO_INPUT].map(({ deviceId, label }, i) => (
                                <option key={deviceId} value={deviceId}>
                                    {label || `Micrófono ${i + 1}`}
                                </option>
                            ))}
                        </select>
                    </SelectorContainer>
                    <SelectorContainer>
                        <label htmlFor="audioOutput">Salida de audio: </label>
                        <select
                            id="audioOutput"
                            value={selectedDevices[DEVICES_TYPES.AUDIO_OUTPUT]}
                            onChange={(e) => changeAudioDestination(e.target.value)}
                        >
                            {devices[DEVICES_TYPES.AUDIO_OUTPUT].map(({ deviceId, label }, i) => (
                                <option key={deviceId} value={deviceId}>
                                    {label || `Bocina ${i + 1}`}
                                </option>
                            ))}
                        </select>
                    </SelectorContainer>
                    <SelectorContainer>
                        <label htmlFor="videoSource">Cámara: </label>
                        <select
                            id="videoSource"
                            value={selectedDevices[DEVICES_TYPES.VIDEO_INPUT]}
                            onChange={(e) => changeVideoSource(e.target.value)}
                        >
                            {devices[DEVICES_TYPES.VIDEO_INPUT].map(({ deviceId, label }, i) => (
                                <option key={deviceId} value={deviceId}>
                                    {label || `Cámara ${i + 1}`}
                                </option>
                            ))}
                        </select>
                    </SelectorContainer>
                </>
            )}
            <VideoContainer>
                <RemoteVideo className={remoteStream ? 'active' : ''} ref={remoteVideoRef} autoPlay playsInline></RemoteVideo>
                <OwnVideo className={remoteStream ? 'active' : ''} ref={videoRef} autoPlay playsInline muted></OwnVideo>
                <div style={{ position: 'absolute', right: 0, bottom: 0, display: 'flex', gap: '10px', padding: '10px' }}>
                    <CircleActionButton src={micEnabled ? MicOnSVG : MicOffSVG} onClick={toggleMic} alt={'Mutear'} />
                    <CircleActionButton src={videoEnabled ? CamOnSVG : CamOffSVG} onClick={toggleVideo} alt={'Apagar video'} />
                </div>
            </VideoContainer>
            {onCall ? (
                <Button type={'button'} onClick={hangupAction} style={{ marginTop: '20px' }}>
                    Colgar
                </Button>
            ) : (
                <Button type={'button'} onClick={callAction} style={{ marginTop: '20px' }}>
                    Unirse a llamada
                </Button>
            )}
        </div>
    );
};

export default Videocalls;

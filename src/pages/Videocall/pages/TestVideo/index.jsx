import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import Video from '../../components/Video';
import VideoContainer from '../../containers/VideoContainer';
import React, { useEffect, useRef } from 'react';
import CircleActionButton from 'pages/Home/pages/Videocalls/components/CircleActionButton';
import MicOnSVG from 'resources/img/mic-on.svg';
import MicOffSVG from 'resources/img/mic-off.svg';
import CamOnSVG from 'resources/img/cam-on.svg';
import CamOffSVG from 'resources/img/cam-off.svg';
import { useUserMedia } from 'hooks/useUserMedia';

const TestVideo = () => {
    const videoRef = useRef();
    const {
        mediaStream,
        devices,
        selectedDevices,
        changeSelectedDevice,
        videoEnabled,
        toggleVideo,
        micEnabled,
        toggleMic,
    } = useUserMedia();
    useEffect(() => {
        if (mediaStream && videoRef.current) {
            videoRef.current.srcObject = mediaStream;
        }
    }, [mediaStream]);
    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar title={'Pruebas Técnicas'} />
            <VideoContainer>
                <Video ref={videoRef} autoPlay playsInline muted></Video>
                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        gap: '10px',
                        padding: '10px',
                    }}
                >
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
                </div>
            </VideoContainer>
        </MainContainer>
    );
};

export default TestVideo;

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
import useAppointments from 'state/appointments';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { GREEN, RED } from 'resources/constants/colors';
import NoProfileSVG from 'resources/img/no-profile.svg';
import { IMAGES_URL } from 'resources/constants/urls';
import { capitalize } from 'utils/text';
import { dateFormat } from 'utils/date';
import { getDisplayTime } from 'utils/time';
import { addMinutes } from 'date-fns';
import { Body } from 'components/Text';
import Button from 'components/Button';
import { useState } from 'react';

const ProfileContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    .profile-container {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        overflow: hidden;
        border: 2px solid ${GREEN};
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`;

const Call = () => {
    const [appointments, appointmentsDispatcher] = useAppointments();
    const { roomId } = useParams();
    const [thing, setThing] = useState(false);

    useEffect(() => {
        appointmentsDispatcher.fetchOneStart(roomId);
    }, []);

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
            <TopBar title={'Videollamada'} />
            <ProfileContainer>
                <div className="profile-container">
                    <img
                        src={
                            appointments?.appointment?.profileImg
                                ? `${IMAGES_URL}${appointments?.appointment?.profileImg}`
                                : NoProfileSVG
                        }
                        alt={'Imagen de perfil'}
                    />
                </div>
            </ProfileContainer>
            {appointments.appointment?.name &&
                appointments.appointment?.lastName && (
                    <h3 style={{ textAlign: 'center', margin: '10px' }}>
                        {`${appointments.appointment?.title} ${appointments.appointment?.name} ${appointments.appointment?.lastName}`}
                    </h3>
                )}
            {!appointments.fetching.state && appointments.appointment?.date && (
                <Body style={{ textAlign: 'center' }}>
                    {capitalize(
                        dateFormat(
                            appointments.appointment?.date,
                            'EEEE - LLLL d, uuuu'
                        )
                    )}
                </Body>
            )}
            {!appointments.fetching.state && appointments.appointment?.date && (
                <Body style={{ textAlign: 'center', marginBottom: '15px' }}>
                    {getDisplayTime(appointments.appointment?.date)} -{' '}
                    {getDisplayTime(
                        addMinutes(new Date(appointments.appointment?.date), 50)
                    )}
                </Body>
            )}
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
            {thing && <Body style={{ color: RED }}>Error de conexión</Body>}
            <Button
                type="button"
                onClick={() => setThing(true)}
                style={{ marginTop: '10px' }}
                disabled={false}
            >
                Unirse a llamada
            </Button>
        </MainContainer>
    );
};

export default Call;

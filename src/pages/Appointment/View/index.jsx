import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import useAppointments from 'state/appointments';
import NoProfileSVG from 'resources/img/no-profile.svg';
import MessageSVG from 'resources/img/icons/message-icon-alt.svg';
import VideocallSVG from 'resources/img/icons/videocall-icon-alt.svg';
import Loading from 'components/Loading';
import { IMAGES_URL } from 'resources/constants/urls';
import styled from 'styled-components';
import { GREEN } from 'resources/constants/colors';
import Button from 'components/Button';
import AppointmentTime from 'components/AppointmentTime';
import LinkButton from 'components/LinkButton';

const ProfileContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    .profile-container {
        width: 130px;
        height: 130px;
        border-radius: 65px;
        overflow: hidden;
        border: 2px solid ${GREEN};
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`;

const ActionsRow = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    a {
        border-radius: 10px;
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: center;
        gap: 10px;
        img {
            width: 25px;
        }
    }
`;

const ViewAppointment = () => {
    const [appointments, appointmentsDispatcher] = useAppointments();
    const { roomId } = useParams();

    useEffect(() => {
        appointmentsDispatcher.fetchOneStart(roomId);
    }, []);

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar title={'Cita'} />
            {!!appointments.fetching.state.state ? (
                <Loading />
            ) : (
                <>
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
                            <h2 style={{ textAlign: 'center' }}>
                                {`${appointments.appointment?.name} ${appointments.appointment?.lastName}`}
                            </h2>
                        )}
                    <ActionsRow>
                        <LinkButton to={`/conversacion/${appointments.appointment?.conversationId}`} className={appointments.appointment?.conversationId ? '' : 'disabled'} >
                            <img src={MessageSVG} alt={'Mensaje'} /> Chat
                        </LinkButton>
                        <LinkButton to={`/videollamada/${appointments.appointment?.roomId}`} className={appointments.appointment?.roomId ? '' : 'disabled'}>
                            <img src={VideocallSVG} alt={'Videollamada'} />{' '}
                            Llamada
                        </LinkButton>
                    </ActionsRow>
                    <AppointmentTime
                        loading={appointments.fetching.state}
                        date={appointments.appointment?.date}
                    />
                    <Button
                        type="button"
                        onClick={() => {}}
                        style={{ marginTop: '40px' }}
                        disabled={false}
                    >
                        Cancelar
                    </Button>
                </>
            )}
        </MainContainer>
    );
};

export default ViewAppointment;

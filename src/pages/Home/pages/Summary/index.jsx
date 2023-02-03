import Loading from 'components/Loading';
import Scrollable from 'containers/Scrollable';
import React from 'react';
import {
    DARKER_TEXT,
    DARK_TEXT,
    PRIMARY_GREEN,
} from 'resources/constants/colors';
import { ClientTherapistStatus } from 'resources/constants/config';
import useUser from 'state/user';
import styled from 'styled-components';
import AppointmentsListSection from './components/AppointmentsListSection';
import NewsSection from './components/NewsSection';
import NextAppointmentSection from './components/NextAppointmentSection';
import PacientListSection from './components/PacientListSection';
import TherapistSelectionSection from './components/TherapistSelectionSection';
import InfoSVG from 'resources/img/icons/info-icon.svg';
import { useAlert } from 'alert';
import ALERT_TYPES from 'alert/types';

const Salute = styled.h1`
    font-size: 28px;
    font-weight: 600;
    color: ${DARKER_TEXT};
    margin: 0;
    span {
        font-weight: 700;
    }
`;

const Subtitle = styled.h2`
    font-size: 21px;
    font-weight: 600;
    color: ${DARK_TEXT};
    margin: 0;
`;

const Info = styled.div`
    padding: 10px;
    background-color: ${PRIMARY_GREEN};
    border-radius: 15px;
    display: flex;
    gap: 20px;
    margin: 20px 0;
    cursor: pointer;
    align-items: center;
    img {
        height: 25px;
        width: auto;
    }
    p {
        margin: 0;
        font-size: 14px;
        color: white;
    }
`;

const Summary = () => {
    const alert = useAlert();
    const [user] = useUser();
    return (
        <Scrollable>
            <header style={{ marginBottom: '15px', minHeight: 0 }}>
                <Salute>
                    Hola, <span>{user?.user?.name ?? ''}</span>
                </Salute>
                <Subtitle>¿Cómo te encuentras hoy?</Subtitle>
            </header>

            {user?.user && !user.fetching.fetch.state ? (
                user.user.userType === 'therapist' ? (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            minHeight: 0,
                        }}
                    >
                        <AppointmentsListSection />
                        <PacientListSection />
                        <NewsSection />
                    </div>
                ) : !!user.user.extraData?.therapist ? (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                minHeight: 0,
                            }}
                        >
                            <NextAppointmentSection />
                            {user.user.extraData.therapist.status ===
                                ClientTherapistStatus.PENDING && (
                                <Info
                                    onClick={() => {
                                        alert({
                                            type: ALERT_TYPES.INFO,
                                            config: {
                                                title: 'Asignación pendiente',
                                                body: <span>Después de la sesión exploratoria con el terapeuta podrán decidir continuar con futuras sesiones. <br/><br/>Si deciden no continuar tendrás la oportunidad de agendar otra sesión exploratoria gratuita con otro terapeuta</span>,
                                                buttonText: 'OK',
                                            },
                                        })
                                            .then(() => {})
                                            .catch(() => {});
                                    }}
                                >
                                    <img src={InfoSVG} alt="info" />
                                    <p>
                                        ¿Por qué no puedo agendar más sesiones?
                                    </p>
                                </Info>
                            )}
                        </div>
                    </>
                ) : (
                    <TherapistSelectionSection />
                )
            ) : (
                <Loading />
            )}
        </Scrollable>
    );
};

export default Summary;

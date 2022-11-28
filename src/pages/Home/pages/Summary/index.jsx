import Loading from 'components/Loading';
import React from 'react';
import {
    DARKER_TEXT,
    DARK_TEXT,
} from 'resources/constants/colors';
import useUser from 'state/user';
import styled from 'styled-components';
import AppointmentsListSection from './components/AppointmentsListSection';
import NewsSection from './components/NewsSection';
import PacientListSection from './components/PacientListSection';
import TherapistSelectionSection from './components/TherapistSelectionSection';

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

const Summary = () => {
    const [user] = useUser();
    return (
        <>
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
                    <div>{user?.user?.extraData?.therapist?.name}</div>
                ) : (
                    <TherapistSelectionSection />
                )
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Summary;

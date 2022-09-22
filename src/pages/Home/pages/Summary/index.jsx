import React from 'react';
import { DARKER_TEXT, DARK_TEXT } from 'resources/constants/colors';
import useUser from 'state/user';
import styled from 'styled-components';
import TherapistSelectionSection from './components/TherapistSelectionSection';

const Salute = styled.h1`
    font-size: 34px;
    font-weight: 600;
    color: ${DARKER_TEXT};
    margin: 0;
    span {
        font-weight: 700;
    }
`;

const Subtitle = styled.h2`
    font-size: 27px;
    font-weight: 600;
    color: ${DARK_TEXT};
    margin: 0;
`;

const Summary = () => {
    const [user] = useUser();
    return (
        <>
            <header style={{ marginBottom: '20px', minHeight: 0 }}>
                <Salute>
                    Hola, <span>{user?.user?.name ?? ''}</span>
                </Salute>
                <Subtitle>¿Cómo te encuentras hoy?</Subtitle>
            </header>
            {!!user?.user ? (
                !!user.user.assignedTherapist ? (
                    <div>{user?.user?.assignedTherapist}</div>
                ) : (
                    <TherapistSelectionSection />
                )
            ) : (
                <div>Cargando...</div>
            )}
        </>
    );
};

export default Summary;

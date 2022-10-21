import React from 'react';
import styled from 'styled-components';
import { Container, Intructions } from './styles';

const NewAppointmentsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70px;
    max-height: 180px;
`;

const Notice = styled.span`
    margin: 0;
    text-align: center;
`;

const AppointmentsListSection = () => {
    const appointmentList = [];
    return (
        <Container>
            <Intructions>Nuevas citas</Intructions>
            <NewAppointmentsContainer>
                {appointmentList.length === 0 ? <Notice>Cuando tengas solicitudes a citas nuevas, aparecerán aquí.</Notice> : <div></div>}
            </NewAppointmentsContainer>
        </Container>
    );
};

export default AppointmentsListSection;

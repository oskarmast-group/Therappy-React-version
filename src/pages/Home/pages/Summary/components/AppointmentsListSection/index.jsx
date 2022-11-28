import Loading from 'components/Loading';
import React from 'react';
import { useEffect } from 'react';
import useAppointments from 'state/appointments';
import styled from 'styled-components';
import { Container, Intructions } from '../styles';
import AppointmentsList from './AppointmentsList';

const NewAppointmentsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    min-height: 70px;
    max-height: 180px;
`;

const Notice = styled.span`
    margin: 0;
    text-align: center;
`;

const AppointmentsListSection = () => {
    const [appointments, appointmentsDispatcher] = useAppointments();

    useEffect(() => {
        appointmentsDispatcher.fetchPendingStart();
    }, []);

    return (
        <Container>
            <Intructions>Nuevas citas</Intructions>
            <NewAppointmentsContainer>
                {appointments.fetching.state && Object.keys(appointments.fetching.config).length === 0 ? (
                    <Loading />
                ) : appointments.pendingList.length === 0 ? (
                    <Notice>
                        Cuando tengas solicitudes a citas nuevas, aparecerán
                        aquí.
                    </Notice>
                ) : (
                    <AppointmentsList list={appointments.pendingList} />
                )}
            </NewAppointmentsContainer>
        </Container>
    );
};

export default AppointmentsListSection;

import React, { useEffect } from 'react';
import useAppointments from 'state/appointments';
import { Container, Intructions } from '../styles';
import AppointmentCard from './AppointmentCard';

const NextAppointmentSection = () => {
    const [appointments, appointmentsDispatcher] = useAppointments();

    useEffect(() => {
        appointmentsDispatcher.fetchUpcomingStart();
    }, []);

    return appointments.upcomingList.length > 0 ? (
        <Container>
            <Intructions>Cita próxima</Intructions>
            <AppointmentCard
                app={
                    appointments.upcomingList.sort((a, b) => {
                        return new Date(a.date) - new Date(b.date);
                    })[0]
                }
            />
        </Container>
    ) : null;
};

export default NextAppointmentSection;

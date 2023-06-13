import React, { useEffect } from 'react';
import { useSocket } from 'Socket';
import useAppointments from 'state/appointments';
import { Container, Intructions } from '../styles';
import AppointmentCard from './AppointmentCard';

const NextAppointmentSection = () => {
    const [appointments, appointmentsDispatcher] = useAppointments();
    const socket = useSocket();

    useEffect(() => {
        appointmentsDispatcher.fetchUpcomingStart();
    }, []);

    useEffect(()=>{
        if(!socket) return;
        socket.off('appointment updated').on('appointment updated', (payload)=>{ 
            appointmentsDispatcher.fetchUpcomingStart();
         });
    },[socket]);

    return appointments.upcomingList.filter(({status}) => status !== 'rejected').length > 0 ? (
        <Container>
            <Intructions>Cita próxima</Intructions>
            <AppointmentCard
                app={
                    appointments.upcomingList.sort((a, b) => {
                        return new Date(a.date) - new Date(b.date);
                    }).filter(({status}) => status !== 'rejected')[0]
                }
            />
        </Container>
    ) : null;
};

export default NextAppointmentSection;

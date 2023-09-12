import React, { useEffect } from 'react';
import { useSocket } from 'Socket';
import useAppointments from 'state/appointments';
import { Container, Intructions } from '../styles';
import AppointmentCard from './AppointmentCard';
import { AppointmentStatusValues } from 'resources/constants/config';

const NextAppointmentSection = () => {
    const [appointments, appointmentsDispatcher] = useAppointments();
    const socket = useSocket();

    useEffect(()=>{
        if(!socket) return;
        socket.off('appointment updated').on('appointment updated', (payload)=>{ 
            appointmentsDispatcher.fetchUpcomingStart();
         });
    },[socket]);

    return appointments.upcomingList.filter(({status}) => status !== AppointmentStatusValues.REJECTED && status !== AppointmentStatusValues.CANCELLED).length > 0 ? (
        <Container>
            <Intructions>Cita próxima</Intructions>
            <AppointmentCard
                app={
                    appointments.upcomingList.sort((a, b) => {
                        return new Date(a.date) - new Date(b.date);
                    }).filter(({status}) => status !== AppointmentStatusValues.REJECTED)[0]
                }
            />
        </Container>
    ) : null;
};

export default NextAppointmentSection;

import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import useAppointments from 'state/appointments';

const ViewAppointment = () => {
    const [appointments, appointmentsDispatcher] = useAppointments();
    const { roomId } = useParams();

    useEffect(() => {
        appointmentsDispatcher.fetchOneStart(roomId);
    }, []);

    return (
        <MainContainer
            withSideMenu={false}
            withBottomNavigation={false}
            withTopDecoration={false}
        >
            <TopBar title={'Cita'} />
        </MainContainer>
    );
};

export default ViewAppointment;

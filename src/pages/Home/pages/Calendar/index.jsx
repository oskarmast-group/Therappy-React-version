import Loading from 'components/Loading';
import { sub } from 'date-fns';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import useAppointments from 'state/appointments';
import styled from 'styled-components';
import AppointmentsList from './components/AppointmentsList';

const Title = styled.h1`
    margin: 0;
    font-size: 30px;
    font-weight: 600;
    color: ${PRIMARY_GREEN};
    text-align: center;
`;

const Notice = styled.span`
    margin: 0;
    margin-top: 20px;
    text-align: center;
`;

const Tab = styled.button`
    padding: 10px 0;
    flex: 1;
    background-color: transparent;
    border: solid 2px ${PRIMARY_GREEN};
    color: ${PRIMARY_GREEN};
    border-radius: 10px;
    &.active {
        background-color: ${PRIMARY_GREEN};
        color: white;
    }
`;

const TabsContainer = styled.div`
    display: flex;
    gap: 5px;
    margin-top: 10px;
`;

const Calendar = () => {
    const [page, setPage] = useState(0);
    const [list, setList] = useState([]);
    const [appointments, appointmentsDispatcher] = useAppointments();

    useEffect(() => {
        appointmentsDispatcher.fetchStart();
    }, []);

    useEffect(() => {
        if (page === 0) {
            const list = appointments.list.filter(
                ({ date }) =>
                    new Date(date) > sub(new Date(), { hours: 1 })
            );
            setList(list);
            return;
        } else {
            const list = appointments.list.filter(
                ({ date }) =>
                    new Date(date) < sub(new Date(), { hours: 1 })
            );
            setList(list);
            return;
        }
    }, [appointments.list, page]);

    return (
        <>
            <Title>Citas</Title>
            <TabsContainer>
                <Tab
                    className={page === 0 ? 'active' : ''}
                    onClick={() => setPage(0)}
                >
                    Próximas
                </Tab>
                <Tab
                    className={page === 1 ? 'active' : ''}
                    onClick={() => setPage(1)}
                >
                    Pasadas
                </Tab>
            </TabsContainer>
            {appointments.fetching.state ? (
                <Loading />
            ) : list.length === 0 ? (
                <Notice>
                    {page === 0
                        ? 'Cuando tengas citas pendientes apareceran aquí'
                        : 'Tu historial de citas aparecerá aquí'}
                </Notice>
            ) : (
                <AppointmentsList list={list} />
            )}
        </>
    );
};

export default Calendar;

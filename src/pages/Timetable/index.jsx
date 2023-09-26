import Loading from 'components/Loading';
import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import useUser from 'state/user';
import styled from 'styled-components';
import HoursPicker from './components/HoursPicker';
import { GREEN, PRIMARY_GREEN } from 'resources/constants/colors';
import { Ring } from '@uiball/loaders';
import Scrollable from 'containers/Scrollable';
import useAppointments from 'state/appointments';
import { add, isAfter, set } from 'date-fns';
import { UserTypes } from 'resources/constants/config';

const UpdateButton = styled.button`
    padding: 3px 10px;
    background-color: ${PRIMARY_GREEN};
    font-size: 12px;
    color: #fbfbfd;
    border: none;
    outline: none;
    border-radius: 20px;
    height: fit-content;
    align-self: center;
    width: fit-content;
    cursor: pointer;
`;

const getRelevantAvailability = (serverTime = 0, timeAvailability = {}) => {
    const now = new Date(serverTime);
    const tomorrow = add(set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }), { days: 1 });

    const relevantAvailability = {};

    if (!timeAvailability) return relevantAvailability;

    for (const [key, value] of Object.entries(timeAvailability).sort((a,b)=>new Date(a[1]) - new Date(b[1]))) {
        const hour = new Date(value);

        if (isAfter(hour, tomorrow)) {
            relevantAvailability[key] = value;
        }
    }

    return relevantAvailability;
};

const Timetable = () => {
    const [hoursChanged, setHoursChanged] = useState(false);
    const [user, userDispatcher] = useUser();
    const [appointments, appointmentsDispatcher] = useAppointments();

    const [timeAvailability, setTimeAvailability] = useState({});
    const [nextWeekDates, setNextWeekDates] = useState([]);
    const [withError, setWithError] = useState(false);

    const history = useHistory();

    useEffect(() => {
        userDispatcher.fetchStart();
        appointmentsDispatcher.getServerTimeStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!appointments.serverTime) return;

        const now = new Date(appointments.serverTime);
        const dates = [];

        for (let i = 1; i <= 7; i++) {
            const next = set(add(now, { days: i }), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
            dates.push(next);
        }

        setNextWeekDates(dates);
    }, [appointments.serverTime]);

    useEffect(() => {
        if (!user.current.userType) return;
        if (user.current.userType !== UserTypes.THERAPIST) history.push('/');
    }, [user]);

    useEffect(() => {
        if (!!user.current?.id > 0 && !user.fetching.fetch.state && appointments.serverTime) {
            const relevantAvailability = getRelevantAvailability(
                appointments.serverTime,
                user.current.extraData?.timeAvailability
            );
            setTimeAvailability(relevantAvailability);
        }
    }, [user, user.fetching.fetch.state, appointments.serverTime]);

    useEffect(() => {
        const relevantAvailability = getRelevantAvailability(
            appointments.serverTime,
            user.current.extraData?.timeAvailability
        );

        const userEntries = Object.entries(relevantAvailability);
        const entries = Object.entries(timeAvailability);

        if (userEntries.length !== entries.length) {
            console.log('not equal');
            setHoursChanged(true);
            return;
        }

        for (const [key, value] of entries) {
            const userEntry = relevantAvailability[key];

            if (value !== userEntry) {
                setHoursChanged(true);
                return;
            }
        }

        setHoursChanged(false);
    }, [timeAvailability]);

    const onSubmitHours = () => {
        userDispatcher.updateTherapistStart({
            key: 'timeAvailability',
            value: timeAvailability,
        });
    };

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar title={'Horario'} />
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <h3>Próximos 7 días</h3>
                {hoursChanged && !withError && (
                    <UpdateButton type="button" onClick={onSubmitHours}>
                        Actualizar
                    </UpdateButton>
                )}
                {user.fetching.update?.config?.key === 'timeAvailability' && <Ring color={GREEN} size={25} />}
            </div>
            <Scrollable>
                {(user.fetching.fetch.state &&
                    !!user.fetching.fetch.config &&
                    Object.keys(user.fetching.fetch.config).length === 0) ||
                Object.keys(user.current).length === 0 ? (
                    <Loading />
                ) : (
                    <HoursPicker
                        timeAvailability={timeAvailability}
                        dates={nextWeekDates}
                        updateTimeAvailability={setTimeAvailability}
                        setWithError={setWithError}
                    />
                )}
            </Scrollable>
        </MainContainer>
    );
};

export default Timetable;

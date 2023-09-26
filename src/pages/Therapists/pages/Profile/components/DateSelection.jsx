import Button from 'components/Button';
import { isAfter, isBefore, isEqual, set } from 'date-fns';
import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { DARK_TEXT, GOLDEN, GOLDEN_HIGHLIGHT, PRIMARY_GREEN } from 'resources/constants/colors';
import useAppointments from 'state/appointments';
import styled from 'styled-components';
import { dateFormat, isDateAfter } from 'utils/date';
import { dayOfTheWeekTranslatedAbr } from 'utils/text';
import {
    addDays,
    addHours,
    dateObjectFromTimeString,
    dayOfTheWeek,
    getDisplayTime,
    timeFormat,
} from 'utils/time';

const Container = styled.div`
    display: flex;
    gap: 20px;
    overflow: scroll;
    padding-bottom: 15px;
`;

const DateContainer = styled.div`
    padding: 3px;
    min-width: 65px;
    height: 85px;
    border: solid ${PRIMARY_GREEN} 1px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1px;
    cursor: pointer;
    user-select: none;

    .day {
        font-size: 16px;
        color: #1e2205;
        margin: 0;
    }
    .date {
        font-size: 28px;
        color: #1e2205;
        margin: 0;
        font-weight: 700;
    }

    &.selected {
        background-color: ${PRIMARY_GREEN};
        .day,
        .date {
            color: #fbfbfd;
        }
    }

    &.inactive {
        pointer-events: none;
        opacity: 0.3;
    }
`;

const checkDay = (timeAvailability, date) => {
    const hours = getHours(timeAvailability, date);
    return hours.length !== 0;
};

const getHours = (timeAvailability, date) => {
    const day = new Date(date);
    const nextDay = addDays(day, 1);

    const hours = [];

    for(const value of Object.values(timeAvailability).sort((a,b)=>new Date(a) - new Date(b))) {
        const time = new Date(value);
        if(isAfter(time, day) && isBefore(time, nextDay)) {
            hours.push(time);
        }
    }
    return hours;
};

const HourContainer = styled.button`
    min-width: 85px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    border: solid ${GOLDEN} 1px;
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
    background-color: transparent;
    outline: none;
    p {
        margin: 0;
        color: #1e2205;
    }
    position: relative;
    &:disabled {
        border-color: ${GOLDEN_HIGHLIGHT};
        pointer-events: none;
        p {
            opacity: 0.2;
        }
        &:after {
            content: 'Ocupado';
            color: ${DARK_TEXT};
            position: absolute;
            transform: rotate(-15deg);
            font-weight: 700;
        }
    }

    &.selected {
        background-color: ${GOLDEN};
        p {
            color: #fbfbfd;
        }
    }
`;

const DateSelection = ({ therapistId, timeAvailability, appointments }) => {
    const history = useHistory();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [appointmentsState, appointmentsDispatcher] = useAppointments();

    useEffect(()=>{
        appointmentsDispatcher.getServerTimeStart();
    },[])

    const dates = useMemo(() => {
        if(!appointmentsState.serverTime || !timeAvailability) return [];
        const days = [];
        const today = set(new Date(appointmentsState.serverTime), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
        let daySelected = null;
        for (let i = 1; i <= 15; i++) {
            const day = addDays(today, i);
            days.push(day);
            if(!daySelected && checkDay(timeAvailability, day)) {
                daySelected = day;  
            }
        }
        setSelectedDate(daySelected);
        return days;
    }, [appointmentsState.serverTime, timeAvailability]);

    const hours = useMemo(() => getHours(timeAvailability, selectedDate), [timeAvailability, selectedDate]);

    useEffect(() => {
        for(const hour of hours) {
            if(isAvailable(hour)){
                setSelectedHour(hour);
                return;
            }
        }
        setSelectedHour(null);
        
    }, [hours]);

    const isAvailable = (hour) => {
        if (!appointments || appointments.length === 0) return true;
        for (const app of appointments) {
            const appDate = new Date(app.date);
            const date = new Date(hour);
            if (isEqual(date, appDate)) return false;
        }
        return true;
    };

    return (
        <>
            <Container style={{ minHeight: '100px' }}>
                {dates.map((d) => (
                    <DateContainer
                        key={d}
                        className={`${selectedDate === d ? 'selected' : ''} ${checkDay(timeAvailability, d) ? '' : 'inactive'}`}
                        onClick={() => setSelectedDate(d)}
                    >
                        <p className="day">{dayOfTheWeekTranslatedAbr[d.getDay()]}</p>
                        <p className="date">{d.getDate()}</p>
                    </DateContainer>
                ))}
            </Container>
            <Container style={{ minHeight: '50px' }}>
                {hours.map((h) => (
                    <HourContainer
                        key={h}
                        type="button"
                        disabled={!isAvailable(h)}
                        className={`${selectedHour === h ? 'selected' : ''}`}
                        onClick={() => setSelectedHour(h)}
                    >
                        <p>{getDisplayTime(h)}</p>
                    </HourContainer>
                ))}
            </Container>
            <Button style={{ marginTop: '20px' }} onClick={() => history.push('/appointment', { date: selectedDate, time: selectedHour, therapistId})}>
                Agendar
            </Button>
        </>
    );
};

export default DateSelection;

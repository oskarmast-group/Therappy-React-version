import Button from 'components/Button';
import { isEqual } from 'date-fns';
import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { DARK_TEXT, GOLDEN, GOLDEN_HIGHLIGHT, PRIMARY_GREEN } from 'resources/constants/colors';
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
            color: white;
        }
    }

    &.inactive {
        pointer-events: none;
        opacity: 0.3;
    }
`;

const checkDay = (timeAvailability, date) => {
    const day = new Date(date);
    const dateString = day.toISOString().substring(0, 10);
    const dayString = dayOfTheWeek[day.getDay()];
    if (timeAvailability.specialDates[dateString] === null) {
        return false;
    }
    if (timeAvailability.hours[dayString] === null) {
        return false;
    }
    return true;
};

const getTimesFromRange = (hours) => {
    const times = [];
    for (const range of hours) {
        const [start, end] = range;
        let startTime = dateObjectFromTimeString(start);
        const endTime = dateObjectFromTimeString(end);
        while (isDateAfter(endTime, startTime)) {
            const timeString = timeFormat(startTime);
            times.push(timeString);
            startTime = addHours(timeString, 1);
        }
    }
    return times;
};

const getHours = (timeAvailability, date) => {
    const day = new Date(date);
    const dateString = day.toISOString().substring(0, 10);
    const dayString = dayOfTheWeek[day.getDay()];
    const specialHours = timeAvailability.specialDates[dateString];
    const hours = timeAvailability.hours[dayString];
    if (!!specialHours && !!specialHours.hours) {
        return getTimesFromRange(specialHours.hours);
    }
    if (!!hours) {
        return getTimesFromRange(hours);
    }
    return [];
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
            color: white;
        }
    }
`;

const DateSelection = ({ therapistId, timeAvailability, appointments }) => {
    const history = useHistory();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const dates = useMemo(() => {
        const days = [];
        const today = new Date();
        for (let i = 2; i <= 15; i++) {
            const day = addDays(today, i);
            days.push(day);
        }
        setSelectedDate(days[0]);
        return days;
    }, []);

    const hours = useMemo(() => getHours(timeAvailability, selectedDate), [timeAvailability, selectedDate]);

    useEffect(() => {
        if (hours.length === 0) {
            setSelectedHour(null);
            return;
        }
        setSelectedHour(hours[0]);
    }, [hours]);

    const isAvailable = (hour) => {
        if (!appointments || appointments.length === 0) return true;
        for (const app of appointments) {
            const appDate = new Date(app.date);
            const date = new Date(`${dateFormat(selectedDate)}T${hour}`);
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
                        <p>{getDisplayTime(dateObjectFromTimeString(h))}</p>
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

import Button from 'components/Button';
import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { GOLDEN, PRIMARY_GREEN } from 'resources/constants/colors';
import styled from 'styled-components';
import { dayOfTheWeekTranslatedAbr } from 'utils/text';
import { addDays, dayOfTheWeek, timeStringFromHourInt } from 'utils/time';

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

const getHours = (timeAvailability, date) => {
    const day = new Date(date);
    const dateString = day.toISOString().substring(0, 10);
    const dayString = dayOfTheWeek[day.getDay()];
    const specialHours = timeAvailability.specialDates[dateString];
    const hours = timeAvailability.hours[dayString];
    const times = [];
    if (!!specialHours) {
        for (const group of specialHours) {
            const [start, end] = group;
            for (let i = start; i <= end; i++) {
                times.push(i);
            }
        }
        return times;
    }
    for (const group of hours) {
        const [start, end] = group;
        for (let i = start; i < end; i++) {
            times.push(i);
        }
    }
    return times;
};

const HourContainer = styled.div`
    min-width: 85px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    border: solid ${GOLDEN} 1px;
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
    p {
        margin: 0;
        color: #1e2205;
    }

    &.selected {
        background-color: ${GOLDEN};
        p {
            color: white;
        }
    }
`;

const DateSelection = ({ timeAvailability }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const dates = useMemo(() => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < 15; i++) {
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

    return (
        <>
            <Container>
                {dates.map((d) => (
                    <DateContainer
                        className={`${selectedDate === d ? 'selected' : ''} ${checkDay(timeAvailability, d) ? '' : 'inactive'}`}
                        onClick={() => setSelectedDate(d)}
                    >
                        <p className="day">{dayOfTheWeekTranslatedAbr[d.getDay()]}</p>
                        <p className="date">{d.getDate()}</p>
                    </DateContainer>
                ))}
            </Container>
            <Container>
                {hours.map((h) => (
                    <HourContainer className={`${selectedHour === h ? 'selected' : ''}`} onClick={() => setSelectedHour(h)}>
                        <p>{timeStringFromHourInt(h)}</p>
                    </HourContainer>
                ))}
            </Container>
            <Button onClick={()=>{}}>Agendar</Button>
        </>
    );
};

export default DateSelection;

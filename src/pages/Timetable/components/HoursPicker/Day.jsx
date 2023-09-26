import Checkbox from 'components/Checkbox';
import { add, addDays, format, isAfter, isBefore, isEqual, parse, set } from 'date-fns';
import React, { useEffect } from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import styled from 'styled-components';
import { dateFormat, getDisplayDate, isDateAfter } from 'utils/date';
import { addHours, dateObjectFromTimeString, getDisplayTime, timeFormat } from 'utils/time';
import TimeInterval from './TimeInterval';
import Switch from 'components/Switch';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const DayContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: flex-start;
    flex-direction: column;
    padding: 5px 0;
    min-height: 45px;
`;

const DayTitle = styled.label`
    padding: 0;
    min-width: 110px;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    cursor: pointer;
`;

const Day = ({ date, timeAvailability = {}, updateTimeAvailability }) => {
    const startingHours = useMemo(() => {
        const currentDate = new Date(date);
        const nextDate = addDays(currentDate, 1);
        const hours = [];

        for (const entry of Object.entries(timeAvailability)) {
            const [, value] = entry;
            const hour = new Date(value);
            if (isAfter(hour, currentDate) && isBefore(hour, nextDate)) {
                hours.push(entry);
            }
        }

        return hours;
    }, [timeAvailability, date]);

    const toggleActive = () => {
        if (startingHours.length > 0) {
            for (const [key] of startingHours) {
                delete timeAvailability[key];
            }
            updateTimeAvailability({ ...timeAvailability });
        } else {
            const currentDate = new Date(date);
            updateTimeAvailability({
                ...timeAvailability,
                [uuidv4()]: set(currentDate, { hours: 9, minutes: 0, seconds: 0, milliseconds: 0 }).getTime(),
            });
        }
    };

    const addInterval = () => {
        const lastTime = new Date(startingHours[startingHours.length - 1][1]);

        updateTimeAvailability({
            ...timeAvailability,
            [uuidv4()]: add(lastTime, { hours: 1 }).getTime(),
        });
    };

    const removeInterval = (key) => () => {
        delete timeAvailability[key];
        updateTimeAvailability({ ...timeAvailability });
    };

    const setInterval = (key) => (value) => {
        timeAvailability[key] = value;
        updateTimeAvailability({ ...timeAvailability });
    };

    return (
        <DayContainer>
            <DayTitle>
                <Switch
                    id={'input' + date}
                    type={'checkbox'}
                    checked={startingHours.length > 0}
                    onChange={toggleActive}
                />
                {getDisplayDate(date, 'EEEE d')}
            </DayTitle>
            <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto', gap: '5px', width: '100%' }}>
                {startingHours.map((hour, i, hours) => (
                    <TimeInterval
                        key={i}
                        hour={hour[1]}
                        hoursCount={startingHours.length}
                        isLast={startingHours.length - 1 === i}
                        addInterval={addInterval}
                        removeInterval={removeInterval(hour[0])}
                        setInterval={setInterval(hour[0])}
                        previousValue={i > 0 ? hours[i - 1][1] : null}
                    />
                ))}
            </div>
        </DayContainer>
    );
};

export default Day;

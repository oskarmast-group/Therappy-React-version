import React from 'react';
import styled from 'styled-components';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import { addHours, dateObjectFromTimeString, timeFormat } from 'utils/time';
import AddSVG from 'resources/img/icons/add-icon.svg';
import RemoveSVG from 'resources/img/icons/close-icon-alt.svg';
import { isDateAfter } from 'utils/date';
import { isEqual } from 'date-fns';

const TimeButton = styled.select`
    padding: 5px;
    min-width: 80px;
    border: solid 1px ${PRIMARY_GREEN};
    border-radius: 5px;
    background-color: transparent;
    position: relative;
`;

const times = [
    { value: '06:00', label: '6:00 AM' },
    { value: '07:00', label: '7:00 AM' },
    { value: '08:00', label: '8:00 AM' },
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' },
    { value: '18:00', label: '6:00 PM' },
    { value: '19:00', label: '7:00 PM' },
    { value: '20:00', label: '8:00 PM' },
    { value: '21:00', label: '9:00 PM' },
    { value: '22:00', label: '10:00 PM' },
    { value: '23:00', label: '11:00 PM' },
];

const TimePicker = ({ hour, setHour }) => {

    return (
        <TimeButton value={hour} onChange={(e)=>{setHour(e.target.value)}}>
            {times.map((time) => (
                <option key={time.label} value={time.value}>{time.label}</option>
            ))}
        </TimeButton>
    );
};

const IntervalButton = styled.button`
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    width: 20px;
    height: 20px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 100%;
        height: 100%;
    }
`;

const TimeInterval = ({ interval, intervalsCount, isLast, addInterval, removeInterval, setInterval }) => {

    const changeFirst = (hour) => {
        const first = dateObjectFromTimeString(hour);
        const second = dateObjectFromTimeString(interval[1]);
        if(isEqual(first, second)) return;
        if(isDateAfter(first, second)) {
            const newSecond = timeFormat(addHours(hour, 1));
            setInterval([hour, newSecond]);
            return;
        }
        setInterval([hour, interval[1]]);
    }

    const changeSecond = (hour) => {
        const first = dateObjectFromTimeString(interval[0]);
        const second = dateObjectFromTimeString(hour);
        if(isEqual(first, second)) return;
        if(isDateAfter(first, second)) return;
        setInterval([interval[0], hour]);
    }

    return (
        <div style={{ display: 'flex', gap: '5px', flex: 1, alignItems: 'center' }}>
            <TimePicker hour={interval[0]} setHour={changeFirst} />
            <TimePicker hour={interval[1]} setHour={changeSecond} />
            {intervalsCount === 1 ? (
                <IntervalButton onClick={addInterval}>
                    <img src={AddSVG} alt={'Añadir'} />
                </IntervalButton>
            ) : (
                <>
                    <IntervalButton onClick={removeInterval}>
                        <img style={{ width: '70%', height: '70%' }} src={RemoveSVG} alt={'Quitar'} />
                    </IntervalButton>
                    {isLast && (
                        <IntervalButton onClick={addInterval}>
                            <img src={AddSVG} alt={'Añadir'} />
                        </IntervalButton>
                    )}
                </>
            )}
        </div>
    );
};

export default TimeInterval;

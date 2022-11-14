import React, { useEffect, useState } from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import styled from 'styled-components';
import { tranlateDay } from 'utils/text';
import { daysInOrder } from 'utils/time';
import Day from './Day';

const DaysContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const UpdateButton = styled.button`
    padding: 3px 10px;
    background-color: ${PRIMARY_GREEN};
    font-size: 12px;
    color: white;
    border: none;
    outline: none;
    border-radius: 20px;
    height: fit-content;
    align-self: center;
    width: fit-content;
`;

const HoursPicker = ({ hours, setHours }) => {
    const [timetable, setTimetable] = useState({});

    useEffect(()=>{
        setTimetable(hours);
    },[hours]);

    useEffect(()=>{console.log('timetable', timetable)},[timetable]);

    const addHourSegment = (day) => (hoursSegments) => {
        console.log(day, hoursSegments);
        setTimetable({...timetable, [day]: hoursSegments})
    };

    return (
        <>
            <div style={{ display: 'flex', gap: '10px' }}>
                <h2>Horario regular</h2>
                <UpdateButton type='button'>Actualizar</UpdateButton>
            </div>
            <DaysContainer>
                {daysInOrder.map((day) => (
                    <Day key={day} title={tranlateDay[day]} hoursSegments={timetable[day]} setHoursSegments={addHourSegment(day)} />
                ))}
            </DaysContainer>
        </>
    );
};

export default HoursPicker;

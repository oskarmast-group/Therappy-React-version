import React from 'react';
import styled from 'styled-components';
import { tranlateDay } from 'utils/text';
import { daysInOrder } from 'utils/time';
import Day from './Day';

const DaysContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;


const HoursPicker = ({ hours, onChange }) => {
    const addHourSegment = (day) => (hoursSegments) => {
        onChange({ ...hours, [day]: hoursSegments });
    };

    return (
        <DaysContainer>
            {daysInOrder.map((day) => (
                <Day
                    key={day}
                    title={tranlateDay[day]}
                    hoursSegments={hours[day]}
                    setHoursSegments={addHourSegment(day)}
                />
            ))}
        </DaysContainer>
    );
};

export default HoursPicker;

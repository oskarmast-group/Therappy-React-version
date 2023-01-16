import { Ring } from '@uiball/loaders';
import React, { useEffect, useState } from 'react';
import { GREEN, PRIMARY_GREEN } from 'resources/constants/colors';
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

const HoursPicker = ({ hours, onChange, hoursChanged, loading, onSubmit }) => {

    const addHourSegment = (day) => (hoursSegments) => {
        onChange({...hours, [day]: hoursSegments})
    };

    return (
        <>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <h3>Horario regular</h3>
                {hoursChanged && <UpdateButton type='button' onClick={onSubmit}>Actualizar</UpdateButton>}
                {loading && <Ring color={GREEN} size={25} />}
            </div>
            <DaysContainer>
                {daysInOrder.map((day) => (
                    <Day key={day} title={tranlateDay[day]} hoursSegments={hours[day]} setHoursSegments={addHourSegment(day)} />
                ))}
            </DaysContainer>
        </>
    );
};

export default HoursPicker;

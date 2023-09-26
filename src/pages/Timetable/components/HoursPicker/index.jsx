import React from 'react';
import styled from 'styled-components';
import Day from './Day';
import { dateFormat } from 'utils/date';
import { useState } from 'react';
import { useEffect } from 'react';
import HoursPickerProvider from './HoursPickerContext';

const DaysContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const HoursPicker = ({ timeAvailability, dates, updateTimeAvailability, setWithError }) => {

    return (
        <HoursPickerProvider setWithError={setWithError}>
            <DaysContainer>
                {dates.map((date) => (
                    <Day
                        key={date.getTime()}
                        date={date.getTime()}
                        timeAvailability={timeAvailability}
                        updateTimeAvailability={updateTimeAvailability}
                    />
                ))}
            </DaysContainer>
        </HoursPickerProvider>
    );
};

export default HoursPicker;

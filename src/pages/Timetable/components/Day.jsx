import Checkbox from 'components/Checkbox';
import { isEqual } from 'date-fns';
import React from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import styled from 'styled-components';
import { isDateAfter } from 'utils/date';
import { addHours, dateObjectFromTimeString, getDisplayTime, timeFormat } from 'utils/time';
import TimeInterval from './TimeInterval';

const DayContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 5px 0;
    min-height: 45px;
`;

const DayTitle = styled.label`
    padding: 0;
    min-width: 110px;
    user-select: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    input {
        margin-right: 10px;
    }
`;

const Day = ({ title, hoursSegments, setHoursSegments }) => {
    const toggleActive = () => {
        if (!!hoursSegments) {
            setHoursSegments(null);
        } else {
            setHoursSegments([['09:00', '13:00']]);
        }
    };

    const addInterval = () => {
        let lastDate = hoursSegments[0][1];
        for (const segment of hoursSegments) {
            const toCompare = dateObjectFromTimeString(lastDate);
            const current = dateObjectFromTimeString(segment[1]);
            if (isDateAfter(current, toCompare)) {
                lastDate = segment[1];
            }
        }

        const segments = [...hoursSegments, [timeFormat(addHours(lastDate, 1)), timeFormat(addHours(lastDate, 2))]];
        setHoursSegments(segments);
    };

    const removeInterval = (i) => () => {
        const segments = [...hoursSegments];
        segments.splice(i, 1);
        setHoursSegments(segments);
    };

    const setInterval = (i) => (newSegment) => {
        const segments = [...hoursSegments];
        const prev = i-1;
        const nxt = i+1;
        segments[i] = newSegment;
        if(prev>=0) {
            const previous = dateObjectFromTimeString(segments[prev][1]);
            const current = dateObjectFromTimeString(segments[i][0]);
            console.log(previous, current);
            if(isEqual(previous, current)) return;
            if(isDateAfter(previous, current)) return;
        }
        if(nxt <= hoursSegments.length-1) {
            const current = dateObjectFromTimeString(segments[i][1]);
            const next = dateObjectFromTimeString(segments[nxt][0]);
            if(isEqual(current, next)) return;
            if(isDateAfter(current, next)) return;
        }
        setHoursSegments(segments);
    }

    return (
        <DayContainer>
            <DayTitle>
                <Checkbox id={'input' + title} type={'checkbox'} checked={!!hoursSegments} onChange={toggleActive} />
                {title}
            </DayTitle>
            {!!hoursSegments ? (
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '5px' }}>
                    {hoursSegments.map((interval, i) => (
                        <TimeInterval
                            key={i}
                            interval={interval}
                            intervalsCount={hoursSegments.length}
                            isLast={hoursSegments.length - 1 === i}
                            addInterval={addInterval}
                            removeInterval={removeInterval(i)}
                            setInterval={setInterval(i)}
                        />
                    ))}
                </div>
            ) : (
                'No asignado'
            )}
        </DayContainer>
    );
};

export default Day;

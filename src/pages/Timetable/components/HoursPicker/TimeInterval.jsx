import React from 'react';
import styled from 'styled-components';
import { PRIMARY_GREEN, RED, RED_LIGHT } from 'resources/constants/colors';
import { addHours, dateObjectFromTimeString, timeFormat } from 'utils/time';
import AddSVG from 'resources/img/icons/add-icon.svg';
import RemoveSVG from 'resources/img/icons/close-icon-alt.svg';
import { dateFormat, isDateAfter } from 'utils/date';
import { add, addMinutes, isBefore, isEqual, parse } from 'date-fns';
import { useAlert } from 'alert';
import ALERT_TYPES from 'alert/types';
import TimePickerDialog from 'components/TimePickerDialog';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHoursPicker } from './HoursPickerContext';
import { useEffect } from 'react';

const TimeButton = styled.button`
    padding: 5px;
    min-width: 80px;
    border: solid 1px ${PRIMARY_GREEN};
    border-radius: 5px;
    background-color: transparent;
    position: relative;
`;

const TimePicker = ({ hour, setHour }) => {
    const alert = useAlert();

    const onChangeTime = () => {
        alert({
            type: ALERT_TYPES.CUSTOM,
            config: {
                body: TimePickerDialog,
                props: {
                    initialTime: new Date(hour),
                },
            },
        })
            .then((time) => {
                setHour(time.getTime());
            })
            .catch(() => {});
    };

    return (
        <TimeButton type={'button'} onClick={onChangeTime}>
            {dateFormat(new Date(hour), 'h:mm a')}
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

const TimeIntervalContainer = styled.div`
    display: flex;
    gap: 10px;
    flex: 1 1 auto;
    width: 100%;
    align-items: center;
    padding: 5px;
    &.error {
        background-color: ${RED_LIGHT};
        border-radius: 8px;
    }
`;

const TimeInterval = ({ hour, hoursCount, isLast, addInterval, removeInterval, setInterval, previousValue = null }) => {
    const { dispatch } = useHoursPicker();
    const uniqueId = useMemo(() => uuidv4(), []);

    const changeFirst = (hour) => {
        setInterval(hour);
    };

    useEffect(() => {
        return () => {
            dispatch({ type: 'REMOVE_ERROR', id: uniqueId });
        };
    }, [uniqueId, dispatch]);

    const hasError = useMemo(() => {
        if (!previousValue) return false;
        const previousTime = new Date(previousValue);
        const previousEnd = addMinutes(previousTime, 55);

        const currentTime = new Date(hour);

        return isBefore(currentTime, previousEnd);
    }, [hour, previousValue]);

    useEffect(() => {
        dispatch({ type: 'SET_ERROR', id: uniqueId, error: hasError });
    }, [dispatch, hasError]);

    return (
        <TimeIntervalContainer className={hasError ? 'error' : ''}>
            <TimePicker hour={hour} setHour={changeFirst} />-{' '}
            {dateFormat(add(new Date(hour), { minutes: 50 }), 'h:mm a')}
            {hoursCount === 1 ? (
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
        </TimeIntervalContainer>
    );
};

export default TimeInterval;

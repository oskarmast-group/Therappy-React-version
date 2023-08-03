import { TimeClock } from '@mui/x-date-pickers';
import Base from 'alert/dialog/components/Base';
import Button from 'components/Button';
import { Title } from 'components/Text';
import { addHours, getHours } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { GREEN, GREEN_HIGHLIGHT, PRIMARY_GREEN } from 'resources/constants/colors';
import styled from 'styled-components';
import { dateFormat } from 'utils/date';

const TimeDisplayContainer = styled.div`
    display: flex;
    gap: 10px;
    user-select: none;
`;

const AMPMButton = styled.button`
    padding: 5px 12px;
    border: solid 1px ${PRIMARY_GREEN};
    border-radius: 5px;
    background-color: transparent;
    position: relative;
    height: min-content;
    align-self: center;
    cursor: pointer;
    &.active {
        background-color: ${PRIMARY_GREEN};
        color: white;
    }
`;

const TitleContainer = styled.div`
    display: flex;
`;

const CustomTitle = styled(Title)`
    cursor: pointer;
    padding: 0px 2px;
    &.active {
        background-color: ${GREEN_HIGHLIGHT};
        border-radius: 8px;
    }
`;

const CustomTimeClock = styled(TimeClock)`
  width: unset;
  .MuiClock-root {
    margin: 0;
  }
`;

const TimePickerDialog = ({ open, onSubmit, onClose, initialTime }) => {
    const [time, setTime] = useState(initialTime);
    const [currentView, setCurrentView] = useState('hours');

    const switchToAM = () => {
        const hours = getHours(time);
        if (hours >= 12) {
            setTime(addHours(time, -12));
        }
    };

    const switchToPM = () => {
        const hours = getHours(time);
        if (hours < 12) {
            setTime(addHours(time, 12));
        }
    };

    const onChangeTime = (time) => {
        setTime(time);
        if (currentView === 'hours') setCurrentView('minutes');
    };

    return (
        <Base open={open} onClose={onClose} isResponsive={false}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                }}
            >
                <TimeDisplayContainer>
                    <TitleContainer>
                        <CustomTitle
                            className={currentView === 'hours' ? 'active' : ''}
                            onClick={() => setCurrentView('hours')}
                        >
                            {dateFormat(time, 'h')}
                        </CustomTitle>
                        <Title>:</Title>
                        <CustomTitle
                            className={currentView === 'minutes' ? 'active' : ''}
                            onClick={() => setCurrentView('minutes')}
                        >
                            {dateFormat(time, 'mm')}
                        </CustomTitle>
                    </TitleContainer>
                    <AMPMButton className={getHours(time) < 12 ? 'active' : ''} type="button" onClick={switchToAM}>
                        AM
                    </AMPMButton>
                    <AMPMButton className={getHours(time) >= 12 ? 'active' : ''} type="button" onClick={switchToPM}>
                        PM
                    </AMPMButton>
                </TimeDisplayContainer>
                <CustomTimeClock value={time} onChange={onChangeTime} view={currentView} />
                <Button type={'buttin'} style={{ width: '80%' }} onClick={()=>onSubmit(time)}>
                    Confirmar
                </Button>
            </div>
        </Base>
    );
};

export default TimePickerDialog;

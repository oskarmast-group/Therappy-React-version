import React, { useRef, useState } from 'react';
import Base from 'alert/dialog/components/Base';
import Button from 'components/Button';
import ActionsContainer from 'alert/dialog/components/ActionsContainer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { dateFormat } from 'utils/date';

const SelectDateDialog = ({ open, onSubmit, onClose, date }) => {
    const [selectedDate, setDate] = useState(date ? new Date(date) : new Date());
    const [step, setStep] = useState(0);

    const onConfirm = () => {
        const date = dateFormat(selectedDate);
        onSubmit(date);
    };

    const handleDateChange = (d) => {
        setDate(d);
        if(step === 0) setStep(1);
    };

    return (
        <Base open={open} onClose={onClose} isResponsive={false}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    utcOffset={-1}
                    inline
                    disabledKeyboardNavigation
                    showMonthYearPicker={step === 0}
                />
            </div>
            <ActionsContainer>
                <Button type="button" onClick={onClose}>
                    Cancelar
                </Button>
                <Button type="button" disabled={step===0} onClick={onConfirm}>
                    Confirmar
                </Button>
            </ActionsContainer>
        </Base>
    );
};

export default SelectDateDialog;

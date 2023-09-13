import React from 'react';
import CalendarSVG from 'resources/img/icons/calendar.svg';
import { ContainerStyles, IconContainerStyles, IconStyles, LabelContainerStyles, LabelStyles, upLabel } from '../styles';
import styled from 'styled-components';
import { Ring } from '@uiball/loaders';
import { DARKER_TEXT, PRIMARY_GREEN } from 'resources/constants/colors';
import { getDisplayDate } from 'utils/date';
import SelectDateDialog from './SelectDateDialog';
import ALERT_TYPES from 'alert/types';
import { useAlert } from 'alert';

const Container = styled.div`
    ${ContainerStyles}
    ${({ withLabel }) => (withLabel ? 'margin-top: 20px;' : '')}
    .img-container {
        ${IconContainerStyles}
        img {
            ${IconStyles}
        }
    }
    .value-container {
        flex: 1;
        position: relative;
        p {
            width: 100%;
            color: ${DARKER_TEXT};
            flex-grow: 1;
            margin: 0;
            margin-right: 10px;
        }
    }
    .label-container {
        ${LabelContainerStyles}
        label {
            ${LabelStyles}
            ${upLabel}
        }
    }
    .img-edit-container {
        width: 30px;
        height: 100%;
        display: flex;
        background-color: transparent;
        outline: none;
        border: none;
        img {
            width: 100%;
            height: 100%;
            justify-self: center;
        }
    }
`;

const CalendarInput = ({style = {}, iconProps = {}, inputProps = {}, labelProps = {}, loading = false}) => {
    const { value, onChange, ...restInputProps } = inputProps;

    const alert = useAlert();

    const { icon = '', ...restIconProps } = iconProps;

    const { label = '', ...restLabelProps } = labelProps;

    const withIcon = !!icon;

    console.log(value)

    const formattedValue = value ? getDisplayDate(value) : 'Selecciona una fecha';

    const onClick = () => {
        alert({
            type: ALERT_TYPES.CUSTOM,
            config: {
                body: SelectDateDialog,
                props: {
                    date: value,
                },
            },
        })
            .then((date) => {
                onChange(date);
            })
            .catch(() => {});
    };
    
    return (
        <Container style={style} withLabel={!!label}>
            {withIcon && (
                <div className="img-container">
                    <img src={icon} alt={'Icon'} {...restIconProps} />
                </div>
            )}
            <div className="value-container">
                <p>{formattedValue}</p>
            </div>
            {label && (
                <div className="label-container">
                    <label {...restLabelProps}>
                        {label}
                    </label>
                </div>
            )}
            <button type="button" className="img-edit-container" onClick={onClick}>
                {loading ? <Ring color={PRIMARY_GREEN} size={22} /> : <img src={CalendarSVG} alt={'Calendario'} />}
            </button>
        </Container>
    );
};

export default CalendarInput;

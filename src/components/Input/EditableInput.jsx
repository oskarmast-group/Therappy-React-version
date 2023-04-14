import React, { useState, useEffect, useRef  } from 'react';
import Container from './styles';
import EditSVG from 'resources/img/icons/edit-hollow-icon.svg';
import CheckSVG from 'resources/img/icons/check-circle-icon.svg';
import styled from 'styled-components';
import { Ring } from '@uiball/loaders';
import { PRIMARY_GREEN } from 'resources/constants/colors';

const CustomContainer = styled(Container)`
    input:disabled {
        background-color: white;
    }

    .img-edit-container {
        width: 30px;
        margin: 0;
        min-height: 30px;
        display: flex;
        background-color: transparent;
        align-items: center;
        outline: none;
        border: none;
        img {
            width: 100%;
            height: 100%;
            justify-self: center;
        }
    }
`;

const EditableInput = ({
    style = {},
    iconProps = {},
    inputProps = {},
    labelProps = {},
    onSubmit = () => {},
    loading = false,
}) => {
    const [isEditing, setEditing] = useState(false);
    const inputRef = useRef();

    const defaultInputProps = { type: 'text' };
    const { value, ...restInputProps } = inputProps;
    const mergedInputProps = { ...defaultInputProps, ...restInputProps };

    const { icon = '', ...restIconProps } = iconProps;

    const { label = '', ...restLabelProps } = labelProps;

    const validValue = (!!value || value === 0 || value === '0') && !!label;

    const withIcon = !!icon;

    useEffect(() => {
        if (!inputRef.current) return;
        if (isEditing) {
            inputRef.current.focus();
        } else {
            inputRef.current.blur();
        }
    }, [isEditing]);

    const onClick = () => {
        if (isEditing) onSubmit(value);
        setEditing(!isEditing);
    };

    return (
        <CustomContainer style={style} withLabel={!!label}>
            {withIcon && (
                <div className="img-container">
                    <img src={icon} alt={'Icon'} {...restIconProps} />
                </div>
            )}
            <div className="input-container">
                <input value={value} {...mergedInputProps} disabled={!isEditing} ref={inputRef} />
            </div>
            {label && (
                <div className="label-container">
                    <label className={validValue || isEditing ? 'up' : ''} {...restLabelProps}>
                        {label}
                    </label>
                </div>
            )}
            <button type="button" className="img-edit-container" onClick={onClick}>
                {loading ? (
                    <Ring color={PRIMARY_GREEN} size={22} />
                ) : (
                    <img src={isEditing ? CheckSVG : EditSVG} alt={isEditing ? 'Guardar' : 'Editar'} />
                )}
            </button>
        </CustomContainer>
    );
};

export default EditableInput;

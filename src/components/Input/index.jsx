import React from 'react';
import Container from './Container';

const IconPositions = {
    LEADING: 'leading',
    TRAILING: 'trailing',
    NONE: 'none',
};

const Input = ({ style = {}, iconProps = {}, inputProps = {}, labelProps = {} }) => {
    const defaultInputProps = { type: 'text' };
    const { value, ...restInputProps } = inputProps;
    const mergedInputProps = { ...defaultInputProps, ...restInputProps };

    const { icon = '', position: iconPosition = IconPositions.LEADING, ...restIconProps } = iconProps;

    const { label = '', ...restLabelProps } = labelProps;

    const validValue = (!!value || value === 0 || value === '0') && !!label;

    const withIcon = !!icon && iconPosition !== IconPositions.NONE;

    return (
        <Container style={style} withLabel={!!label}>
            {withIcon && iconPosition === IconPositions.LEADING && (
                <div className="img-container">
                    <img src={icon} alt={'Icon'} {...restIconProps} />
                </div>
            )}
            <div className="input-container">
                <input value={value} {...mergedInputProps} />
            </div>
            {label && (
                <div className="label-container">
                    <label className={validValue ? 'up' : ''} {...restLabelProps}>{label}</label>
                </div>
            )}
            {withIcon && iconPosition === IconPositions.TRAILING && (
                <div className="img-container">
                    <img src={icon} alt={'Icon'} {...restIconProps} />
                </div>
            )}
        </Container>
    );
};

export default Input;

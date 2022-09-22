import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 30px 1fr;
    grid-template-rows: 30px;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: 1px solid #687711;
    border-radius: 30px;
    position: relative;
    img {
        justify-self: center;
    }
    input {
        border: none;
        outline: none;
        &::placeholder {
            opacity: 1;
            color: #484848;
        }
        flex-grow: 1;
        margin-right: 10px;
    }
    .label-container {
        height: 100%;
        position: absolute;
        label {
            font-size: 0.875rem;
            font-weight: 500;
        }
    }
`;

const Input = ({ style = {}, icon, inputProps = {}, labelProps = {} }) => {
    const defaultInputProps = { type: 'text' };
    const { value, ...restInputProps } = inputProps;
    const mergedInputProps = { ...defaultInputProps, ...restInputProps };

    const { label = '', /*...restLabelProps*/ } = labelProps;

    //const validValue = (!!value || value === 0 || value === '0') && !!label;

    return (
        <Container style={style}>
            <img src={icon} alt={'Icon'} />
            <input className={`${!!label ? 'input-hover' : ''} ${!!label ? 'up' : ''}`} value={value} {...mergedInputProps} />
        </Container>
    );
};

export default Input;

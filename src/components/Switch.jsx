import React from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import styled from 'styled-components';

const Container = styled.label`
    position: relative;
    display: inline-block;
    --height: 25px;
    width: calc(var(--height) * 1.75);
    height: var(--height);

    input {
        opacity: 0;
        width: 0;
        height: 0;

        &:checked + span {
            background-color: ${PRIMARY_GREEN};
        }

        &:checked + span:before {
            transform: translateX(calc(var(--height) - 8px));
        }
    }

    span {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: var(--height);

        &:before {
            position: absolute;
            content: '';
            height: calc(var(--height) - 8px);
            width: calc(var(--height) - 8px);
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
        }

        &:active:before {
            width: calc(var(--height) - 2px);
        }
    }
`;

const Switch = ({ label, checked, disabled = false, className, ...rest }) => {
    return (
        <Container className={className}>
            <input {...rest} type={'checkbox'} checked={checked} disabled={disabled} />
            <span></span>
        </Container>
    );
};

export default Switch;

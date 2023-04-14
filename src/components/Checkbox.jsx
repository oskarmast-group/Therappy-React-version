import React from 'react';
import { GREEN, PRIMARY_GREEN } from 'resources/constants/colors';
import styled from 'styled-components';

const Input = styled.input`
    height: 20px;
    width: 20px;
    cursor: pointer;
    border: 2px solid ${PRIMARY_GREEN};
    border-radius: 4px;
    -webkit-appearance: none;
    margin: 0;
    outline: none;
    position: relative;
    padding: 0;

    &:hover {
        border: 2px solid ${PRIMARY_GREEN};
        background: ${GREEN};
    }

    &:checked:before {
        content: '';
        display: block;
        width: 3px;
        height: 6px;
        border: solid ${PRIMARY_GREEN};
        border-width: 0 2px 2px 0;
        position: absolute;
        top: 3px;
        left: 5px;
        background-color: transparent;
        transform: rotate(45deg);
    }

    @media (min-width: 650px) {
        height: 20px;
        width: 20px;
        margin-top: 0px;
    }
`;

const Checkbox = ({ checked, disabled = false, className, ...rest }) => {
    return (
        <Input
            {...rest}
            type={'checkbox'}
            checked={checked}
            disabled={disabled}
            className={className}
        />
    );
};

export default Checkbox;

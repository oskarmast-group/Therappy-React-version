import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 35px;
    height: 35px;
    border-radius: 25px;
    border: none;
    outline: none;
    background-color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 20px;
        height: 20px;
        margin: auto;
    }
`;

const CircleActionButton = ({ src, alt, onClick }) => {
    return (
        <Button type="button" onClick={onClick}>
            <img src={src} alt={alt} />
        </Button>
    );
};

export default CircleActionButton;

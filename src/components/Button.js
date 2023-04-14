import { PRIMARY_GREEN } from 'resources/constants/colors';
import styled from 'styled-components';

export const IconButton = styled.button`
    border: none;
    outline: none;
    padding: 10px;
    background-color: ${PRIMARY_GREEN};
    border-radius: 15px;
    display: flex;
    gap: 20px;
    margin: 20px 0;
    cursor: pointer;
    align-items: center;
    img {
        height: 25px;
        width: auto;
    }
    p {
        margin: 0;
        font-size: 14px;
        color: white;
    }
`;


const Button = styled.button`
    width: 100%;
    padding: 10px;
    border-radius: 50px;
    border: none;
    outline: none;
    background-color: ${PRIMARY_GREEN};
    color: white;
    font-size: 1rem;
    cursor: pointer;

    &:disabled,
    &[disabled] {
        background-color: #cccccc;
        color: #666666;
        pointer-events: none;
        opacity: 0.6;
    }
`;

export default Button;

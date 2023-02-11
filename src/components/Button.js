import { PRIMARY_GREEN } from 'resources/constants/colors';
import styled from 'styled-components';

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

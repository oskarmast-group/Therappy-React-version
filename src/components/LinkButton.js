import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkButton = styled(Link)`
    width: 100%;
    padding: 10px;
    border-radius: 50px;
    border: none;
    outline: none;
    background-color: #687711;
    color: #fbfbfd;
    font-size: 1rem;
    text-decoration: none;
    
    &:disabled,
    &.disabled,
    &[disabled] {
        background-color: #cccccc;
        color: #666666;
        pointer-events: none;
        opacity: 0.6;
    }
`;

export default LinkButton;

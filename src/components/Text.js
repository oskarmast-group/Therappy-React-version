import { Link } from 'react-router-dom';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import styled from 'styled-components';

export const Title = styled.h1`
    margin: 0;
    font-size: 30px;
    font-weight: 600;
    color: ${PRIMARY_GREEN};
`;

export const Body = styled.p`
    margin: 0;
    font-size: 0.875rem;
    color: #1e2205;
`;

export const CustomLink = styled(Link)`
    color: #1e2205;
    text-decoration: none;
`;

export const SectionTitle = styled.h3`
    color: #1e2205;
    font-size: 18px;
    font-weight: 700;
    margin: 15px 0;
    margin-bottom: 5px;
`;
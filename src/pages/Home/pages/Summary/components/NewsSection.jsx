import React from 'react';
import styled from 'styled-components';
import { Container, Intructions } from './styles';

const NewsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90px;
    max-height: 380px;
`;

const Notice = styled.span`
    margin: 0;
    text-align: center;
`;

const NewsSection = () => {
    const newsList = [];
    return (
        <Container>
            <Intructions>Avisos</Intructions>
            <NewsContainer>
                {newsList.length === 0 ? <Notice>Si hay avisos recientes, apareceran aquí.</Notice> : <div></div>}
            </NewsContainer>
        </Container>
    );
};

export default NewsSection;

import React from 'react';
import styled from 'styled-components';
import { Container, Intructions } from './styles';

const PacientsContainer = styled.div`
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

const PacientListSection = () => {
    const pacientList = [];
    return (
        <Container>
            <Intructions>Pacientes</Intructions>
            <PacientsContainer>
                {pacientList.length === 0 ? <Notice>Cuando tengas pacientes asignados, aparecerán aquí.</Notice> : <div></div>}
            </PacientsContainer>
        </Container>
    );
};

export default PacientListSection;

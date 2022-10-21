import React from 'react';
import { useState } from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import styled from 'styled-components';

const Title = styled.h1`
    margin: 0;
    font-size: 30px;
    font-weight: 600;
    color: ${PRIMARY_GREEN};
    text-align: center;
`;

const Notice = styled.span`
    margin: 0;
    margin-top: 20px;
    text-align: center;
`;

const Tab = styled.button`
    padding: 10px 0;
    flex: 1;
    background-color: transparent;
    border: solid 2px ${PRIMARY_GREEN};
    color: ${PRIMARY_GREEN};
    border-radius: 10px;
    &.active {
        background-color: ${PRIMARY_GREEN};
        color: white;
    }
`;

const TabsContainer = styled.div`
    display: flex;
    gap: 5px;
    margin-top: 10px;
`;

const Calendar = () => {
    const [page, setPage] = useState(0);
    const messageList = [];
    return (
        <>
            <Title>Citas</Title>
            <TabsContainer>
                <Tab className={page === 0 ? 'active' : ''} onClick={() => setPage(0)}>
                    Próximas
                </Tab>
                <Tab className={page === 1 ? 'active' : ''} onClick={() => setPage(1)}>
                    Pasadas
                </Tab>
            </TabsContainer>
            {messageList.length === 0 ? (
                <Notice>
                    {page === 0 ? 'Cuando tengas citas pendientes apareceran aquí' : 'Tu historial de citas aparecerá aquí'}
                </Notice>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default Calendar;

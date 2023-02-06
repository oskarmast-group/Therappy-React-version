import React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { getDisplayDate } from 'utils/date';
import TextMessage from './Text';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
`;

const DateHeader = styled.p`
    text-align: center;
    margin: 5px;
`;

const Message = ({ message, previousMessage, nextMessage }) => {

    const shouldShowDate = useMemo(()=>{
        if(!previousMessage) return true;
        const date = new Date(message.createdAt);
        const previousDate = new Date(previousMessage.createdAt);
        if(date.getDay() > previousDate.getDay()) return true;
        return false;
    }, [message, previousMessage]);

    return (
        <Container>
            {shouldShowDate && <DateHeader>{getDisplayDate(message.createdAt, "MMMM d, yyyy")}</DateHeader>}
            {message.type === 'text' && <TextMessage message={message} nextMessage={nextMessage} />}
        </Container>
    );
};

export default Message;

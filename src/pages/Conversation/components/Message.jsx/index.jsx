import React, { useEffect, useRef } from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { getDisplayDate } from 'utils/date';
import AssignmentMessage from './Assignment';
import TextMessage from './Text';
import { GREEN_HIGHLIGHT } from 'resources/constants/colors';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    margin-bottom: 3px;
`;

const DateHeader = styled.p`
    text-align: center;
    margin: 5px;
    text-rendering: optimizeLegibility;
`;

const NewMessageHeader = styled.span`
    text-rendering: optimizeLegibility;
    text-align: center;
    margin: 5px;
    align-self: center;
    background-color: ${GREEN_HIGHLIGHT};
    padding: 5px 15px;
    border-radius: 10px;
`;

const Message = ({ message, previousMessage, nextMessage, onVisible=()=>{}, firstUnread }) => {
    const messageRef = useRef(null);

    const shouldShowDate = useMemo(()=>{
        if(!previousMessage) return true;
        const date = new Date(message.createdAt);
        const previousDate = new Date(previousMessage.createdAt);
        if(date.getDay() > previousDate.getDay()) return true;
        return false;
    }, [message, previousMessage]);

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              // The message is in view, update the read status
              onVisible(message);
            }
          },
          {
            threshold: 0.5, // The percentage of the target's visibility the observer's callback should be executed on
          }
        );
    
        if (messageRef.current) {
          observer.observe(messageRef.current);
        }
    
        return () => {
          observer.disconnect();
        };
      }, [message, onVisible]);

    return (
        <Container ref={messageRef}>
            {shouldShowDate && <DateHeader>{getDisplayDate(message.createdAt, "MMMM d, yyyy")}</DateHeader>}
            {message.uuid === firstUnread && <NewMessageHeader>Nuevos mensajes</NewMessageHeader>}
            {message.type === 'text' && <TextMessage message={message} nextMessage={nextMessage} />}
            {message.type === 'assignment' && <AssignmentMessage message={message} nextMessage={nextMessage} />}
        </Container>
    );
};

export default Message;

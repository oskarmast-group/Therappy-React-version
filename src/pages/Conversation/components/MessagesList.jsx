import React from 'react';
import { useEffect } from 'react';
import useMessages from 'state/messages';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    flex-direction: column;
    justify-content: flex-end;
    gap: 10px;
`;

const MessagesList = () => {
    const [state, dispatcher] = useMessages();
    return (
        <Container>
            {state.list.map((msg) => (
                <p key={msg.uuid}>{msg.payload.message}</p>
            ))}
        </Container>
    );
};

export default MessagesList;

import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSocket } from 'Socket.js';
import useMessages from 'state/messages';
import styled from 'styled-components';
import Message from './Message.jsx';

const Container = styled.div`
    display: flex;
    flex-grow: 1;
    min-height: 0;
    overflow-y: scroll;
    flex-direction: column-reverse;
    gap: 5px;
    flex-basis: 100vh;
`;

const MessagesList = () => {
    const [state, dispatcher] = useMessages();
    const [list, setList] = useState([]);
    const socket = useSocket();

    useEffect(()=>{
        return () => {
            dispatcher.clearChat();
        }
    },[]);

    useEffect(()=>{
        if(!socket) return;
        socket.off('new message').on('new message', (payload)=>{ 
            dispatcher.addMessage(payload);
         })
        return () => {
            dispatcher.clearChat();
        }
    },[socket]);

    useEffect(() => {
        setList(
            state.list.sort((a, b) => {
                return  new Date(b.createdAt) - new Date(a.createdAt);
            })
        );
    }, [state.list]);

    return (
        <Container>
            {list.map((msg, i) => (
                <Message
                    key={msg.uuid}
                    message={msg}
                    previousMessage={list[i + 1]}
                    nextMessage={list[i-1]}
                />
            ))}
        </Container>
    );
};

export default MessagesList;

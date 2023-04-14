import React from 'react';
import AttachFileSVG from 'resources/img/icons/attach-file-icon.svg';
import SendMessageSVG from 'resources/img/icons/send-message-icon.svg';
import { GREEN } from 'resources/constants/colors';
import styled from 'styled-components';
import useMessages from 'state/messages';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import useUser from 'state/user';

const Message = styled.div`
    display: flex;
    gap: 5px;
    align-items: flex-end;
    border: 1px solid ${GREEN};
    border-radius: 25px;
    padding: 3px;
    span {
        flex: 1;
        padding: 10px;
        min-height: 100%;
        max-height: 130px;
        overflow: scroll;
        min-width: 0;
        resize: vertical;
        cursor: text;
        &:focus {
            border: none;
            outline: none;
        }
        &[contenteditable]:empty::before {
            content: 'Escribe tu mensaje...';
            color: gray;
        }
    }

    button {
        outline: none;
        border: none;
        width: 40px;
        height: 40px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        img {
            width: 100%;
        }
    }
`;

const MessageInput = () => {
    const [, dispatcher] = useMessages();
    const messageRef = useRef();
    const [userState] = useUser();

    const send = () => {
        if(!messageRef.current) return;
        const message = messageRef.current.innerText;
        if(message.trim().length === 0) return;
        dispatcher.sendMessageStart({
            type: 'text',
            payload: { message },
            uuid: uuidv4(),
            from: { id:  userState.user.id },
            createdAt: new Date().toISOString(),
        });
        messageRef.current.innerText = '';
    }

    return (
        <Message>
            <button type="button">
                <img src={AttachFileSVG} alt="agregar archivo" />
            </button>
            <span
                role="textbox"
                contentEditable={true}
                ref={messageRef}
            ></span>
            <button type="button" onClick={send}>
                <img src={SendMessageSVG} alt="enviar mensaje" />
            </button>
        </Message>
    );
};

export default MessageInput;

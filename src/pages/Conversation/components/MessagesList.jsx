import React, { useCallback, useMemo, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSocket } from "Socket.js";
import useMessages from "state/messages";
import styled from "styled-components";
import Message from "./Message.jsx";
import useUser from "state/user/index.js";
import { useMessageScroll } from "../MessageScrollProvider.jsx";

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    overflow-y: scroll;
    flex-direction: column;
    display: flex;
`;

const Spacer = styled.div`
    flex: 1 1 auto;
    min-height: 12px;
`;

const MessagesBlock = styled.div`
    flex: 0 0 auto;
`;

const MessagesList = () => {
    const [state, dispatcher] = useMessages();
    const [userState] = useUser();
    const socket = useSocket();
    const [showHidden, setShowHidden] = useState(false);

    useEffect(() => {
        dispatcher.fetchStart();
        return () => {
            dispatcher.clearChat();
        };
    }, [dispatcher]);

    useEffect(() => {
        if (!socket) return;
        socket.off("new message").on("new message", (payload) => {
            dispatcher.addMessage(payload);
        });
    }, [socket, dispatcher]);

    const { scrollRef, checkAutoScroll } = useMessageScroll();

    const { visibleList, invisibleList, firstUnread, lastUnread } = useMemo(() => {
        let firstUnread = null;
        let lastUnread = null;
        const messages = state.list.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });
        const visible = [];
        let invisible = [];
        for (const msg of messages) {
            const unread = userState.current.id !== msg.from.id && msg.readTimestamp === null;
            visible.push(msg);
            if (!firstUnread && unread) firstUnread = msg.uuid;
            if (unread) lastUnread = msg.uuid;
            if (unread && visible.length > state.extraMessagesToFetch && messages.length > visible.length) {
                invisible = messages.slice(visible.length);
                break;
            }
        }
        return { visibleList: visible, invisibleList: invisible, firstUnread, lastUnread };
    }, [state.list, state.extraMessagesToFetch, userState]);

    const list = useMemo(
        () => (showHidden ? [...visibleList, ...invisibleList] : visibleList),
        [visibleList, invisibleList, showHidden]
    );

    useEffect(() => {
        checkAutoScroll();
    }, [visibleList]);

    const handleScroll = () => {
        setShowHidden(true);
    };

    const markAsRead = useCallback((message)=>{
        if(message.uuid === lastUnread) {
            dispatcher.markAsReadStart();
        }
    },[list, dispatcher, userState, lastUnread]);

    return (
        <Container ref={scrollRef} onScroll={showHidden ? null : handleScroll}>
            <Spacer />
            <MessagesBlock>
                {list.map((msg, i) => (
                    <Message
                        key={msg.uuid}
                        message={msg}
                        previousMessage={list[i - 1]}
                        nextMessage={list[i + 1]}
                        onVisible={markAsRead}
                        firstUnread={firstUnread}
                    />
                ))}
            </MessagesBlock>
        </Container>
    );
};

export default MessagesList;

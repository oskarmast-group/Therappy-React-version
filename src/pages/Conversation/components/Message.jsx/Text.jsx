import React from 'react';
import { useMemo } from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import useMessages from 'state/messages';
import useUser from 'state/user';
import styled from 'styled-components';
import { getDisplayTime } from 'utils/time';

const Container = styled.div`
    padding: 0 10px;
    background-color: ${PRIMARY_GREEN};
    width: fit-content;
    align-self: flex-end;
    border-radius: 7px;
    display: flex;
    align-items: flex-end;
    gap: 5px;
    max-width: 75%;
    span {
        color: white;
    }
    .text {
        font-size: 14px;
        margin: 10px 0;
    }
    .time {
        margin-bottom: 3px;
        font-size: 10px;
    }
    &.loading {
        opacity: 0.6;
    }
    &.last {
        border-radius: 7px 7px 0 7px;
    }
    &.other {
        align-self: flex-start;
        background-color: white;
        border: 1px solid ${PRIMARY_GREEN};
        span {
            color: ${PRIMARY_GREEN};
        }
        &.last {
            border-radius: 7px 7px 7px 0;
        }
    }
`;

const TextMessage = ({ message, nextMessage }) => {
    const [userState] = useUser();
    const [messagesStates] = useMessages();
    const isSelf = useMemo(
        () => userState.user.id === message.from.id,
        [userState.user, message.from]
    );
    const isLoading = useMemo(
        () => messagesStates.fetching.fetchOne?.config?.id === message.uuid,
        [messagesStates.fetching.fetchOne, message.from]
    );
    const lastInLine = useMemo(
        () => nextMessage?.from?.id !== message.from.id,
        [nextMessage, message.from]
    );
    return (
        <Container
            className={`${isSelf ? '' : 'other'} ${
                isLoading ? 'loading' : ''
            } ${lastInLine ? 'last' : ''}`}
        >
            <span className="text">{message.payload.message}</span>
            <span className="time">
                {getDisplayTime(new Date(message.createdAt))}
            </span>
        </Container>
    );
};

export default TextMessage;

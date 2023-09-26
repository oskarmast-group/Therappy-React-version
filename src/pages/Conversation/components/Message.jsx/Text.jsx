import React from "react";
import { useMemo } from "react";
import { DARK_TEXT, PRIMARY_GREEN } from "resources/constants/colors";
import useMessages from "state/messages";
import useUser from "state/user";
import styled from "styled-components";
import { getDisplayTime } from "utils/time";

const Container = styled.div`
    padding: 6px 9px 8px 7px;
    background-color: ${PRIMARY_GREEN};
    width: fit-content;
    align-self: flex-end;
    border-radius: 7px;
    text-rendering: optimizeLegibility;
    overflow-wrap: break-word;
    max-width: 95%;
    white-space: pre-wrap;
    border: 1px solid ${PRIMARY_GREEN};
    span {
        color: #fbfbfd;
    }
    .text {
        flex-grow: 1;
        span {
            line-height: 19px;
        }
    }
    .time {
        float: right;
        margin-top: -4px;
        margin-bottom: -10px;
        margin-left: 30px;
        vertical-align: baseline;
        span {
            font-size: 11px;
            line-height: 15px;
            white-space:nowrap;
        }
    }
    &.loading {
        opacity: 0.6;
    }
    &.last {
        border-radius: 7px 7px 0 7px;
    }
    &.other {
        align-self: flex-start;
        background-color: #fbfbfd;
        border: 1px solid ${PRIMARY_GREEN};
        span {
            color: ${PRIMARY_GREEN};
        }
        .time span {
            color: ${DARK_TEXT}
        }
        &.last {
            border-radius: 7px 7px 7px 0;
        }
    }
`;

const TextMessage = ({ message, nextMessage }) => {
    const [userState] = useUser();
    const [messagesStates] = useMessages();
    const isSelf = useMemo(() => userState.current.id === message.from.id, [userState, message]);
    const isLoading = useMemo(
        () => messagesStates.fetching.fetchOne?.config?.id === message.uuid,
        [messagesStates.fetching.fetchOne, message]
    );
    const lastInLine = useMemo(
        () => nextMessage?.from?.id !== message.from.id,
        [nextMessage, message.from]
    );

    return (
        <Container
            id={`message-${message.uuid}`}
            className={`${isSelf ? "" : "other"} ${isLoading ? "loading" : ""} ${
                lastInLine ? "last" : ""
            }`}
        >
            <div className="text">
                <span>{message.payload.message}</span>
            </div>
            <div className="time">
                <span >{getDisplayTime(new Date(message.createdAt))}</span>
            </div>
        </Container>
    );
};

export default TextMessage;

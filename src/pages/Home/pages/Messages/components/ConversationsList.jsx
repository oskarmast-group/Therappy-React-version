import React from 'react';
import styled from 'styled-components';
import ConversationCard from './ConversationCard';

const ListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 10px;
    padding: 0;
    flex: 1;
    min-height: 0;
    overflow: scroll;
    padding-bottom: 25px;
    margin-bottom: 0;
`;

const ConversationsList = ({ list }) => {
    return (
        <ListContainer>
            {list.sort((a, b) => {
                const dateA = a.lastMessage ? a.lastMessage.createdAt : a.createdAt; 
                const dateB = b.lastMessage ? b.lastMessage.createdAt : b.createdAt; 
                return new Date(dateB) - new Date(dateA);
            }).map((conversation) => (
                <ConversationCard key={conversation.uuid} conversation={conversation} />
            ))}
        </ListContainer>
    );
};

export default ConversationsList;

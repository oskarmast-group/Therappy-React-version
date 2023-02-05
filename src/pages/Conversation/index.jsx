import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Loading from 'components/Loading';
import useConversations from 'state/conversations';
import styled from 'styled-components';
import MessageInput from './components/MessageInput';
import MessagesList from './components/MessagesList';

const Container = styled.div`
    display: flex;
    flex: 1;
    min-height: 0;
    flex-direction: column;
    justify-items: flex-end;
    padding-top: 10px;
    gap: 5px;
    padding-bottom: 20px;
`;

const Name = styled.h3`
    text-align: center;
    margin: 0;
    font-size: 22px;
`;

const Conversation = () => {
    const [conversations, conversationsDispatcher] = useConversations();
    const { conversationId } = useParams();

    useEffect(() => {
        conversationsDispatcher.fetchOneStart(conversationId);
    }, []);

    const user = useMemo(
        () =>
            conversations.conversation?.users
                ? conversations.conversation.users[0]
                : null,
        [conversations.conversation]
    );

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar />
            {!!conversations.fetching.fetchOne.state ? (
                <Loading />
            ) : (
                <>
                    {user && <Name>{`${user.title ?? ''} ${user.name}`}</Name>}
                    <Container>
                        <MessagesList />
                        <MessageInput />
                    </Container>
                </>
            )}
        </MainContainer>
    );
};

export default Conversation;

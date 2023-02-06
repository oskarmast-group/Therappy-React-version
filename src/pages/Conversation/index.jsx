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
import useUser from 'state/user';
import { DARKER_TEXT } from 'resources/constants/colors';

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

const CustomTopBar = styled(TopBar)`
    h1 {
        font-size: 20px;
        color: ${DARKER_TEXT};
    }
`;

const Conversation = () => {
    const [conversations, conversationsDispatcher] = useConversations();
    const [, userDispatcher] = useUser();
    const { conversationId } = useParams();

    useEffect(() => {
        conversationsDispatcher.fetchOneStart(conversationId);
        userDispatcher.fetchStart();

        return () => {
            conversationsDispatcher.clearConversation();
        }
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
            <CustomTopBar title={`${user?.title ?? ''} ${user?.name ?? ''}`} />
            {!!conversations.fetching.fetchOne.state ? (
                <Loading />
            ) : (
                <Container>
                    <MessagesList />
                    <MessageInput />
                </Container>
            )}
        </MainContainer>
    );
};

export default Conversation;

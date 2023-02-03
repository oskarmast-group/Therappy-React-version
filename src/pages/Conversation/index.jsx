import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Loading from 'components/Loading';
import useConversations from 'state/conversations';

const Conversation = () => {
  const [conversations, conversationsDispatcher] = useConversations();
    const { conversationId } = useParams();

    useEffect(() => {
      //conversationsDispatcher.fetchOneStart(conversationId);
    }, []);

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar title={'Conversación'} />
            {!!conversations.fetching.state ? (
                <Loading />
            ) : (
                <>
                    Mensajes
                </>
            )}
        </MainContainer>
    );
};

export default Conversation;

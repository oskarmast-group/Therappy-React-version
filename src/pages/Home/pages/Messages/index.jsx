import Loading from 'components/Loading';
import React, { useEffect } from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import useConversations from 'state/conversations';
import useUser from 'state/user';
import styled from 'styled-components';
import ConversationsList from './components/ConversationsList';
import { UserTypes } from 'resources/constants/config';

const Title = styled.h1`
    margin: 0;
    font-size: 30px;
    font-weight: 600;
    color: ${PRIMARY_GREEN};
    text-align: center;
`;

const Notice = styled.span`
    margin: 0;
    margin-top: 20px;
    text-align: center;
`;

const Messages = () => {
    const [user] = useUser();
    const [conversations, conversationsDispatcher] = useConversations();

    useEffect(() => {
        conversationsDispatcher.fetchStart();
    }, []);
    
    return (
        <>
            <Title>Mensajes</Title>
            {conversations.fetching.fetch.state ? (
                <Loading />
            ) : conversations.list.length === 0 ? (
                <Notice>
                    {user.current?.userType === UserTypes.THERAPIST
                        ? 'Cuando te pongas en contacto con algún paciente tus mensajes aparecerán aquí'
                        : 'Cuando te pongas en contacto con algún especialista tus mensajes aparecerán aquí'}
                </Notice>
            ) : (
                <ConversationsList list={conversations.list} />
            )}
        </>
    );
};

export default Messages;

import React from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import useUser from 'state/user';
import styled from 'styled-components';

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
  const messageList = [];
    return (
        <>
            <Title>Mensajes</Title>
            {messageList.length === 0 ? <Notice>{user.user?.userType === 'therapist' ? "Cuando te pongas en contacto con algún cliente tus mensajes aparecerán aquí" : "Cuando te pongas en contacto con algún especialista tus mensajes aparecerán aquí"}</Notice> : <div></div>}
        </>
    );
};

export default Messages;

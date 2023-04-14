import Button from 'components/Button';
import React from 'react';
import { useMemo } from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import useMessages from 'state/messages';
import useUser from 'state/user';
import styled from 'styled-components';
import { getDisplayTime } from 'utils/time';

const Container = styled.div`
    padding: 10px;
    border: 1px solid ${PRIMARY_GREEN};
    width: 100%;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    margin: 10px 0;
    .text {
        margin: 0;
        padding: 0;
        text-align: center;
    }

    .options {
        display: flex;
        width: 100%;
        gap: 15px;
        button {
            flex: 1;
        }
    }
`;

const AssignmentMessage = ({ message, nextMessage }) => {
    const [userState] = useUser();
    const [messagesStates] = useMessages();

    const otherUserText =
        userState.user?.userType === 'client' ? 'Terapeuta' : 'Paciente';

    return (
        <Container>
            <p className="text">
                Tu primera sesión ha concluido, ¿Deseas que te asignemos a este{' '}
                {otherUserText} ? (Ambos deberán estar de acuerdo) 
            </p>
            <div className="options">
                <Button type="button" onClick={() => {}} disabled={false}>
                    Rechazar
                </Button>
                <Button type="button" onClick={() => {}} disabled={false}>
                    Aceptar
                </Button>
            </div>
        </Container>
    );
};

export default AssignmentMessage;

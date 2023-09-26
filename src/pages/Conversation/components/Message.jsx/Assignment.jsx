import Button from 'components/Button';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import { UserTypes } from 'resources/constants/config';
import useConversations from 'state/conversations';
import useUser from 'state/user';
import styled from 'styled-components';

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
  text-rendering: optimizeLegibility;
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

const bannerText = (relationshipStatus, invitationState, userType) => {
  if (relationshipStatus === 'dismissed') return userType === UserTypes.CLIENT ? 'La asignación con este terapeuta no funcionó.' : 'La asignación con este paciente no funcionó, pero puedes intentarlo con otro.';
  if (relationshipStatus === 'active') return userType === UserTypes.CLIENT ? 'Ambos aceptaron la invitación, ahora es tu terapeuta asignado.' : 'Ambos aceptaron la invitación, ahora es tu paciente asignado.';

  if(invitationState === null) return userType === UserTypes.CLIENT ? 'Tu primera sesión ha concluido, ¿Deseas que te asignemos a este Terapeuta ? (Ambos deberán estar de acuerdo)' : 'Tu primera sesión ha concluido, ¿Deseas que te asignemos a este Paciente ? (Ambos deberán estar de acuerdo)';
  if(invitationState === true) return userType === UserTypes.CLIENT ? 'Ya respondiste a la asignación, hay que esperar la respuesta del Terapeuta' : 'Ya respondiste a la asignación, hay que esperar la respuesta del Paciente';
};

const buttonsVisible = (relationshipStatus, invitationState) => {
  if(relationshipStatus === 'dismissed' || relationshipStatus === 'active') return false;

  if(invitationState === true) return false;

  return true;
}; 

const AssignmentMessage = ({ message, nextMessage }) => {
  const [userState, userDispatcher] = useUser();
  const [invitationState, setInvitationState] = useState(null);
  const [conversationState] = useConversations();
  const [relationshipStatus, setRelationshipStatus] = useState(null);

  useEffect(() => {
    const invitation = userState.current.extraData.invitations.find(
      ({ invitationUUID }) => invitationUUID === message.uuid
    );
    if (invitation){ 
      setInvitationState(invitation.accepted);
      setRelationshipStatus(invitation.status);
    };
  }, [userState, conversationState, message]);

  const onAccept = (accept) => {
    userDispatcher.acceptInvitationStart({ accept, invitationUUID:  message.uuid});
  }

  return relationshipStatus === null ? null : (
    <Container>
      <p className="text">
        {bannerText(relationshipStatus, invitationState, userState.current?.userType)}
      </p>
      {buttonsVisible(relationshipStatus, invitationState) ? <div className="options">
        <Button type="button" onClick={() => onAccept(false)} disabled={false}>
          Rechazar
        </Button>
        <Button type="button" onClick={() => onAccept(true)} disabled={false}>
          Aceptar
        </Button>
      </div> : null}
    </Container>
  );
};

export default AssignmentMessage;

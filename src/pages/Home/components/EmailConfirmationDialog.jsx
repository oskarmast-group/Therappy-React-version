import ActionsContainer from 'alert/dialog/components/ActionsContainer';
import Base from 'alert/dialog/components/Base';
import Button from 'components/Button';
import Loading from 'components/Loading';
import React from 'react';
import { useState } from 'react';
import { authAPI } from 'resources/api';
import { PRIMARY_GREEN } from 'resources/constants/colors';

const EmailConfirmationDialog = ({ open, onSubmit, onClose }) => {
  const [loading, setLoading] = useState(false);

  const requestEmailConfirmation = async () => {
    setLoading(true);
    await authAPI.requestEmailConfirmation();
    setLoading(false);
    onSubmit();
  }

  return (
    <Base open={open} onClose={onClose} isResponsive={false}>
      <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
        <h3>Verificación de correo pendiente</h3>
        {loading ? (
          <Loading />
        ) : (
          <span>
            Para poder usar la app necesitas verificar tu dirección de correo electrónico. <br />
            <br />
            Revisa tu bandeja de entrada por un correo de Terappy. Si no te llegó te lo podemos volver a enviar.
          </span>
        )}
        <ActionsContainer>
          <Button
            type="text"
            disabled={loading}
            style={{
              backgroundColor: 'white',
              color: PRIMARY_GREEN,
              border: `2px solid ${PRIMARY_GREEN}`,
            }}
            onClick={onClose}
          >
            OK
          </Button>
          <Button type="text" disabled={loading} onClick={requestEmailConfirmation}>
            Enviar Correo
          </Button>
        </ActionsContainer>
      </div>
    </Base>
  );
};

export default EmailConfirmationDialog;

import { Ring } from '@uiball/loaders';
import LinkButton from 'components/LinkButton';
import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { authAPI } from 'resources/api';
import { DARK_TEXT, PRIMARY_GREEN } from 'resources/constants/colors';
import styled from 'styled-components';

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Subtitle = styled.h2`
    padding-bottom: 25px;
    font-size: 21px;
    font-weight: 600;
    color: ${DARK_TEXT};
    text-align: center;
`;

const Confirmation = () => {
    const { token } = useParams();
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if(!token) setText('No se detectó un token valido')
      confirmEmail(token);
    }, [token]);

    const confirmEmail = async (token) => {
      setLoading(true);
      try {
        await authAPI.confirmation({token});
        setText('Correo verificado con exito')
      } catch (e) {
        console.log(e);
        const response = e.response;
        if(response && response.status === 403) {
          setText('Código expirado, solicita la verificación de correo de nuevo.')
        }
        setText('No se pudo verificar el correo, intente de nuevo más tarde.')
      }
      setLoading(false);
    }

    return (
        <MainContainer withBottomNavigation={false} withSideMenu={false}>
          <TopBar title={''} />
          <Container>
            {loading ? <Ring color={PRIMARY_GREEN} size={22} /> : <Subtitle>{text}</Subtitle>}
            <LinkButton to={'/home'} style={{ marginTop: '30px', maxWidth: '200px', alignSelf: 'center', textAlign: 'center' }}>
              Regresar
            </LinkButton>
          </Container>
        </MainContainer>
    )
}

export default Confirmation;
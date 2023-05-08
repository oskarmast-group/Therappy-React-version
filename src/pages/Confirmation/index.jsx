import { Ring } from '@uiball/loaders';
import { Body } from 'components/Text';
import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { authAPI } from 'resources/api';
import { DARK_TEXT, PRIMARY_GREEN } from 'resources/constants/colors';
import styled from 'styled-components';

const Subtitle = styled.h2`
    margin-top: 25px;
    font-size: 21px;
    font-weight: 600;
    color: ${DARK_TEXT};
    text-align: center;
    margin: 0;
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
        setText('No se pudo verificar el correo, intente de nuevo más tarde.')
      }
      setLoading(false);
    }

    return (
        <MainContainer withBottomNavigation={false} withSideMenu={false}>
          <TopBar title={''} />
          {loading ? <Ring color={PRIMARY_GREEN} size={22} /> : <Subtitle>{text}</Subtitle>}
        </MainContainer>
    )
}

export default Confirmation;
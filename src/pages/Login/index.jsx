import Input from 'components/Input';
import MainContainer from 'containers/MainContainer';
import React, { useState } from 'react';
import TherappyLogo from 'resources/img/therappy-logo.svg';
import styled from 'styled-components';
import Person from 'resources/img/person.svg';
import { Body, CustomLink } from 'components/Text';
import Button from 'components/Button';

const Logo = styled.img`
    width: 60%;
    margin-top: 60px;
    align-self: center;
`;

const Catchphrase = styled.p`
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e2205;
`;

const ErrorText = styled.p`
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    color: #D50000;
`;

const Login = () => {
    const [user, setUser] = useState('');
    const [passsword, setPassword] = useState('');
    const [error, setError] = useState('');

    const submit = (e) => {
        e.preventDefault();
        login();
    };

    const login = async () => {
        try {
            const r = await fetch(process.env.PUBLIC_URL + '/data/users.json');
            const users = await r.json();
            const auth = users[user];
            if(!auth) {
                setError('Error');
                return;
            }
            if(auth.password !== passsword) {
                setError('Error');
                return;
            }
            setError('');
            localStorage.setItem('auth', JSON.stringify(auth));
            window.location.href = '/';
        } catch (e) {
            console.error(e);
            setError('Error');
        }
    };

    return (
        <MainContainer withBottomDecoration={true}>
            <Logo src={TherappyLogo} alt={'Logo Therappy'} />
            <Catchphrase>Ayuda psicológica profesional por videollamada</Catchphrase>
            <Title>Iniciar Sesión</Title>
            <form onSubmit={submit}>
                <Input
                    icon={Person}
                    inputProps={{
                        required: true,
                        type: 'email',
                        value: user,
                        onChange: (e) => setUser(e.target.value),
                        placeholder: 'Usuario',
                    }}
                />
                <Input
                    style={{ marginTop: '20px' }}
                    icon={Person}
                    inputProps={{
                        required: true,
                        type: 'password',
                        value: passsword,
                        onChange: (e) => setPassword(e.target.value),
                        placeholder: 'Contraseña',
                    }}
                />
                <Body style={{ textAlign: 'center', marginTop: '20px' }}>
                    ¿Olvidaste tu contraseña?
                    <b>
                        <CustomLink to="/recovery">Recupérala</CustomLink>
                    </b>
                </Body>
                {error && <ErrorText>"Error al iniciar sesión, verifique sus datos"</ErrorText>}
                <Button style={{ marginTop: '20px' }}>Continuar</Button>
            </form>
        </MainContainer>
    );
};

export default Login;

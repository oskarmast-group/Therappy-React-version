import Input from 'components/Input';
import MainContainer from 'containers/MainContainer';
import React, { useState } from 'react';
import TherappyLogo from 'resources/img/therappy-logo.svg';
import styled from 'styled-components';
import Person from 'resources/img/icons/person.svg';
import { Body, CustomLink } from 'components/Text';
import Button from 'components/Button';
import { authAPI } from 'resources/api';
import Scrollable from 'containers/Scrollable';
import { unsubscribeNotifications } from 'utils/notifications';

const Logo = styled.img`
    width: 60%;
    margin-top: 60px;
    @media screen and (max-height: 670px) {
        margin-top: 20px;
    }
`;

const Catchphrase = styled.p`
    text-align: center;
    font-size: 1rem;
    font-weight: 700;

    @media screen and (max-height: 670px) {
        font-size: 0.875rem;
    }
`;

const Title = styled.h1`
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e2205;

    @media screen and (max-height: 670px) {
        font-size: 1.3rem;
        margin: 5px 0;
    }
`;

const ErrorText = styled.p`
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    color: #d50000;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    @media screen and (max-height: 670px) {
        gap: 10px;
    }
`;

const ForgotPassword = styled(Body)`
    text-align: center;
`;

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submit = (e) => {
        e.preventDefault();
        login();
    };

    const login = async () => {
        try {
            const res = await authAPI.login({ email: user, password });
            localStorage.setItem('auth', JSON.stringify(res));

            const previousUser = localStorage.getItem('userIdentity');
            if(previousUser !== res.identity && process.env.NODE_ENV !== 'development') {
                await unsubscribeNotifications();
            }
            localStorage.setItem('userIdentity', res.identity);

            window.location.href = '/';
        } catch (e) {
            console.error(e);
            setError('Error');
        }
    };

    return (
        <MainContainer withBottomDecoration={true} withBottomNavigation={false} withSideMenu={false} >
            <Scrollable>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Logo src={TherappyLogo} alt={'Logo Therappy'} />
                </div>
                <Catchphrase>
                    Ayuda psicológica profesional por videollamada
                </Catchphrase>
                <Title>Iniciar Sesión</Title>
                <Form onSubmit={submit}>
                    <Input
                        iconProps={{ icon: Person }}
                        inputProps={{
                            required: true,
                            type: 'email',
                            value: user,
                            onChange: (e) => setUser(e.target.value),
                            placeholder: 'Usuario',
                        }}
                    />
                    <Input
                        iconProps={{ icon: Person }}
                        inputProps={{
                            required: true,
                            type: 'password',
                            value: password,
                            onChange: (e) => setPassword(e.target.value),
                            placeholder: 'Contraseña',
                        }}
                    />
                    <ForgotPassword>
                        ¿Olvidaste tu contraseña?{' '}
                        <b>
                            <CustomLink to="/recovery">Recupérala</CustomLink>
                        </b>
                    </ForgotPassword>
                    {error && (
                        <ErrorText>
                            "Error al iniciar sesión, verifique sus datos"
                        </ErrorText>
                    )}
                    <Button>Continuar</Button>
                    <ForgotPassword
                        style={{
                            fontSize: '16px',
                            marginTop: '10px',
                            marginBottom: '40px',
                        }}
                    >
                        ¿Aún no tienes cuenta?{' '}
                        <b>
                            <CustomLink to="/registro">Regístrate</CustomLink>
                        </b>
                    </ForgotPassword>
                    <b style={{ textAlign: 'center' }}>
                        <CustomLink
                            to="/registro-terapeutas"
                            style={{ fontSize: '20px' }}
                        >
                            Registro psicoterapeutas
                        </CustomLink>
                    </b>
                </Form>
            </Scrollable>
        </MainContainer>
    );
};

export default Login;

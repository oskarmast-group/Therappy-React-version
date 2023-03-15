import Input from 'components/Input';
import MainContainer from 'containers/MainContainer';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Body, CustomLink, Title } from 'components/Text';
import Button from 'components/Button';
import { authAPI } from 'resources/api';
import Scrollable from 'containers/Scrollable';
import TopBar from 'components/TopBar';
import { isValidNumber } from 'utils/phone';
import { DARK_TEXT } from 'resources/constants/colors';

const ErrorText = styled.p`
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    color: #d50000;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 5px;
    @media screen and (max-height: 670px) {
        gap: 10px;
    }
`;

const Register = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [user, setUser] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const confirmPasswordRef = useRef();

    const submit = (e) => {
        e.preventDefault();
        register();
    };

    const register = async () => {
        try {
            const res = await authAPI.register({
                email: user,
                password,
                name,
                lastName,
                phone,
                userType: 'user',
                countryOrigin: 'MX',
            });
            localStorage.setItem('auth', JSON.stringify(res));
            window.location.href = '/';
        } catch (e) {
            console.error(e);
            setError('Error');
        }
    };

    return (
        <MainContainer withBottomDecoration={true} withBottomNavigation={false}>
            <TopBar />
            <Scrollable>
                <Title style={{ textAlign: 'center', color: DARK_TEXT }}>
                    Regístrate
                </Title>
                <Form onSubmit={submit} autoComplete={'new-password'}>
                    <Input
                        labelProps={{ label: 'Nombre(s)' }}
                        inputProps={{
                            required: true,
                            type: 'text',
                            value: name,
                            onChange: (e) => setName(e.target.value),
                        }}
                    />
                    <Input
                        labelProps={{ label: 'Apellido(s)' }}
                        inputProps={{
                            required: true,
                            type: 'text',
                            value: lastName,
                            onChange: (e) => setLastName(e.target.value),
                        }}
                    />
                    <Input
                        labelProps={{ label: 'Correo electrónico' }}
                        inputProps={{
                            required: true,
                            type: 'email',
                            value: user,
                            autoComplete: 'off',
                            onChange: (e) => setUser(e.target.value),
                        }}
                    />
                    <Input
                        labelProps={{ label: 'Teléfono' }}
                        inputProps={{
                            required: true,
                            type: 'text',
                            value: phone,
                            onChange: (e) => setPhone(e.target.value),
                        }}
                    />
                    {!!phone && !isValidNumber('52', phone) && (
                        <ErrorText>Teléfono invalido</ErrorText>
                    )}
                    <Input
                        labelProps={{ label: 'Contraseña' }}
                        inputProps={{
                            required: true,
                            type: 'password',
                            value: password,
                            autoComplete: 'new-password',
                            onChange: (e) => setPassword(e.target.value),
                        }}
                    />
                    <Input
                        labelProps={{ label: 'Confirmar contraseña' }}
                        inputProps={{
                            ref: confirmPasswordRef,
                            required: true,
                            type: 'password',
                            value: confirmPassword,
                            autoComplete: 'new-password',
                            onChange: (e) => setConfirmPassword(e.target.value),
                        }}
                    />
                    {error && (
                        <ErrorText>
                            "Error al crear cuenta, verifique sus datos"
                        </ErrorText>
                    )}
                    <Button style={{ marginTop: '30px', maxWidth: '200px' }}>
                        Registrarse
                    </Button>
                </Form>
                <b style={{ textAlign: 'center' }}>
                    <CustomLink
                        to="/registro-psicoterapeuta"
                        style={{ fontSize: '20px' }}
                    >
                        Soy psicoterapeuta
                    </CustomLink>
                </b>
            </Scrollable>
        </MainContainer>
    );
};

export default Register;

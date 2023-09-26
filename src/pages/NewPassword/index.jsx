import Button from "components/Button";
import Input from "components/Input";
import Person from "resources/img/icons/person.svg";
import TopBar from "components/TopBar";
import MainContainer from "containers/MainContainer";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useParams, useHistory } from "react-router";
import { authAPI } from "resources/api";
import styled from "styled-components";
import { Body } from "components/Text";
import { Ring } from "@uiball/loaders";
import { Redirect } from "react-router-dom";

const Form = styled.form`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    button {
        margin-top: 20px;
        margin-bottom: 20px;
    }
`;

const ErrorText = styled.p`
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    color: #d50000;
`;

const jwtPattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

const NewPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const validatePasswords = () => {
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (password !== confirmPassword) {
            confirmPasswordRef.current.setCustomValidity("Las contraseñas no coinciden.");
        } else {
            confirmPasswordRef.current.setCustomValidity("");
        }
    };

    useEffect(() => {
        const currentConfirmPasswordRef = confirmPasswordRef.current;

        currentConfirmPasswordRef.addEventListener("input", validatePasswords);

        // Cleanup
        return () => {
            currentConfirmPasswordRef.removeEventListener("input", validatePasswords);
        };
    }, []);

    if (!token || !jwtPattern.test(token)) {
        return <Redirect to="/home" />;
    }

    const submit = (e) => {
        e.preventDefault();
        requestRecovery();
    };

    const requestRecovery = async () => {
        setLoading(true);
        try {
            const res = await authAPI.passwordRecovery({
                token,
                password,
            });
            localStorage.setItem("auth", JSON.stringify(res));
            window.location.href = "/";
        } catch (e) {
            console.error(e);
            setError(e?.response?.data?.message ?? "Error desconocido, intente de nuevo más tarde");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainContainer withBottomNavigation={false} withSideMenu={false}>
            <TopBar title={"Cambiar contraseña"} />

            <Form onSubmit={submit}>
                <Body>Ingresa una nueva contraseña</Body>
                <Input
                    labelProps={{ label: "Contraseña" }}
                    inputProps={{
                        ref: passwordRef,
                        required: true,
                        type: "password",
                        value: password,
                        autoComplete: "new-password",
                        onChange: (e) => setPassword(e.target.value),
                        disabled: loading,
                    }}
                />
                <Input
                    labelProps={{ label: "Confirmar contraseña" }}
                    inputProps={{
                        required: true,
                        ref: confirmPasswordRef,
                        type: "password",
                        value: confirmPassword,
                        autoComplete: "new-password",
                        onChange: (e) => setConfirmPassword(e.target.value),
                        disabled: loading,
                    }}
                />
                {error && <ErrorText>{error}</ErrorText>}
                <Button disabled={loading}>
                    {loading ? <Ring color={"white"} size={22} /> : "Cambiar contraseña"}
                </Button>
            </Form>
        </MainContainer>
    );
};

export default NewPassword;

import Button from "components/Button";
import Input from "components/Input";
import Person from "resources/img/icons/person.svg";
import TopBar from "components/TopBar";
import MainContainer from "containers/MainContainer";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { authAPI } from "resources/api";
import styled from "styled-components";
import { Body, Title } from "components/Text";
import { Ring } from "@uiball/loaders";

const Form = styled.form`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    button {
        margin-bottom: 20px;
    }
`;

const PasswordRecovery = () => {
    const [user, setUser] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        requestRecovery();
    };

    const requestRecovery = async () => {
        setLoading(true);
        await authAPI.requestPasswordRecovery({ email: user });
        setText("Correo enviado, siga las instrucciones para continuar con el proceso.");
        setLoading(false);
    };

    return (
        <MainContainer withBottomNavigation={false} withSideMenu={false}>
            <TopBar title={"Recuperar contraseña"} />

            <Form onSubmit={submit}>
                {text ? (
                    <Body>{text}</Body>
                ) : (
                    <>
                        <Body>
                            Escriba el correo con el que se registró y enviaremos información para
                            recuperar su contraseña
                        </Body>
                        <Input
                            iconProps={{ icon: Person }}
                            inputProps={{
                                required: true,
                                type: "email",
                                value: user,
                                onChange: (e) => setUser(e.target.value),
                                placeholder: "Correo",
                                disabled: loading,
                            }}
                        />
                        <Button disabled={loading}>
                            {loading ? <Ring color={"white"} size={22} /> : "Enviar"}
                        </Button>
                    </>
                )}
            </Form>
        </MainContainer>
    );
};

export default PasswordRecovery;

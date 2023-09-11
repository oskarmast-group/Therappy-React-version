import Loading from "components/Loading";
import Scrollable from "containers/Scrollable";
import React from "react";
import { DARKER_TEXT, DARK_TEXT } from "resources/constants/colors";
import useUser from "state/user";
import styled from "styled-components";
import Therapist from "./Therapist";
import Client from "./Client";
import { UserTypes } from "resources/constants/config";

const Salute = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: ${DARKER_TEXT};
  margin: 0;
  span {
    font-weight: 700;
  }
`;

const Subtitle = styled.h2`
  font-size: 21px;
  font-weight: 600;
  color: ${DARK_TEXT};
  margin: 0;
`;

const Summary = () => {
  const [user] = useUser();

  return (
    <Scrollable>
      <header style={{ marginBottom: "15px", minHeight: 0 }}>
        <Salute>
          Hola, <span>{user?.current?.name ?? ""}</span>
        </Salute>
        <Subtitle>¿Cómo te encuentras hoy?</Subtitle>
      </header>

      {user?.current && !user.fetching.fetch.state ? (
        <>
          {user.current.userType === UserTypes.THERAPIST && <Therapist />}
          {user.current.userType === UserTypes.CLIENT && <Client />}
        </>
      ) : (
        <Loading />
      )}
    </Scrollable>
  );
};

export default Summary;

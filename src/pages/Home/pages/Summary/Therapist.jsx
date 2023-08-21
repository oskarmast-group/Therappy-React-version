import React from "react";
import AppointmentsListSection from "./components/AppointmentsListSection";
import PacientListSection from "./components/PacientListSection";
import NewsSection from "./components/NewsSection";
import styled from "styled-components";
import useUser from "state/user";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
`;

const Therapist = () => {
  const [user] = useUser();

  return (
    <Container>
      {user.current.extraData?.status === "active" && (
        <>
          <AppointmentsListSection />
          <PacientListSection />
          <NewsSection />
        </>
      )}
    </Container>
  );
};

export default Therapist;

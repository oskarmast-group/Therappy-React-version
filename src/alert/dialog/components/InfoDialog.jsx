import React from "react";
import Base from "./Base";
import Header from "./Header";
import ActionsContainer from "./ActionsContainer";
import Button from "components/Button";
import { Body } from "components/Text";

const Actions = ({ onClose, buttonText }) => {
  return (
    <ActionsContainer>
      <Button type='text' onClick={onClose}>{buttonText}</Button>
    </ActionsContainer>
  );
};

const InfoDialog = ({ open, onClose, config }) => {

  return (
    <Base
      open={open}
      onClose={onClose}
      isResponsive={false}
      showCloseButton={config.showCloseButton ?? true}
    >
      {config.header && <Header>{config.header}</Header>}
      {config.title && <h3>{config.title}</h3>}
      <Body>{config.body}</Body>
      <Actions onClose={onClose} buttonText={config.buttonText} />
    </Base>
  );
};

export default InfoDialog;

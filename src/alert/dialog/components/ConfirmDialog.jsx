import React from 'react';
import Base from './Base';
import Header from './Header';
import ActionsContainer from './ActionsContainer';
import Button from 'components/Button';
import { Body } from 'components/Text';
import { PRIMARY_GREEN } from 'resources/constants/colors';

const Actions = ({
    onSubmit,
    onClose,
    confirmButtonText,
    cancelButtonText,
}) => {
    return (
        <ActionsContainer>
            <Button
                type="text"
                style={{
                    backgroundColor: 'white',
                    color: PRIMARY_GREEN,
                    border: `2px solid ${PRIMARY_GREEN}`,
                }}
                onClick={onClose}
            >
                {cancelButtonText}
            </Button>
            <Button type="text" onClick={onSubmit}>
                {confirmButtonText}
            </Button>
        </ActionsContainer>
    );
};

const ConfirmDialog = ({ open, onSubmit, onClose, config }) => {
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
            <Actions
                onSubmit={onSubmit}
                onClose={onClose}
                confirmButtonText={config.confirmButtonText}
                cancelButtonText={config.cancelButtonText}
            />
        </Base>
    );
};

export default ConfirmDialog;

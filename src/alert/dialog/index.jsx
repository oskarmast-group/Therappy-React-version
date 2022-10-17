import React from 'react';
import InfoDialog from './components/InfoDialog.jsx';
// import ConfirmDialog from './components/ConfirmDialog.jsx';
import ALERT_TYPES from 'alert/types.js';

const Dialog = ({ open, onSubmit, onClose, type, config }) => {
    switch (type) {
        case ALERT_TYPES.INFO:
            return <InfoDialog open={open} onSubmit={onSubmit} onClose={onClose} config={config} />;
        // case ALERT_TYPES.CONFIRM:
        //     return <ConfirmDialog open={open} onSubmit={onSubmit} onClose={onClose} config={config} />;
        case ALERT_TYPES.CUSTOM:
            const CustomBody = config.body;
            const props = config.props ?? {};
            return <CustomBody open={open} onSubmit={onSubmit} onClose={onClose} {...props} />;
        default:
            return null;
    }
};

export default Dialog;

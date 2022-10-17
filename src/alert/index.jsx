import React from 'react';
import Dialog from './dialog';

const AlertServiceContext = React.createContext(Promise.reject);

const AlertServiceProvider = ({ children }) => {

  const [alertState, setAlertState] = React.useState(null);
  const promise = React.useRef();

  const setStateOpen = (options) => {
    setAlertState(options);
    return new Promise((resolve, reject) => {
      promise.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    if (promise.current) {
      promise.current.reject();
    }

    setAlertState(null);
  };

  const handleSubmit = (value) => {
    if (promise.current) {
      promise.current.resolve(value);
    }

    setAlertState(null);
  };

  return (
    <>
      <AlertServiceContext.Provider
        value={{alert: setStateOpen, closeAlert: handleClose, submitAlert: handleSubmit}}
        children={children}
      />

      <Dialog
        open={!!alertState}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...alertState}
      />
    </>
  );
};

const useAlert = () => React.useContext(AlertServiceContext).alert;

const useAlertHelpers = () => {
  const { closeAlert, submitAlert } = React.useContext(AlertServiceContext);
  return [submitAlert, closeAlert];
};

export default AlertServiceProvider;
export { 
  AlertServiceProvider,
  useAlert,
  useAlertHelpers,
}
import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
//import { ALERT_TYPES, useAlert } from '@etiquette-ui/alert-dialog';

const CONFIG = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const DEFAULT_STATES = {};

const ErrorManagement = ({ states = DEFAULT_STATES }) => {
  //const alert = useAlert();
  //const { translate } = useI18n();

  useEffect(() => {
    for (const key of Object.keys(states)) {
      if (!states[key].state.message) continue;

      const error = states[key].state;
      const resetError = states[key].resetError;
      
      if (typeof error.message === 'string') {
        toast.error(error.message, { toastId: `${key}:${error.timestamp}`, onClose: resetError, ...CONFIG });
        continue;
      }
      if (error.message.status === 500) {
        toast.error('Error interno del servidor', { toastId: `${key}:${error.timestamp}`, onClose: resetError, ...CONFIG });
        continue;
      }
      if (error.message.status === 401) {
        localStorage.removeItem('auth');
        window.location.reload();
        break;
      }
      toast.error(`${error.message.message}`, {
        toastId: `${key}:${error.timestamp}`,
        onClose: resetError,
        ...CONFIG,
      });
    }
  }, [states]);


  return (
    <ToastContainer
      position="bottom-left"
      autoClose={7000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default ErrorManagement;

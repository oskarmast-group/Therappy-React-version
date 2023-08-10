import Loading from 'components/Loading';
import TopBar from 'components/TopBar';
import Scrollable from 'containers/Scrollable';
import React, { useEffect } from 'react';
import useUser from 'state/user';
import styled from 'styled-components';
import PaymentMethod from './components/PaymentMethod';
import { Body } from 'components/Text';
import AddPaymentMethodDialog from 'components/AddPaymentMethodDialog';
import Button from 'components/Button';
import ALERT_TYPES from 'alert/types';
import { useAlert } from 'alert';

const MethodsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 10px;
  padding: 0;
  flex: 1;
  min-height: 0;
  margin-bottom: 0;
`;

const Clients = () => {
  const [user, userDispatcher] = useUser();
  const alert = useAlert();

  useEffect(() => {
    userDispatcher.fetchPaymentMethodsStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addPaymentMethod = () => {
    if (!user.current.id) return;

    alert({
      type: ALERT_TYPES.CUSTOM,
      config: {
        body: AddPaymentMethodDialog,
        props: {
          userId: user.current.id,
        },
      },
    })
      .then(() => {
        userDispatcher.fetchPaymentMethodsStart();
        //uploadImage(croppedImage);
      })
      .catch(() => {});
  };

  return (
    <>
      <TopBar title={'Métodos de pago'} />
      <Scrollable style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignContent: 'center' }}>
        {user.fetching.paymentMethods.state === true || user.fetching.fetch.state === true ? (
          <Loading />
        ) : (
          <>
            <MethodsContainer>
              {user.paymentMethods.length > 0 ? (
                user.paymentMethods.map((method) => <PaymentMethod method={method} />)
              ) : (
                <Body style={{ textAlign: 'center' }}>No tienes métodos de pago registrados aún</Body>
              )}
            </MethodsContainer>
            <Button type="button" onClick={addPaymentMethod} style={{ marginTop: '30px', maxWidth: '200px', alignSelf: 'center' }}>
              Agregar Método
            </Button>
          </>
        )}
      </Scrollable>
    </>
  );
};

export default Clients;
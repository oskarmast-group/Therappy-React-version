import { useAlert } from 'alert';
import ALERT_TYPES from 'alert/types';
import InfoButton from 'components/InfoButton';
import { SectionTitle } from 'components/Text';
import React, { useEffect } from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import useUser from 'state/user';
import styled from 'styled-components';
import AddPaymentMethodDialog from 'components/AddPaymentMethodDialog';
import SelectPaymentMethod from './SelectPaymentMethod';

const AddMethods = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    color: ${PRIMARY_GREEN};
    font-weight: 600;
    font-size: 18px;
    margin: 10px 0;
`;

const PaymentMethods = ({ selectedMethod, setSelectedMethod, pricing }) => {
    const [user, userDispatcher] = useUser();
    const alert = useAlert();

    useEffect(() => {
        userDispatcher.fetchStart();
        userDispatcher.fetchPaymentMethodsStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedMethod === 'new method') addPaymentMethod();
    }, [selectedMethod]);

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

    return pricing?.total === 0 ? (
        <InfoButton
            body={'¿Sesión gratuita?'}
            onClick={() => {
                alert({
                    type: ALERT_TYPES.INFO,
                    config: {
                        title: 'Sesión de cortesía',
                        body: (
                            <span>
                                La primera sesión con un terapeuta será una
                                entrevista para determinar si es un buen
                                emparejamiento. <br />
                                <br />
                                Por este motivo no se te cobrarán sesiones hasta
                                que se te asigne oficialmente un terapeuta.
                            </span>
                        ),
                        buttonText: 'OK',
                    },
                })
                    .then(() => {})
                    .catch(() => {});
            }}
        />
    ) : (
        <>
            <SectionTitle>Método de pago</SectionTitle>
            {user.paymentMethods.length > 0 ? (
                <SelectPaymentMethod
                    paymentMethods={user.paymentMethods}
                    selectedMethod={selectedMethod}
                    onChangeMethod={(method) => setSelectedMethod(method)}
                />
            ) : (
                <AddMethods type="button" onClick={addPaymentMethod}>
                    Añadir método
                </AddMethods>
            )}
        </>
    );
};

export default PaymentMethods;

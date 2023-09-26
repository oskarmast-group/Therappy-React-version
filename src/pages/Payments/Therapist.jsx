import Loading from 'components/Loading';
import TopBar from 'components/TopBar';
import Scrollable from 'containers/Scrollable';
import React, { useEffect, useState } from 'react';
import useUser from 'state/user';
import styled from 'styled-components';
import PaymentMethod from './components/PaymentMethod';
import { Body, SectionTitle, Title } from 'components/Text';
import AddPaymentMethodDialog from 'components/AddPaymentMethodDialog';
import Button, { IconButton } from 'components/Button';
import ALERT_TYPES from 'alert/types';
import { useAlert } from 'alert';
import { stripeTherapistAPI } from 'resources/api';
import { formatMoney, tranlateDay } from 'utils/text';
import { DARKER_TEXT } from 'resources/constants/colors';
import InfoSVG from 'resources/img/icons/info-icon.svg';

const ErrorText = styled.p`
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    color: #d50000;
`;

const TotalAmount = styled(Body)`
    font-size: 54px;
    font-weight: 600;
`;

const AmountDetailsContainer = styled.div`
    margin-top: 10px;
    display: flex;
    gap: 10px;
`;

const AmountDetail = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;

    h4 {
        color: ${DARKER_TEXT};
        margin: 5px 0;
    }

    p {
        padding: 0;
        font-size: 25px;
    }
`;

const PayoutFrequencyContainer = styled.div`
    margin-top: 15px;
    padding: 10px;
    border: solid 2px ${DARKER_TEXT};
    border-radius: 10px;
    display: flex;
    flex-direction: column;

    h4 {
        color: ${DARKER_TEXT};
        margin: 5px 0;
    }

    p {
        padding: 0;
    }
`;

const CustomIconButton = styled(IconButton)`
    padding: 5px;
    height: fit-content;
    margin: 0;
    img {
        height: 14px;
    }
`;

const getAvailableAmount = (balance) => {
    if (!balance.available) return 0;

    const amountMxn = balance.available.find((b) => b.currency === 'mxn');

    if (!amountMxn) return 0;
    return amountMxn.amount / 100;
};

const getPendingAmount = (balance) => {
    if (!balance.pending) return 0;

    const amountMxn = balance.pending.find((b) => b.currency === 'mxn');

    if (!amountMxn) return 0;
    return amountMxn.amount / 100;
};

const getTotalAmount = (balance) => {
    const available = getAvailableAmount(balance);
    const pending = getPendingAmount(balance);

    return formatMoney(available + pending);
};

const getPayoutFrecuencyString = (schedule) => {
    switch (schedule.interval) {
        case 'daily':
            return 'Recibes depositos disponibles diario.';
        case 'weekly':
            return `Recibes depositos disponibles el ${tranlateDay[schedule.weekly_anchor]} de cada semana.`;
        case 'monthly':
            return `Recibes depositos disponibles el ${schedule.monthly_anchor} de cada mes.`;
        default:
            return '';
    }
};

const Therapists = () => {
    const [user, userDispatcher] = useUser();
    const [requestingLink, setRequestingLink] = useState(false);
    const [error, setError] = useState('');
    const alert = useAlert();

    useEffect(() => {
        userDispatcher.fetchAccountInformationStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const requestAccountLink = async () => {
        setRequestingLink(true);
        try {
            const accountLink = await stripeTherapistAPI.accountLink();

            window.location.href = accountLink.url;
        } catch (e) {
            console.error(e);
            setError('Stripe no disponible.');
        }

        setRequestingLink(false);
    };

    return (
        <>
            <TopBar title={'Pagos'} />
            <Scrollable style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignContent: 'center' }}>
                {user.fetching.accountInformation.state === true || user.fetching.fetch.state === true ? (
                    <Loading />
                ) : user.accountInformation.details_submitted ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <SectionTitle>Balance Total</SectionTitle>
                        <TotalAmount>{getTotalAmount(user.accountInformation.balance)}</TotalAmount>
                        <AmountDetailsContainer>
                            <AmountDetail>
                                <h4>Disponible</h4>
                                <Body>{formatMoney(getAvailableAmount(user.accountInformation.balance))}</Body>
                            </AmountDetail>
                            <AmountDetail>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <h4>Pendiente</h4>
                                    <CustomIconButton
                                        onClick={() => {
                                            alert({
                                                type: ALERT_TYPES.INFO,
                                                config: {
                                                    title: 'Saldo pendiente',
                                                    body: (
                                                        <span>
                                                            Por seguridad el dinero que ingresa a Stripe deberá
                                                            permanacer ahí por{' '}
                                                            {
                                                                user.accountInformation.settings.payouts.schedule
                                                                    .delay_days
                                                            }{' '}
                                                            días. <br />
                                                            <br />
                                                            Al terminar este periodo el saldo pasará a estar disponible
                                                            para la siguiente transferencia automática.
                                                        </span>
                                                    ),
                                                    buttonText: 'OK',
                                                },
                                            })
                                                .then(() => {})
                                                .catch(() => {});
                                        }}
                                    >
                                        <img src={InfoSVG} alt={'Info Balance Pendiente'} />
                                    </CustomIconButton>
                                </div>
                                <Body>{formatMoney(getPendingAmount(user.accountInformation.balance))}</Body>
                            </AmountDetail>
                        </AmountDetailsContainer>
                        {user.accountInformation.settings.payouts.schedule.interval !== 'manual' && (
                            <PayoutFrequencyContainer>
                                <h4>Transferencia automática</h4>
                                <Body>
                                    {getPayoutFrecuencyString(user.accountInformation.settings.payouts.schedule)}
                                </Body>
                            </PayoutFrequencyContainer>
                        )}
                    </div>
                ) : (
                    <>
                        <Body style={{ textAlign: 'center' }}>
                            Tienes que completar tu registro en la página de Stripe para comenzar a recibir pagos.
                        </Body>
                        <Button
                            type="button"
                            onClick={requestAccountLink}
                            disabled={requestingLink}
                            style={{ marginTop: '30px', maxWidth: '200px', alignSelf: 'center' }}
                        >
                            Ir a Stripe
                        </Button>
                        {error && <ErrorText>{error}</ErrorText>}
                    </>
                )}
            </Scrollable>
        </>
    );
};

export default Therapists;

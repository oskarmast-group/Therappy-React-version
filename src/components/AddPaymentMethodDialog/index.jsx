import React, { useEffect } from 'react';
import Base from 'alert/dialog/components/Base';
import useUser from 'state/user';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CardForm from './CardForm';
import { STRIPE_PUBLIC_KEY } from 'resources/constants/config';
import Loading from 'components/Loading';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const AddPaymentMethodDialog = ({ open, onSubmit, onClose }) => {
    const [user, userDispatcher] = useUser();

    useEffect(() => {
        userDispatcher.setupIntentStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onConfirm = () => {
        onSubmit();
    };

    return (
        <Base open={open} onClose={onClose} isResponsive={false}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {user.fetching.setup.state ? (
                    <Loading />
                ) : (
                    user.setupIntentToken && (
                        <Elements stripe={stripePromise}>
                            <CardForm user={user.user} secret={user.setupIntentToken.secret} confirmPayment={onConfirm} />
                        </Elements>
                    )
                )}
            </div>
        </Base>
    );
};

export default AddPaymentMethodDialog;

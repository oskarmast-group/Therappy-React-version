import React from 'react';
import useAppointments from 'state/appointments';
import Lottie from 'lottie-react';
import LoadingAnimation from 'resources/animations/loading.json';
import ConfirmedAnimation from 'resources/animations/checkmark.json';
import { useState } from 'react';

const LoadingPayment = () => {
    const [appointments] = useAppointments();
    const [loading, setLoading] = useState(true);

    const checkLoading = () => {
        if (appointments.confirmed) setLoading(false);
    };

    return (
        <>
            <Lottie
                animationData={loading ? LoadingAnimation : ConfirmedAnimation}
                loop={loading}
                onLoopComplete={checkLoading}
                style={{ height: '60px' }}
            />
        </>
    );
};

export default LoadingPayment;

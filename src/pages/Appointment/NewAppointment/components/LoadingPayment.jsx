import React, { useEffect } from 'react';
import useAppointments from 'state/appointments';
import Lottie from 'lottie-react';
import LoadingAnimation from 'resources/animations/loading.json';
import ConfirmedAnimation from 'resources/animations/checkmark.json';
import { useState } from 'react';
import { subscribeNotificationsIfNotAlready } from 'utils/notifications';

const LoadingPayment = () => {
    const [appointments] = useAppointments();
    const [loading, setLoading] = useState(true);

    const checkLoading = () => {
        if (appointments.confirmed) setLoading(false);
    };

    useEffect(()=>{
        if(loading) return;
        subscribeNotificationsIfNotAlready();
    },[loading]);

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

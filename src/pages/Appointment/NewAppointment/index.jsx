import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { DARKER_TEXT } from 'resources/constants/colors';
import { IMAGES_URL } from 'resources/constants/urls';
import useTherapist from 'state/therapists';
import styled from 'styled-components';
import NoProfileSVG from 'resources/img/no-pic-therapist.png';
import { dateFormat } from 'utils/date';
import Button from 'components/Button';
import { useState } from 'react';
import useAppointments from 'state/appointments';
import AppointmentTime from '../../../components/AppointmentTime';
import AppointmentCost from './components/AppointmentCost';
import PaymentMethods from './components/PaymentMethods';
import LoadingPayment from './components/LoadingPayment';
import useUser from 'state/user';

const TherapistContainer = styled.header`
    display: flex;
    gap: 10px;
    .image-container {
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 12px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .information {
        flex: 1;
        min-height: 50px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        .texts {
            color: ${DARKER_TEXT};
            h4 {
                font-size: 16px;
                margin: 0;
                user-select: none;
            }
        }
    }
`;

const NewAppointment = () => {
    const location = useLocation();
    const history = useHistory();
    const [therapists, therapistsDispatcher] = useTherapist();
    const [appointments, appointmentsDispatcher] = useAppointments();
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [user] = useUser();

    useEffect(() => {
        const { date, time, therapistId } = location.state ?? {};
        if (!date || !time || !therapistId) {
            history.push('/');
            return;
        }
        therapistsDispatcher.fetchProfileStart(therapistId);
        const dateTime = new Date(time);

        appointmentsDispatcher.reserveStart({
            therapistId,
            dateISO: dateTime.toISOString(),
        });
    }, [location]);

    useEffect(() => {
        console.log(
            'message',
            appointments.error.message,
            appointments.error.message !== ''
        );
        if (appointments.error.message !== '') {
            history.push('/');
            return;
        }
    }, [appointments.error]);

    const onSubmit = () => {
        if (
            appointments.fetching.state ||
            !appointments.reservation?.appointment?.id
        )
            return;

        const total = appointments.reservation?.pricing?.total;
        if (
            (!selectedMethod || selectedMethod === 'new method') &&
            typeof total === 'number' &&
            total > 0
        )
            return;
        appointmentsDispatcher.confirmStart({
            appointmentId: appointments.reservation?.appointment?.id,
            paymentMethodId: selectedMethod,
        });
    };

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar
                backRoute={
                    appointments.confirmed ? () => history.push('/') : null
                }
            />
            <TherapistContainer>
                <div className="image-container">
                    <img
                        src={
                            therapists.current.profileImg
                                ? `${IMAGES_URL}${therapists.current.profileImg}`
                                : NoProfileSVG
                        }
                        alt={`perfil de ${therapists.current.name} ${therapists.current.lastName}`}
                    />
                </div>
                <div className="information">
                    <div className="texts">
                        <h4>{`${therapists.current.title ?? ''} ${therapists.current.name} ${therapists.current.lastName}`}</h4>
                    </div>
                </div>
            </TherapistContainer>
            <AppointmentTime
                loading={
                    appointments.fetching.state &&
                    appointments.fetching.config.key !== 'confirm'
                }
                date={appointments.reservation?.appointment?.date}
            />
            <AppointmentCost
                loading={
                    appointments.fetching.state &&
                    appointments.fetching.config.key !== 'confirm'
                }
                pricing={appointments.reservation?.pricing}
            />
            {appointments.fetching.config.key === 'confirm' ||
            appointments.confirmed ? (
                <LoadingPayment />
            ) : (
                <PaymentMethods
                    selectedMethod={selectedMethod}
                    setSelectedMethod={setSelectedMethod}
                    pricing={appointments.reservation?.pricing}
                />
            )}
            {appointments.confirmed ? (
                <Button
                    type="button"
                    onClick={() =>
                        (window.location.href = `/appointment/${appointments.reservation?.appointment?.roomId}`)
                    }
                    style={{ marginTop: '20px' }}
                    disabled={!appointments.confirmed}
                >
                    Ver cita
                </Button>
            ) : (
                <Button
                    type="button"
                    onClick={onSubmit}
                    style={{ marginTop: '20px' }}
                    disabled={appointments.fetching.config.key === 'confirm' || user.fetching.paymentMethods.state}
                >
                    {appointments.reservation?.pricing?.total === 0
                        ? 'Confirmar'
                        : 'Pagar'}
                </Button>
            )}
        </MainContainer>
    );
};

export default NewAppointment;

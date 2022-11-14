import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { DARKER_TEXT, PRIMARY_GREEN } from 'resources/constants/colors';
import { IMAGES_URL } from 'resources/constants/urls';
import useTherapist from 'state/therapists';
import styled from 'styled-components';
import NoProfileSVG from 'resources/img/no-pic-therapist.png';
import { dateFormat } from 'utils/date';
import { Body, SectionTitle } from 'components/Text';
import { capitalize, formatMoney } from 'utils/text';
import { dateObjectFromTimeString, getDisplayTime, timeFormat, TIME_FORMAT_COMPLETE } from 'utils/time';
import { addMinutes } from 'date-fns';
import Button from 'components/Button';
import useUser from 'state/user';
import { useAlert } from 'alert';
import AddPaymentMethodDialog from './AddPaymentMethodDialog';
import ALERT_TYPES from 'alert/types';
import { useState } from 'react';
import SelectPaymentMethod from './SelectPaymentMethod';
import useAppointments from 'state/appointments';
import { Ring } from '@uiball/loaders';

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

const AddMethods = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    color: ${PRIMARY_GREEN};
    font-weight: 600;
    font-size: 18px;
    margin: 10px 0;
`;

const NewAppointment = () => {
    const location = useLocation();
    const history = useHistory();
    const [therapists, therapistsDispatcher] = useTherapist();
    const [user, userDispatcher] = useUser();
    const [appointments, appointmentsDispatcher] = useAppointments();
    const alert = useAlert();
    const [selectedMethod, setSelectedMethod] = useState(null);

    useEffect(() => {
        userDispatcher.fetchStart();
        userDispatcher.fetchPaymentMethodsStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const { date, time, therapistId } = location.state ?? {};
        if (!date || !time || !therapistId) {
            history.push('/');
            return;
        }
        therapistsDispatcher.fetchProfileStart(therapistId);
        appointmentsDispatcher.reserveStart({ therapistId, date: dateFormat(date), time: timeFormat(dateObjectFromTimeString(time), TIME_FORMAT_COMPLETE) });
    }, [location]);

    const addPaymentMethod = () => {
        if (!user.user.id) return;

        alert({
            type: ALERT_TYPES.CUSTOM,
            config: {
                body: AddPaymentMethodDialog,
                props: {
                    userId: user.user.id,
                },
            },
        })
            .then(() => {
                userDispatcher.fetchPaymentMethodsStart();
                //uploadImage(croppedImage);
            })
            .catch(() => {});
    };

    useEffect(() => {
        if (selectedMethod === 'new method') addPaymentMethod();
    }, [selectedMethod]);

    const onSubmit = () => {
        if(appointments.fetching.state || !appointments.reservation?.appointment?.id) return;
        if(!selectedMethod || selectedMethod === 'new method') return;
        appointmentsDispatcher.confirmStart({ appointmentId: appointments.reservation?.appointment?.id, paymentMethodId: selectedMethod })
    }

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar />
            <TherapistContainer>
                <div className="image-container">
                    <img
                        src={therapists.current.profileImg ? `${IMAGES_URL}${therapists.current.profileImg}` : NoProfileSVG}
                        alt={`perfil de ${therapists.current.name} ${therapists.current.lastName}`}
                    />
                </div>
                <div className="information">
                    <div className="texts">
                        <h4>{`${therapists.current.title} ${therapists.current.name} ${therapists.current.lastName}`}</h4>
                    </div>
                </div>
            </TherapistContainer>
            {<SectionTitle>Horario de la cita</SectionTitle>}
            {appointments.fetching.state && <Ring color={PRIMARY_GREEN} size={22} />}
            {!appointments.fetching.state && appointments.reservation?.appointment?.date && (
                <Body>{capitalize(dateFormat(appointments.reservation.appointment.date, 'EEEE - LLLL d, uuuu'))}</Body>
            )}
            {!appointments.fetching.state && appointments.reservation?.appointment?.time && (
                <Body>
                    {getDisplayTime(dateObjectFromTimeString(appointments.reservation.appointment.time))} -{' '}
                    {getDisplayTime(addMinutes(dateObjectFromTimeString(appointments.reservation.appointment.time), 50))}
                </Body>
            )}
            {appointments.fetching.state && <Ring color={PRIMARY_GREEN} size={22} />}
            <SectionTitle>Costo</SectionTitle>
            {!appointments.fetching.state &&
                appointments.reservation?.pricing?.parts &&
                Array.isArray(appointments.reservation.pricing.parts) &&
                appointments.reservation.pricing.parts.map((part, i) => <Body key={i}>{part.name}: {formatMoney(part.amount)}</Body>)}
            {!appointments.fetching.state &&
                appointments.reservation?.pricing?.total && <Body style={{ fontWeight: '700' }}>Total: {formatMoney(appointments.reservation.pricing.total)}</Body>}
            <SectionTitle>Método de pago</SectionTitle>
            {user.paymentMethods ? (
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
            <Button type='button' onClick={onSubmit} style={{ marginTop: '20px' }}>Pagar</Button>
        </MainContainer>
    );
};

export default NewAppointment;

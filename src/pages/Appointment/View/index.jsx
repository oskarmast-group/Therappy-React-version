import TopBar from "components/TopBar";
import MainContainer from "containers/MainContainer";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import useAppointments from "state/appointments";
import NoProfileSVG from "resources/img/no-profile.svg";
import MessageSVG from "resources/img/icons/message-icon-alt.svg";
import VideocallSVG from "resources/img/icons/videocall-icon-alt.svg";
import Loading from "components/Loading";
import { IMAGES_URL } from "resources/constants/urls";
import styled from "styled-components";
import { GREEN, RED } from "resources/constants/colors";
import Button from "components/Button";
import AppointmentTime from "components/AppointmentTime";
import LinkButton from "components/LinkButton";
import {
    AppointmentStatusValues,
    MAX_APPOINTMENT_CANCELLATION_TIME,
    UserTypes,
} from "resources/constants/config";
import { useRouter } from "providers/router";
import { add, isAfter, isBefore, sub } from "date-fns";
import useUser from "state/user";
import { subscribeNotificationsIfNotAlready } from "utils/notifications";
import ALERT_TYPES from "alert/types";
import { useAlert } from "alert";

const ProfileContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    .profile-container {
        width: 130px;
        height: 130px;
        border-radius: 65px;
        overflow: hidden;
        border: 2px solid ${GREEN};
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`;

const ActionsRow = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    a {
        border-radius: 10px;
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: center;
        gap: 10px;
        img {
            width: 25px;
        }
    }
`;

const ViewAppointment = () => {
    const [user, userDispatcher] = useUser();
    const [appointments, appointmentsDispatcher] = useAppointments();
    const { roomId } = useParams();
    const { goBack: previousRoute } = useRouter();
    const alert = useAlert();

    const goBack = useMemo(()=>previousRoute('/home'), [previousRoute]);

    useEffect(() => {
        appointmentsDispatcher.fetchOneStart(roomId);
        userDispatcher.fetchStart();

        return () => {
            appointmentsDispatcher.clearCurrent();
        }
    }, []);

    const appointment = useMemo(() => appointments.appointment, [appointments]);

    if (
        appointment?.status === AppointmentStatusValues.CANCELLED ||
        appointment?.status === AppointmentStatusValues.REJECTED
    ) {
        if(goBack) {
            console.log(goBack);
            goBack();
        }
    }

    const onCancel = () => {
        let body = null;
        if ( isBefore( new Date(), sub(new Date(appointment.date), { hours: MAX_APPOINTMENT_CANCELLATION_TIME }) )) {
            if(user.current.userType === UserTypes.CLIENT) {
                body = 'Puedes cancelar la cita, y se reembolsará el costo completo en un periodo no mayor a 14 días hábiles.';
            }
        } else {
            if(user.current.userType === UserTypes.THERAPIST) {
                body = 'Puedes cancelar la cita, pero de preferencia cancelar al menos 24 horas antes.';
            }
            if(user.current.userType === UserTypes.CLIENT) {
                body = 'Puedes cancelar la cita, pero no se le efectuará ningún reembolso, las cancelaciones tiene que ocurrir más de 24 horas antes para ser candidato a reembolso.';
            }
        }

        alert({
            type: ALERT_TYPES.CONFIRM,
            config: {
                title: '¿Cancelar cita?',
                body: <span>Esta acción no se puede revertir<br/><br/>{body ?? ''}</span>,
                cancelButtonText: 'Mantener',
                confirmButtonText: 'Cancelar',
            },
        })
            .then(() => {
                appointmentsDispatcher.cancelStart({ roomId });
            })
            .catch(() => {});

    };

    const callButtonEnabled = useMemo(() => {
        if (!appointment) return false;
        if (!appointment.status) return false;

        const validTime = isAfter(new Date(), sub(new Date(appointment.date), { minutes: 10 })) && isBefore(new Date(), sub(new Date(appointment.date), { minutes: 10 }));
        const validStatus =
            appointment.status !== AppointmentStatusValues.CANCELLED &&
            appointment.status !== AppointmentStatusValues.REJECTED;
        return appointment.roomId && validTime && validStatus;
    }, [appointment]);

    const cancelButtonVisible = useMemo(() => {
        if (!appointment) return false;
        if (!appointment.status) return false;

        const validTime = isBefore(new Date(), add(new Date(appointment.date), { minutes: 10 }));
        if(!validTime) return false;

        if (user.current.userType === UserTypes.THERAPIST) {
            return appointment.status === AppointmentStatusValues.ACCEPTED;
        }

        if (user.current.userType === UserTypes.CLIENT) {
            return (
                appointment.status === AppointmentStatusValues.CONFIRMED ||
                appointment.status === AppointmentStatusValues.ACCEPTED
            );
        }
        return false;
    }, [appointment, user]);

    const therapistButtonsVisble = useMemo(() => {
        if (!appointment) return false;
        if (!appointment.status) return false;

        const validStatus = appointment.status === AppointmentStatusValues.CONFIRMED;
        const isTherapist = user.current.userType === UserTypes.THERAPIST;

        return validStatus && isTherapist;
    }, [appointment, user]);

    return (
        <MainContainer withSideMenu={false} withBottomNavigation={false}>
            <TopBar title={"Cita"} />
            {!!appointments.fetching.state ? (
                <Loading />
            ) : (
                <>
                    <ProfileContainer>
                        <div className="profile-container">
                            <img
                                src={
                                    appointment?.profileImg
                                        ? `${IMAGES_URL}${appointment?.profileImg}`
                                        : NoProfileSVG
                                }
                                alt={"Imagen de perfil"}
                            />
                        </div>
                    </ProfileContainer>
                    {appointment?.name && appointment?.lastName && (
                        <h2 style={{ textAlign: "center" }}>
                            {`${appointment?.name} ${appointment?.lastName}`}
                        </h2>
                    )}
                    <ActionsRow>
                        <LinkButton
                            to={`/conversacion/${appointment?.conversationId}`}
                            className={appointment?.conversationId ? "" : "disabled"}
                        >
                            <img src={MessageSVG} alt={"Mensaje"} /> Chat
                        </LinkButton>
                        <LinkButton
                            to={`/videollamada/${appointment?.roomId}`}
                            className={callButtonEnabled ? "" : "disabled"}
                        >
                            <img src={VideocallSVG} alt={"Videollamada"} /> Llamada
                        </LinkButton>
                    </ActionsRow>
                    <AppointmentTime
                        loading={appointments.fetching.state}
                        date={appointment?.date}
                    />
                    {cancelButtonVisible && (
                        <Button
                            type="button"
                            onClick={onCancel}
                            style={{ marginTop: "40px" }}
                            disabled={!!appointments.fetching.state}
                        >
                            Cancelar
                        </Button>
                    )}
                    {therapistButtonsVisble && (
                        <Button
                            type="button"
                            onClick={()=>{
                                appointmentsDispatcher.acceptStart({ appointmentId: appointment.id, roomId: appointment.roomId });
                                subscribeNotificationsIfNotAlready();
                            }}
                            style={{ marginTop: "40px" }}
                            disabled={!!appointments.fetching.state}
                        >
                            Aceptar
                        </Button>
                    )}
                    {therapistButtonsVisble && (
                        <Button
                            type="button"
                            onClick={()=>{
                                appointmentsDispatcher.rejectStart({ appointmentId: appointment.id, roomId: appointment.roomId });
                                subscribeNotificationsIfNotAlready();
                            }}
                            style={{ marginTop: "20px", backgroundColor: RED }}
                            disabled={!!appointments.fetching.state}
                        >
                            Rechazar
                        </Button>
                    )}
                </>
            )}
        </MainContainer>
    );
};

export default ViewAppointment;

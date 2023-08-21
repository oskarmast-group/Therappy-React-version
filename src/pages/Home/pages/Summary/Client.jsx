import React, { useEffect } from "react";
import useAppointments from "state/appointments";
import useUser from "state/user";
import NextAppointmentSection from "./components/NextAppointmentSection";
import { Intructions } from "./components/styles";
import Therapist from "components/Therapist";
import { ClientTherapistStatus } from "resources/constants/config";
import InfoButton from "components/InfoButton";
import ALERT_TYPES from "alert/types";
import TherapistSelectionSection from "./components/TherapistSelectionSection";
import { useAlert } from "alert";

const Client = () => {
  const [appointments, appointmentsDispatcher] = useAppointments();
  const [user] = useUser();
  const alert = useAlert();

  useEffect(() => {
    appointmentsDispatcher.fetchUpcomingStart();
  }, []);

  return (
    <>
      {!!user.current.extraData?.therapist && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            minHeight: 0,
          }}
        >
          <NextAppointmentSection />
          <Intructions>Terapeuta:</Intructions>
          <Therapist
            {...user.current.extraData.therapist}
            clickable={
              appointments.upcomingList.filter(
                ({ status }) => status !== "rejected"
              ).length === 0
            }
          />
          {user.current.extraData.therapist.status ===
            ClientTherapistStatus.PENDING && (
            <InfoButton
              body={"¿Por qué no puedo agendar más sesiones?"}
              onClick={() => {
                alert({
                  type: ALERT_TYPES.INFO,
                  config: {
                    title: "Asignación pendiente",
                    body: (
                      <span>
                        Después de la sesión exploratoria con el terapeuta
                        podrán decidir continuar con futuras sesiones. <br />
                        <br />
                        Si deciden no continuar tendrás la oportunidad de
                        agendar otra sesión exploratoria gratuita con otro
                        terapeuta
                      </span>
                    ),
                    buttonText: "OK",
                  },
                })
                  .then(() => {})
                  .catch(() => {});
              }}
            />
          )}
        </div>
      )}
      <TherapistSelectionSection />
    </>
  );
};

export default Client;

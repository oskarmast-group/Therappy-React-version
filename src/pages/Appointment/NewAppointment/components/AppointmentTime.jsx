import { Ring } from '@uiball/loaders';
import { Body, SectionTitle } from 'components/Text';
import { addMinutes } from 'date-fns';
import React from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import { dateFormat } from 'utils/date';
import { capitalize } from 'utils/text';
import { dateObjectFromTimeString, getDisplayTime } from 'utils/time';

const AppointmentTime = ({ loading, appointment }) => {
    return (
        <>
            {<SectionTitle>Horario de la cita</SectionTitle>}
            {loading && <Ring color={PRIMARY_GREEN} size={22} />}
            {!loading && appointment?.date && (
                <Body>
                    {capitalize(
                        dateFormat(appointment.date, 'EEEE - LLLL d, uuuu')
                    )}
                </Body>
            )}
            {!loading && appointment?.time && (
                <Body>
                    {getDisplayTime(dateObjectFromTimeString(appointment.time))}{' '}
                    -{' '}
                    {getDisplayTime(
                        addMinutes(
                            dateObjectFromTimeString(appointment.time),
                            50
                        )
                    )}
                </Body>
            )}
        </>
    );
};

export default AppointmentTime;

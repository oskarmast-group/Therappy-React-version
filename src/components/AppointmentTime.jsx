import { Ring } from '@uiball/loaders';
import { Body, SectionTitle } from 'components/Text';
import { addMinutes } from 'date-fns';
import React from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import { dateFormat } from 'utils/date';
import { capitalize } from 'utils/text';
import { getDisplayTime } from 'utils/time';

const AppointmentTime = ({ loading, date }) => {
    return (
        <>
            {<SectionTitle>Horario de la cita</SectionTitle>}
            {loading && <Ring color={PRIMARY_GREEN} size={22} />}
            {!loading && date && (
                <Body>
                    {capitalize(
                        dateFormat(date, 'EEEE - LLLL d, uuuu')
                    )}
                </Body>
            )}
            {!loading && date && (
                <Body>
                    {getDisplayTime(date)} -{' '}
                    {getDisplayTime(
                        addMinutes(new Date(date), 50)
                    )}
                </Body>
            )}
        </>
    );
};

export default AppointmentTime;

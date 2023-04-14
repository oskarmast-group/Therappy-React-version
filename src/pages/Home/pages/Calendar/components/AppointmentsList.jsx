import { SectionTitle } from 'components/Text';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { dateFormat, getDisplayDate } from 'utils/date';
import AppointmentCard from './AppointmentCard';

const ListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 10px;
    padding: 0;
    flex: 1;
    min-height: 0;
    overflow: scroll;
    padding-bottom: 25px;
    margin-bottom: 0;

    li {
        gap: 10px;
        display: flex;
        flex-direction: column;
    }
`;

const AppointmentsList = ({ list }) => {
    const [dates, setDates] = useState({});

    useEffect(() => {
        const newDates = {};
        for (const app of list) {
            const { date } = app;
            const dateStr = dateFormat(date);
            if (newDates[dateStr] === undefined) {
                newDates[dateStr] = [app];
            } else {
                newDates[dateStr] = [...newDates[dateStr], app];
            }
        }
        setDates(newDates);
    }, [list]);

    return (
        <ListContainer>
            {Object.keys(dates).map((key) => (
                <li key={key}>
                    <SectionTitle>
                        {key === dateFormat(new Date())
                            ? 'Hoy'
                            : getDisplayDate(
                                  new Date(`${key}T12:00:00`),
                                  'EEEE'
                              )}{' '}
                        -{' '}
                        {getDisplayDate(
                            new Date(`${key}T12:00:00`),
                            'MMMM d, yyyy'
                        )}
                    </SectionTitle>
                    {dates[key].map((app) => (
                        <AppointmentCard app={app} />
                    ))}
                </li>
            ))}
        </ListContainer>
    );
};

export default AppointmentsList;

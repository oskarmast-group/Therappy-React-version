import React from 'react';
import styled from 'styled-components';
import AppointmentCard from './AppointmentCard';

const ListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 10px;
    padding: 0;
    margin: 0;
    flex: 1;
    height: 100%;
    overflow: scroll;
    li {
        gap: 10px;
        display: flex;
        flex-direction: column;
    }
`;

const AppointmentsList = ({ list }) => {
    return (
        <ListContainer>
            {list.map((app) => (
                <li key={app.id}>
                    <AppointmentCard app={app} />
                </li>
            ))}
        </ListContainer>
    );
};

export default AppointmentsList;

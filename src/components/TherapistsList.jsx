import React from 'react';
import styled from 'styled-components';
import Therapist from './Therapist';


const TherapistsContainer = styled.ul`
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
    
`;

const TherapistsList = ({ therapists }) => {
    return (
        <TherapistsContainer>
            {therapists.map((ther) => (
                <Therapist key={ther.id} {...ther} />
            ))}
        </TherapistsContainer>
    );
};

export default TherapistsList;

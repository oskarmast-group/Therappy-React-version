import TopBar from 'components/TopBar';
import MainContainer from 'containers/MainContainer';
import React from 'react';

const Therapists = () => {
    return (
            <MainContainer withSideMenu={false} >
                <TopBar title={'Terapeutas'} />
            </MainContainer>
    );
};

export default Therapists;

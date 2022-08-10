import React from 'react';
import styled from 'styled-components';
import TopShape from 'resources/img/top-wave.svg';
import BottomShape from 'resources/img/bottom-wave.svg';

const Main = styled.main`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const TopDecoration = styled.div`
    height: 38px;
    width: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const BottomDecoration = styled.div`
    height: 68px;
    width: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const MainContainer = ({ children, withTopDecoration = true, withBottomDecoration = false }) => {
    return (
        <>
            {withTopDecoration && (
                <TopDecoration>
                    <img src={TopShape} alt={"curva de decoración superior"}/>
                </TopDecoration>
            )}
            <Main>{children}</Main>
            {withBottomDecoration && (
                <BottomDecoration>
                    <img src={BottomShape} alt={"curva de decoración inferior"}/>
                </BottomDecoration>
            )}
        </>
    );
};

export default MainContainer;
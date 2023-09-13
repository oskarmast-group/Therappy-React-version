import React from 'react';
import styled from 'styled-components';
import TopShape from 'resources/img/top-wave.svg';
import BottomShape from 'resources/img/bottom-wave.svg';
import SideMenu from 'components/SideMenu';

const Main = styled.main`
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 58px;
    flex-grow: 1;

    &.fullscreen {
        margin-bottom: 0;
    }

    @media screen and (max-height: 670px) {
        padding: 10px;
        padding-top: 0;
    }
`;

const TopDecoration = styled.div`
    max-height: 38px;
    width: 100%;
    flex: 0 1 38px;
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

const MainContainer = ({ children, withBottomNavigation=true, withTopDecoration = true, withBottomDecoration = false, withSideMenu = true, menuOpen = false, toggleMenu }) => {
    return (
        <>
            {withTopDecoration && (
                <TopDecoration>
                    <img src={TopShape} alt={"curva de decoración superior"}/>
                </TopDecoration>
            )}
            <Main className={withBottomNavigation ? '' : 'fullscreen'}>{children}</Main>
            {withBottomDecoration && (
                <BottomDecoration>
                    <img src={BottomShape} alt={"curva de decoración inferior"}/>
                </BottomDecoration>
            )}
            {withSideMenu && <SideMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />}
        </>
    );
};

export default MainContainer;
import { useRouter } from 'providers/router';
import React from 'react';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import GoBackSVG from 'resources/img/go-back.svg';
import styled from 'styled-components';

const TopBarComponent = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-height: 670px) {
        height: 36px;
    }
`;

const MenuButton = styled.button`
    background: none;
    outline: none;
    border: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    img {
        cursor: pointer;
        width: 25px;
    }
    
`;

const Title = styled.h1`
    margin: 0;
    font-size: 26px;
    font-weight: 600;
    color: ${PRIMARY_GREEN};
`;

const TopBar = ({ className = '', title = '', backRoute = null }) => {
    const { goBack } = useRouter();

    return (
        <TopBarComponent className={className}>
            <MenuButton type='button' onClick={backRoute ? backRoute : goBack('/home')}>
                <img src={GoBackSVG} alt='regresar' />
            </MenuButton>
            <Title>{title}</Title>
            <div style={{ width: '25px' }}></div>
        </TopBarComponent>
    );
};

export default TopBar;

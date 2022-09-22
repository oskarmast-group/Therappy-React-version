import { useRouter } from 'providers/router';
import React from 'react';
import { Link } from 'react-router-dom';
import { PRIMARY_GREEN } from 'resources/constants/colors';
import GoBackSVG from 'resources/img/go-back.svg';
import styled from 'styled-components';

const TopBarComponent = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    align-items: center;
`;

const MenuButton = styled.img`
    cursor: pointer;
`;

const Title = styled.h1`
    margin: 0;
    font-size: 30px;
    font-weight: 600;
    color: ${PRIMARY_GREEN};
`;

const TopBar = ({ title = '' }) => {
    const { goBack } = useRouter();

    return (
        <TopBarComponent>
            <Link to={goBack('/home')}>
                <MenuButton src={GoBackSVG} style={{ marginTop: '10px' }} />
            </Link>
            <Title>{title}</Title>
            <div></div>
        </TopBarComponent>
    );
};

export default TopBar;

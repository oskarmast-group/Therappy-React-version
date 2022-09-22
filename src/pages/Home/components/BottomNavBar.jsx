import React from 'react';
import HomeSVG from 'resources/img/home.svg';
import MessagesSVG from 'resources/img/messages.svg';
import CalendarSVG from 'resources/img/calendar.svg';
import VideocallsSVG from 'resources/img/videocalls.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BottomNavBarContainer = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    padding: 0 20px;
`;

const BottomNavBarComponent = styled.div`
    display: flex;
    background-color: white;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 34px;
    justify-content: space-between;
    padding: 10px 50px;
    flex-grow: 1;
    max-width: calc(414px - 20px);
`;

const ItemContainer = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        height: 30px;
    }
    div {
        width: 30px;
        height: 3px;
        margin-top: 5px;
        background-color: transparent;
        &.active {
            background-color: #c3f284;
        }
    }
`;

const Item = ({ icon, path, current }) => {
    const active = isCurrent(path, current, 2);
    return (
        <ItemContainer to={path}>
            <img src={icon} />
            <div className={active ? 'active' : ''} />
        </ItemContainer>
    );
};

const isCurrent = (path, current, index) => {
    const pathList = path.split('/');
    const currentList = current.split('/');
    return pathList[pathList.length - 1] === currentList[index];
};

const BottomNavBar = ({ location }) => {
    return (
        <BottomNavBarContainer>
            <BottomNavBarComponent>
                <Item icon={HomeSVG} path={'/home/resumen'} current={location.pathname} />
                <Item icon={MessagesSVG} path={'/home/mensajes'} current={location.pathname} />
                <Item icon={CalendarSVG} path={'/home/calendario'} current={location.pathname} />
            </BottomNavBarComponent>
        </BottomNavBarContainer>
    );
};

export default BottomNavBar;

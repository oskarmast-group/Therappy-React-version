import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DARK_TEXT, PRIMARY_GREEN } from 'resources/constants/colors';
import CloseSVG from 'resources/img/icons/close-white.svg';
import CardSVG from 'resources/img/icons/card.svg';
import ArrowSVG from 'resources/img/icons/chevron-right.svg';
import PersonSVG from 'resources/img/icons/person.svg';
import LogOutSVG from 'resources/img/icons/logout.svg';
import VideoSVG from 'resources/img/icons/video.svg';
import { Link } from 'react-router-dom';
import useUser from 'state/user';
import CalendarSVG from 'resources/img/icons/calendar.svg';
import BellSVG from 'resources/img/icons/bell.svg';
import { canActivateNotifications, subscribeNotificationsIfNotAlready } from 'utils/notifications';
import { Ring } from '@uiball/loaders';
import { UserTypes } from 'resources/constants/config';
import { IconButton } from '@mui/material';

const SideMenuContainer = styled.aside`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 75vw;
    max-width: 300px;
    transition-duration: 0.5s;
    left: calc(0px - min(75vw, 300px));
    background-color: #fbfbfd;
    &.open {
        left: 0;
        box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.5);
    }
`;

const TopTitle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px 20px 10px 20px;
    background-color: ${PRIMARY_GREEN};
    gap: 50px;
`;

const SidebarHeader = styled.h2`
    font-size: 30px;
    color: #fbfbfd;
    margin: 0;
`;

const CloseButton = styled(IconButton)`
    align-self: flex-end;
    background-color: none;

    img {
        width: 25px;
    }
`;

const Navigation = styled.nav`
    padding: 10px 20px;

    ul {
        display: flex;
        flex-direction: column;
        list-style: none;
        gap: 10px;
        padding: 0;
        li {
            button {
                border: none;
                outline: none;
                background-color: transparent;
                width: 100%;
                cursor: pointer;
            }
            a,
            button {
                text-decoration: none;
                margin: 0;
                display: flex;
                gap: 10px;
                align-items: center;
                padding: 10px 0;
                img {
                    height: 25px;
                    &.arrow {
                        height: 18px;
                    }
                }
                p {
                    color: ${DARK_TEXT};
                    margin: 0;
                    flex: 1;
                    font-size: 16px;
                    font-weight: 600;
                    text-align: left;
                }
            }
        }
    }
`;

const SideMenu = ({ menuOpen, toggleMenu }) => {
    const [user] = useUser();
    const [showNotificationSub, setShowNotificationSub] = useState(false);
    const [notificationLoading, setNotificationLoading] = useState(false);

    const checkStatus = async () => {
        const canShow = await canActivateNotifications();
        setShowNotificationSub(canShow);
    };

    useEffect(() => {
        checkStatus();
    }, []);

    const onSubscribeNotification = async () => {
        setNotificationLoading(true);
        await subscribeNotificationsIfNotAlready();
        await checkStatus();
        setNotificationLoading(false);
    }

    return (
        <SideMenuContainer className={menuOpen ? 'open' : ''}>
            <TopTitle>
                <CloseButton onClick={toggleMenu} style={{ marginTop: '10px' }}>
                    <img src={CloseSVG} alt='cerrar menu lateral'/>
                </CloseButton>
                <SidebarHeader>Ajustes</SidebarHeader>
            </TopTitle>
            <Navigation>
                <ul>
                    <li>
                        <Link to="/perfil">
                            <img src={PersonSVG} alt={'Persona'} />
                            <p>Perfil</p>
                            <img className='arrow' src={ArrowSVG} alt={'Flecha derecha'} />
                        </Link>
                    </li>
                    {user.current?.userType === UserTypes.THERAPIST && (
                        <li>
                            <Link to="/horario">
                                <img src={CalendarSVG} alt={'Calendario'} />
                                <p>Horario disponible</p>
                                <img className='arrow' src={ArrowSVG} alt={'Flecha derecha'} />
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="/videollamada">
                            <img src={VideoSVG} alt={'Video'} />
                            <p>Probar audio/video</p>
                            <img className='arrow' src={ArrowSVG} alt={'Flecha derecha'} />
                        </Link>
                    </li>
                    <li>
                        <Link to="/pagos">
                            <img src={CardSVG} alt={'Tarjeta'} />
                            
                            <p>Pagos</p>
                            <img className='arrow' src={ArrowSVG} alt={'Flecha derecha'} />
                        </Link>
                    </li>
                    {showNotificationSub &&
                        (notificationLoading ? (
                            <Ring color={PRIMARY_GREEN} size={22} />
                        ) : (
                            <li>
                                <button type="button" onClick={onSubscribeNotification}>
                                    <img src={BellSVG} alt={'Campana'} />
                                    <p>Activar Notificaciones</p>
                                    <img className='arrow' src={ArrowSVG} alt={'Flecha derecha'} />
                                </button>
                            </li>
                        ))}
                    <li>
                        <Link to="/logout">
                            <img src={LogOutSVG} alt={'Cerrar sesión'} />
                            <p>Cerrar Sesión</p>
                            <img className='arrow' src={ArrowSVG} alt={'Flecha derecha'} />
                        </Link>
                    </li>
                </ul>
            </Navigation>
        </SideMenuContainer>
    );
};

export default SideMenu;

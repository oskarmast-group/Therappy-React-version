import React from 'react';
import styled from 'styled-components';
import { DARK_TEXT, PRIMARY_GREEN } from 'resources/constants/colors';
import CloseSVG from 'resources/img/close.svg';
import CardSVG from 'resources/img/card.svg';
import ArrowSVG from 'resources/img/arrow-right-black.svg';
import PersonSVG from 'resources/img/person.svg';
import LogOutSVG from 'resources/img/log-out.svg';
import VideoSVG from 'resources/img/video.svg';
import { Link } from 'react-router-dom';
import useUser from 'state/user';
import CalendarSVG from 'resources/img/icons/calendar-icon.svg';

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

const CloseButton = styled.img`
    cursor: pointer;
    align-self: flex-end;
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
            a {
                text-decoration: none;
                margin: 0;
                display: flex;
                gap: 10px;
                align-items: center;
                padding: 10px 0;
                img {
                    height: 100%;
                }
                p {
                    color: ${DARK_TEXT};
                    margin: 0;
                    flex: 1;
                    font-size: 16px;
                    font-weight: 600;
                }
            }
        }
    }
`;

const SideMenu = ({ menuOpen, toggleMenu }) => {
    const [user] = useUser();
    return (
        <SideMenuContainer className={menuOpen ? 'open' : ''}>
            <TopTitle>
                <CloseButton src={CloseSVG} onClick={toggleMenu} style={{ marginTop: '10px' }} />
                <SidebarHeader>Ajustes</SidebarHeader>
            </TopTitle>
            <Navigation>
                <ul>
                    <li>
                        <Link to="/perfil">
                            <img src={PersonSVG} alt={'Persona'} />
                            <p>Perfil</p>
                            <img src={ArrowSVG} alt={'Flecha derecha'} />
                        </Link>
                    </li>
                    {user.user?.userType === 'therapist' && (
                        <li>
                            <Link to="/horario">
                                <img src={CalendarSVG} alt={'Calendario'} />
                                <p>Horario disponible</p>
                                <img src={ArrowSVG} alt={'Flecha derecha'} />
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="/videollamada">
                            <img src={VideoSVG} alt={'Video'} />
                            <p>Probar audio/video</p>
                            <img src={ArrowSVG} alt={'Flecha derecha'} />
                        </Link>
                    </li>
                    <li>
                        <Link to="/pagos">
                            <img src={CardSVG} alt={'Tarjeta'} />
                            <p>Pagos</p>
                            <img src={ArrowSVG} alt={'Flecha derecha'} />
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout">
                            <img src={LogOutSVG} alt={'Cerrar sesión'} />
                            <p>Cerrar Sesión</p>
                            <img src={ArrowSVG} alt={'Flecha derecha'} />
                        </Link>
                    </li>
                </ul>
            </Navigation>
        </SideMenuContainer>
    );
};

export default SideMenu;

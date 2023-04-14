import React, { useState } from 'react';
import MainContainer from 'containers/MainContainer';
import { useRouteMatch } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import Summary from './pages/Summary';
import Messages from './pages/Messages';
import Calendar from './pages/Calendar';
import Videocalls from './pages/Videocalls';
import BottomNavBar from './components/BottomNavBar';
import TopBar from './components/TopBar';
import useUser from 'state/user';
import { useEffect } from 'react';
import InfoButton from 'components/InfoButton';
import ALERT_TYPES from 'alert/types';
import { useAlert } from 'alert';

const Home = ({ location }) => {
    const { path, url } = useRouteMatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, userDispatcher] = useUser();
    const alert = useAlert();

    useEffect(() => {
        userDispatcher.fetchStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <MainContainer menuOpen={menuOpen} toggleMenu={toggleMenu}>
                <TopBar toggleMenu={toggleMenu} />
                {user.user && !user.user.emailVerified && (
                    <InfoButton
                        style={{ backgroundColor: 'red', fontWeight: '700' }}
                        body={'Verificación de correo pendiente'}
                        onClick={() => {
                            alert({
                                type: ALERT_TYPES.CONFIRM,
                                config: {
                                    title: 'Verificación de correo pendiente',
                                    body: (
                                        <span>
                                            Para poder usar la app necesitas verificar tu dirección de correo electrónico.{' '}
                                            <br />
                                            <br />
                                            Revisa tu bandeja de entrada por un correo de Terappy. Si no te llegó te lo podemos volver a enviar.
                                        </span>
                                    ),
                                    confirmButtonText: 'Enviar Correo',
                                    cancelButtonText: 'OK',
                                },
                            })
                                .then(() => {})
                                .catch(() => {});
                        }}
                    />
                )}
                <Switch>
                    <Route exact path={path}>
                        <Redirect to={`${url}/resumen`} />
                    </Route>
                    <Route path={`${path}/resumen`} component={Summary} />
                    <Route path={`${path}/mensajes`} component={Messages} />
                    <Route path={`${path}/calendario`} component={Calendar} />
                    <Route path={`${path}/llamada`} component={Videocalls} />
                </Switch>
                <BottomNavBar location={location} />
            </MainContainer>
        </>
    );
};

export default Home;

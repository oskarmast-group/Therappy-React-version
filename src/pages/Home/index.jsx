import React, { useState } from 'react';
import MainContainer from 'containers/MainContainer';
import { useRouteMatch } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import Summary from './pages/Summary';
import Messages from './pages/Messages';
import Calendar from './pages/Calendar';
import BottomNavBar from './components/BottomNavBar';
import TopBar from './components/TopBar';
import useUser from 'state/user';
import { useEffect } from 'react';
import InfoButton from 'components/InfoButton';
import ALERT_TYPES from 'alert/types';
import { useAlert } from 'alert';
import EmailConfirmationDialog from './components/EmailConfirmationDialog';
import { useSocket } from 'Socket';
import useConversations from 'state/conversations';

const Home = ({ location }) => {
    const { path, url } = useRouteMatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, userDispatcher] = useUser();
    const [, conversationsDispatcher] = useConversations();
    const alert = useAlert();
    const socket = useSocket();

    useEffect(() => {
        conversationsDispatcher.fetchStart();
    }, [conversationsDispatcher]);

    useEffect(()=>{
        if(!socket) return;
        socket.on('new message', (payload)=>{ 
            console.log(payload);
            conversationsDispatcher.addLastMessage(payload);
         });

         return () => {
            socket.off('new message')
         }
    },[socket, conversationsDispatcher]);

    useEffect(() => {
        userDispatcher.fetchStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const showEmailConfirmationAlert = () => {
        alert({
            type: ALERT_TYPES.CUSTOM,
            config: {
                body: EmailConfirmationDialog,
                props: {
                    userId: user.current.id,
                },
            },
        })
            .then(() => {})
            .catch(() => {});
    }
 
    return (
        <>
            <MainContainer menuOpen={menuOpen} toggleMenu={toggleMenu}>
                <TopBar toggleMenu={toggleMenu} />
                {user.current && !user.current.emailVerified && (
                    <InfoButton
                        style={{ backgroundColor: 'red', fontWeight: '700' }}
                        body={'Verificación de correo pendiente'}
                        onClick={showEmailConfirmationAlert}
                    />
                )}
                <Switch>
                    <Route exact path={path}>
                        <Redirect to={`${url}/resumen`} />
                    </Route>
                    <Route path={`${path}/resumen`} component={Summary} />
                    <Route path={`${path}/mensajes`} component={Messages} />
                    <Route path={`${path}/calendario`} component={Calendar} />
                </Switch>
                <BottomNavBar location={location} />
            </MainContainer>
        </>
    );
};

export default Home;

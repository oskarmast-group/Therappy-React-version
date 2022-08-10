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

const Home = ({ location }) => {
    const { path, url } = useRouteMatch();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <MainContainer>
                <TopBar />
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

import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import Call from './pages/Call';
import TestVideo from './pages/TestVideo';

const Videocall = () => {
    const { path } = useRouteMatch();
    console.log(path)
    return (
        <Switch>
            <Route exact path={path}>
                <Redirect to={`${path}/probar`} />
            </Route>
            <Route path={`${path}/probar`} component={TestVideo} />
            <Route path={`${path}/:roomId`} component={Call} />
        </Switch>
    );
};

export default Videocall;

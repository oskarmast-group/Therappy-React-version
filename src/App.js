import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'containers/PrivateRoute';
import Home from './pages/Home';
import Logout from 'pages/Logout';
import Login from 'pages/Login';
import Therapists from 'pages/Therapists';
import RouterProvider from 'providers/router';

const App = () => {
    return (
        <RouterProvider>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/terapeutas" component={Therapists} />
            </Switch>
        </RouterProvider>
    );
};
export default App;

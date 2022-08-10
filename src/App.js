import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'containers/PrivateRoute';
import Home from './pages/Home';
import Logout from 'pages/Logout';
import Login from 'pages/Login';

const App = () => {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <PrivateRoute path="/home" component={Home} />
        </Switch>
    );
};
export default App;

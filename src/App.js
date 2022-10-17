import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'containers/PrivateRoute';
import Home from './pages/Home';
import Logout from 'pages/Logout';
import Login from 'pages/Login';
import Therapists from 'pages/Therapists';
import RouterProvider from 'providers/router';
import ErrorManagement from 'components/ErrorManagement';
import useCategories from 'state/categories';
import useTherapist from 'state/therapists';
import useUser from 'state/user';
import Profile from 'pages/Profile';
import AlertServiceProvider from 'alert';

const App = () => {
    const [categories, categoriesDispatcher] = useCategories();
    const [therapist, therapistDispatcher] = useTherapist();
    const [user, userDispatcher] = useUser();

    return (
        <RouterProvider>
            <AlertServiceProvider>
                <ErrorManagement
                    states={{
                        categories: { state: categories.error, resetError: categoriesDispatcher.resetError },
                        therapist: { state: therapist.error, resetError: therapistDispatcher.resetError },
                        user: { state: user.error, resetError: userDispatcher.resetError },
                    }}
                />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Logout} />
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <PrivateRoute path="/home" component={Home} />
                    <PrivateRoute path="/terapeutas" component={Therapists} />
                    <PrivateRoute path="/perfil" component={Profile} />
                </Switch>
            </AlertServiceProvider>
        </RouterProvider>
    );
};
export default App;

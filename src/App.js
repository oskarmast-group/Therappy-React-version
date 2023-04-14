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
import Timetable from 'pages/Timetable';
import Appointment from 'pages/Appointment';
import useAppointments from 'state/appointments';
import Videocall from 'pages/Videocall';
import Payments from 'pages/Payments';
import Conversation from 'pages/Conversation';
import Register from 'pages/Register';

const App = () => {
    const [categories, categoriesDispatcher] = useCategories();
    const [therapist, therapistDispatcher] = useTherapist();
    const [user, userDispatcher] = useUser();
    const [appointments, appointmentsDispatcher] = useAppointments();

    return (
        <RouterProvider>
            <AlertServiceProvider>
                <ErrorManagement
                    states={{
                        categories: { state: categories.error, resetError: categoriesDispatcher.resetError },
                        therapist: { state: therapist.error, resetError: therapistDispatcher.resetError },
                        user: { state: user.error, resetError: userDispatcher.resetError },
                        appointments: { state: appointments.error, resetError: appointmentsDispatcher.resetError },
                    }}
                />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/registro" component={Register} />
                    <Route path="/logout" component={Logout} />
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <PrivateRoute path="/home" component={Home} />
                    <PrivateRoute path="/terapeutas" component={Therapists} />
                    <PrivateRoute path="/perfil" component={Profile} />
                    <PrivateRoute path="/conversacion/:conversationId" component={Conversation} />
                    <PrivateRoute path="/horario" component={Timetable} />
                    <PrivateRoute path="/appointment" component={Appointment} />
                    <PrivateRoute path="/videollamada" component={Videocall} />
                    <PrivateRoute path="/pagos" component={Payments} />
                </Switch>
            </AlertServiceProvider>
        </RouterProvider>
    );
};
export default App;
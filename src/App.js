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
import Confirmation from 'pages/Confirmation';
import RegisterTherapist from 'pages/RegisterTherapist';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ThemeProvider, createTheme } from '@mui/material';
import { GREEN_HIGHLIGHT, PRIMARY_GREEN } from 'resources/constants/colors';
import useRequiredDocumentation from 'state/requiredDocumentation';
import useConversations from 'state/conversations';
import useMessages from 'state/messages';

const theme = createTheme({
    palette: {
        primary: {
            light: GREEN_HIGHLIGHT,
            main: PRIMARY_GREEN,
            dark: PRIMARY_GREEN,
            contrastText: '#fff',
        },
    }
});

const App = () => {
    const [appointments, appointmentsDispatcher] = useAppointments();
    const [categories, categoriesDispatcher] = useCategories();
    const [conversations, conversationsDispatcher] = useConversations();
    const [messages, messagesDispatcher] = useMessages();
    const [requiredDocumentation, requiredDocumentationDispatcher] = useRequiredDocumentation();
    const [therapist, therapistDispatcher] = useTherapist();
    const [user, userDispatcher] = useUser();
    
    return (
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
        <RouterProvider>
            <AlertServiceProvider>
                <ErrorManagement
                    states={{
                        appointments: { state: appointments.error, resetError: appointmentsDispatcher.resetError },
                        categories: { state: categories.error, resetError: categoriesDispatcher.resetError },
                        conversations: { state: conversations.error, resetError: conversationsDispatcher.resetError },
                        messages: { state: messages.error, resetError: messagesDispatcher.resetError },
                        requiredDocumentation: { state: requiredDocumentation.error, resetError: requiredDocumentationDispatcher.resetError },
                        therapist: { state: therapist.error, resetError: therapistDispatcher.resetError },
                        user: { state: user.error, resetError: userDispatcher.resetError },
                    }}
                />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/registro" component={Register} />
                    <Route path="/registro-terapeutas" component={RegisterTherapist} />
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
                    <PrivateRoute path="/confirmacion/:token" component={Confirmation} />
                </Switch>
            </AlertServiceProvider>
        </RouterProvider>
        </ThemeProvider>
        </LocalizationProvider>
        
    );
};
export default App;

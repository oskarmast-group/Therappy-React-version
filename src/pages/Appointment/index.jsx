import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import NewAppointment from './NewAppointment';
import ViewAppointment from './View';

const Appointment = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
        <Route exact path={path} component={NewAppointment} />
        <Route path={`${path}/:appointmentId`} component={ViewAppointment} />
      </Switch>
    );};

export default Appointment;
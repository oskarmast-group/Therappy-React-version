import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import List from './pages/List';
import Profile from './pages/Profile';

const Therapists = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
        <Route exact path={path} component={List} />
        <Route path={`${path}/:therapistId`} component={Profile} />
      </Switch>
    );};

export default Therapists;

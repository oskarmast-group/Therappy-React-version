import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from 'resources/api/auth';

const PrivateRoute = ({ component, groupId = null, access = null, userType = null, ...rest }) => {
  const Comp = component;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        getToken() ? (
          <Comp {...rest} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;

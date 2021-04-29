import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import cookies from 'js-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = cookies.get('jwt');

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !user ? <Redirect to="/login" /> : <Component {...routeProps} />
      }
    />
  );
};

export default PrivateRoute;

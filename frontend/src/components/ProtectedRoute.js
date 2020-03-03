import React, { useContext, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Auth';
import Navigation from './Navigation';
import Footer from './Footer';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <Fragment>
            <Navigation />
            <div className="flex-1 w-full content-center overflow-y-auto bg-gray-200">
              <RouteComponent {...routeProps} />
            </div>
            <Footer />
          </Fragment>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;

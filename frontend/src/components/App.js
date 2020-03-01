import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ScoutListContainer from './ScoutListContainer';
import ScoutProfileContainer from './ScoutProfileContainer';
import UserSettingsContainer from './UserSettingsContainer';
import { AuthProvider } from './Auth';
import PrivateRoute from './ProtectedRoute';
import SignUp from './SignUp';
import Login from './Login';
import UserHome from './UserHome';

function App() {
  return (
    <div className="flex flex-col absolute h-full w-full">
      <AuthProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <PrivateRoute
              path="/scouts/:id"
              component={ScoutProfileContainer}
            />
            <PrivateRoute path="/scouts" component={ScoutListContainer} />
            <PrivateRoute path="/settings" component={UserSettingsContainer} />
            <PrivateRoute path="/home" component={UserHome} />
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>

            <Route path="/">
              Landing Page!
              <Link to="/login">login</Link>
              <Link to="/signup">signup</Link>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

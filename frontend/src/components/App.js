import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ScoutListContainer from './ScoutListContainer';
import ScoutProfileContainer from './ScoutProfileContainer';
import UserSettingsContainer from './UserSettingsContainer';
import { AuthProvider } from './Auth';
import PrivateRoute from './ProtectedRoute';
import SignUpContainer from './SignUpContainer';
import Login from './Login';
import UserDashboardContainer from './UserDashboardContainer';
import Home from './Home';
import apolloClient from '../clients/Apollo';

function App() {
  return (
    <div className="flex flex-col absolute h-full w-full">
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <PrivateRoute
                path="/dashboard"
                component={UserDashboardContainer}
              />
              <PrivateRoute
                path="/scouts/:id"
                component={ScoutProfileContainer}
              />
              <PrivateRoute path="/scouts" component={ScoutListContainer} />
              <PrivateRoute
                path="/settings"
                component={UserSettingsContainer}
              />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUpContainer} />
              <Route exact path="/" component={Home} />
            </Switch>
          </Router>
        </ApolloProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

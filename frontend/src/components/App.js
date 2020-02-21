import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ScoutListContainer from './ScoutListContainer';
import ScoutProfileContainer from './ScoutProfileContainer';
import UserSettingsContainer from './UserSettingsContainer';
import Navigation from './Navigation';
import Footer from './Footer';

function App() {
  return (
    <div className="flex flex-col absolute h-full w-full bg-gray-100">
      <Router>
        <Navigation />
        <div className="flex-grow overflow-auto">
          <Switch>
            <Route path="/scouts/:id">
              <ScoutProfileContainer />
            </Route>
            <Route path="/scouts">
              <ScoutListContainer />
            </Route>
            <Route path="/settings">
              <UserSettingsContainer />
            </Route>
            <Route path="/"></Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;

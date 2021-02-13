import React from 'react';
import { Switch } from 'react-router-dom';

import Couch from '../pages/App/Couch';
import Dashboard from '../pages/App/Dashboard';
import SignIn from '../pages/Auth/SignIn';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/couch" component={Couch} isPrivate />
  </Switch>
);

export default Routes;

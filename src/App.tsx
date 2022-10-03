import React from 'react';
import { Switch } from 'react-router-dom';
import { getLinks } from 'react-router-hoc';

import { BaseLayout } from './components';
import { TestPage } from './pages';

import './App.css';

export const links = getLinks({
  TestPage,
});

const AuthRoutes = () => (
  <BaseLayout>
    <Switch>
      <TestPage />
    </Switch>
  </BaseLayout>
);

const App = () => {
  return (
    <Switch>
      <AuthRoutes />
    </Switch>
  );
};

export default App;

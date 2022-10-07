import React from 'react';
import { Switch } from 'react-router-dom';
import { getLinks } from 'react-router-hoc';

import { BaseLayout } from './components';
import { PostsLayout } from './pages';

import './App.css';

export const links = getLinks({
  PostsLayout,
});

const AuthRoutes = () => (
  <BaseLayout>
    <Switch>
      <PostsLayout />
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

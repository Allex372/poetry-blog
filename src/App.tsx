import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
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
      <Redirect exact from="/" to={links.PostsLayout()} />
      <PostsLayout exact />
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

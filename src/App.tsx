import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { getLinks } from 'react-router-hoc';

import { BaseLayout } from './components';
import { PostsLayout, ActivityLayout } from './pages';

import './App.css';

export const links = getLinks({
  PostsLayout,
  ActivityLayout,
});

const AuthRoutes = () => (
  <BaseLayout>
    <Switch>
      <PostsLayout />
      <ActivityLayout />
    </Switch>
  </BaseLayout>
);

const App = () => {
  return (
    <Switch>
      <Redirect exact from="/" to={links.PostsLayout()} />
      <AuthRoutes />
    </Switch>
  );
};

export default App;

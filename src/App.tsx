import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { getLinks } from 'react-router-hoc';

import { BaseLayout, UnAuthLayout } from './components';
import { PostsLayout, ActivityLayout, LoginPage, ClientAccount } from './pages';
// import { useAuth } from './context';

import './App.css';

export const links = getLinks({
  PostsLayout,
  ActivityLayout,
  LoginPage,
  ClientAccount,
});

const UnAuthRoutes = () => (
  <UnAuthLayout>
    <Switch>
      <LoginPage />
    </Switch>
  </UnAuthLayout>
);

const AuthRoutes = () => (
  <BaseLayout>
    <Switch>
      <PostsLayout />
      <ActivityLayout />
      <ClientAccount />
    </Switch>
  </BaseLayout>
);

const App = () => {
  // const { isAuthenticated, isInitializing } = useAuth();

  // const isAuthenticated = false;

  // if (isInitializing) {
  //   return <CircularProgress size={64} />;
  // }
  return (
    <Switch>
      <Redirect exact from="/" to={links.PostsLayout()} />

      <Route path={links.LoginPage()}>
        <UnAuthRoutes />
      </Route>
      <AuthRoutes />
      {/* {isAuthenticated ? <AuthRoutes /> : <Redirect to={links.LoginPage()} />} */}
    </Switch>
  );
};

export default App;

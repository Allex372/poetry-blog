import { Route } from 'react-router-hoc';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import Context from '../../context/Context';
import { LoginForm } from '../../components';
import { useAuth } from '../../context';
import { HttpErrorResponse, LoginFormValues } from '../../types';
import { links } from '../../App';
import clsx from 'clsx';

import styles from './Activity.module.scss';

const LoginPageRoute = Route(
  {
    theme: Route.query.number,
  },
  '/login',
);

export const LoginPage = LoginPageRoute(() => {
  const { login } = useAuth();
  const history = useHistory();
  //   const { currentTheme } = useContext(Context);
  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const res = await login(values);
      res.access_token && history.push(links.PostsLayout());
    } catch (e) {
      toast.error((e as HttpErrorResponse).message);
    }
  };
  return <LoginForm onSubmit={handleSubmit} />;
});

export default LoginPage;

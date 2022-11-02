import { Route } from 'react-router-hoc';
import { useContext } from 'react';
import { toast } from 'react-toastify';

import Context from '../../context/Context';
import { LoginForm } from '../../components';
import { useAuth } from '../../context';
import { HttpErrorResponse, LoginFormValues } from '../../types';
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
  //   const { currentTheme } = useContext(Context);
  const handleSubmit = async (values: LoginFormValues) => {
    const { email, rememberMe } = values;
    console.log(values);

    try {
      const res = await login(values);
      console.log(res);
      //   history.push(authCode ? links.VerificationCode({ email, rememberMe }) : links.WorkOrders());
    } catch (e) {
      toast.error((e as HttpErrorResponse).message);
    }
  };
  return <LoginForm onSubmit={handleSubmit} />;
});

export default LoginPage;

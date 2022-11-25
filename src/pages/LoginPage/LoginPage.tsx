import { useState } from 'react';
import { Route } from 'react-router-hoc';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { LoginForm, RegistrationForm } from '../../components';
import { useAuth } from '../../context';
import { HttpErrorResponse, LoginFormValues, RegistrationFormValues } from '../../types';
import { links } from '../../App';
// import clsx from 'clsx';

import styles from './LoginPage.module.scss';

const LoginPageRoute = Route(
  {
    theme: Route.query.number,
  },
  '/login',
);

export const LoginPage = LoginPageRoute(() => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const { login, signUp } = useAuth();
  const history = useHistory();
  //   const { currentTheme } = useContext(Context);

  const handleSignUp = async (values: RegistrationFormValues) => {
    try {
      const res = await signUp(values);
      res.status === 200 && setIsLoginForm(true);
    } catch (e) {
      toast.error((e as HttpErrorResponse).message);
    }
  };

  const handleLogin = async (values: LoginFormValues) => {
    try {
      const res = await login(values);
      res.data.access_token && history.push(links.PostsLayout());
    } catch (e) {
      toast.error((e as HttpErrorResponse).message);
    }
  };
  return (
    <div className={styles.formWrapper}>
      <div className={styles.topWrapper}>
        <p>Login or Sign In?</p>
        <div className={styles.textWrapper}>
          <p className={styles.title} onClick={() => setIsLoginForm(true)}>
            Login
          </p>
          <p className={styles.title} onClick={() => setIsLoginForm(false)}>
            Sing In
          </p>
        </div>
      </div>
      {isLoginForm ? <LoginForm onSubmit={handleLogin} /> : <RegistrationForm onSubmit={handleSignUp} />}
    </div>
  );
});

export default LoginPage;

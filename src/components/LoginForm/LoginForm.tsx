import React, { FC, useCallback, useMemo, useState } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import Tooltip from '@material-ui/core/Tooltip';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

import { LoadingButton, PassVisibilityBtn } from '../../components';
import { LoginFormValues } from '../../types';

import styles from './LoginForm.module.scss';

interface LoginProps {
  onSubmit: (values: LoginFormValues, formikHelpers: FormikHelpers<LoginFormValues>) => void | Promise<void>;
  email?: string;
  password?: string;
  rememberMe?: boolean;
}

export const LoginForm: FC<LoginProps> = (props) => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const { email, password, rememberMe, onSubmit } = props;

  const togglePasswordVisibility = useCallback(() => setIsPassVisible((prev) => !prev), []);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is a required field'),
        password: Yup.string().required('Password is a required field'),
      }),
    [],
  );

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        email: email ?? '',
        password: password ?? '',
        rememberMe: rememberMe ?? true,
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <div className={styles.formWrapper}>
          <div>
            <p className={styles.titleFontSize}>Ласкаво просимо</p>
            <p className={styles.textStyle}>Вхід</p>
            <Form className={styles.inputWrapper}>
              <div className={styles.inputStyle}>
                <Field
                  component={TextField}
                  className={styles.inputW}
                  name="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                />
              </div>

              <div className={styles.inputStyle}>
                <Field
                  component={TextField}
                  type={isPassVisible ? 'text' : 'password'}
                  name="password"
                  variant="outlined"
                  className={styles.inputW}
                  label="Пароль"
                  InputProps={{
                    endAdornment: (
                      <Tooltip
                        aria-label={'Show password'}
                        title={isPassVisible ? 'Hide password' : 'Show password'}
                        placement="right"
                      >
                        <span className="ml-6">
                          <PassVisibilityBtn
                            isPassVisible={isPassVisible}
                            togglePasswordVisibility={togglePasswordVisibility}
                          />
                        </span>
                      </Tooltip>
                    ),
                  }}
                />
              </div>

              {/* <div className="flex justify-content-between align-items-center mb-32">
                  <div className="flex align-items-center">
                    <Field component={Switch} type="checkbox" color="primary" name="rememberMe" />
                    <p className="text-smallTextGrey">Remember me</p>
                  </div>
                  <NavLink to={links.ForgotPassword} className="text-primary weight-bolder">
                    Forgot password
                  </NavLink>
                </div> */}
              <div className="flex align-items-center justify-content-center">
                <LoadingButton type="submit" className={styles.btnStyle} loading={isSubmitting}>
                  Вхід
                </LoadingButton>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

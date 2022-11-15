import React, { FC, useCallback, useMemo, useState } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import Tooltip from '@material-ui/core/Tooltip';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

import { LoadingButton, PassVisibilityBtn } from '../../components';
import { RegistrationFormValues } from '../../types';

import styles from './RegistrationForm.module.scss';

interface RegistrationProps {
  onSubmit: (
    values: RegistrationFormValues,
    formikHelpers: FormikHelpers<RegistrationFormValues>,
  ) => void | Promise<void>;
  email?: string;
  password?: string;
  name?: string;
}

export const RegistrationForm: FC<RegistrationProps> = (props) => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const { email, password, name, onSubmit } = props;

  const togglePasswordVisibility = useCallback(() => setIsPassVisible((prev) => !prev), []);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is a required field'),
        password: Yup.string().required('Password is a required field'),
        name: Yup.string().required('User name is a required field'),
      }),
    [],
  );

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        email: email ?? '',
        password: password ?? '',
        name: name ?? '',
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <div className={styles.formWrapper}>
          <div>
            <p className={styles.titleFontSize}>Welcome</p>
            <p className={styles.textStyle}>Registration</p>
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
                  className={styles.inputW}
                  name="name"
                  label="User name"
                  variant="outlined"
                  type="text"
                />
              </div>

              <div className={styles.inputStyle}>
                <Field
                  component={TextField}
                  type={isPassVisible ? 'text' : 'password'}
                  name="password"
                  variant="outlined"
                  className={styles.inputW}
                  label="Password"
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

              <div className="flex align-items-center justify-content-center">
                <LoadingButton type="submit" className={styles.btnStyle} loading={isSubmitting}>
                  Register
                </LoadingButton>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

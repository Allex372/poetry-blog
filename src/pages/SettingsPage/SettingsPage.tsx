import { useMemo, useState, useCallback } from 'react';
import { Route } from 'react-router-hoc';
import { Formik, Form, Field } from 'formik';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Tooltip from '@material-ui/core/Tooltip';
// import InputAdornment from '@material-ui/core/InputAdornment';
import { TextField } from 'formik-material-ui';
import { LoadingButton, PassVisibilityBtn } from '../../components';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';

// import Context from '../../context/Context';
// import logo from './img.jpeg'; // Tell webpack this JS file uses this image
import { useAuth } from '../../context';
import { api, apiRoutes } from '../../api';
import { UpdateUserInterface } from '../../types';

import styles from './SettingsPage.module.scss';

const SettingsLayoutRoute = Route(
  {
    theme: Route.query.number,
  },
  '/settings',
);

export const SettingsPage = SettingsLayoutRoute(() => {
  const { userData, isLoading, updateAccountInfo } = useAuth();
  // const { currentTheme } = useContext(Context);

  const [isPassVisible, setIsPassVisible] = useState(false);
  //   const [userToUpdate, setUserToUpdate] = useState<UpdateUserInterface | null>({});
  //   const [openDialog, setOpenDialog] = useState<boolean>(false);

  const togglePasswordVisibility = useCallback(() => setIsPassVisible((prev) => !prev), []);

  const updateUserQuery = (values: UpdateUserInterface) =>
    api.put(`${apiRoutes.users}/${userData?._id}`, values).then((res) => res.data);
  const { mutateAsync: updateUser } = useMutation(
    'updateUserQuery',
    (values: UpdateUserInterface) => updateUserQuery(values),
    {
      onSuccess: () => {
        updateAccountInfo();
        // setOpenDialog(false);
        // setUserToUpdate(null);
        toast.success('User has been successfully updated');
      },
    },
  );

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string().email('Invalid email address'),
        password: Yup.string(),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        role: Yup.string(),
        createdAt: Yup.string(),
        updatedAt: Yup.string(),
        name: Yup.string(),
      }),
    [],
  );

  const handleSubmit = async (values: UpdateUserInterface) => {
    if (!values.password?.length) {
      delete values.password;
      delete values.updatedAt;
      await updateUser(values);
    } else {
      delete values.updatedAt;
      await updateUser(values);
    }
  };

  if (isLoading) return <CircularProgress size={64} />;
  return (
    <div className={styles.wrapper}>
      <div className={styles.settingsWrapper}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            name: userData?.name ?? '',
            email: userData?.email ?? '',
            password: '',
            passwordConfirmation: '',
            role: userData?.role ?? '',
            createdAt: (userData && new Date(userData?.createdAt).toLocaleDateString()) ?? '',
            updatedAt: (userData && new Date(userData?.updatedAt).toLocaleDateString()) ?? '',
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={styles.topContainer}>
                <h1 className={styles.blockTitle}>Edit Profile</h1>
              </div>
              <section className={styles.sectionWrapper}>
                <span className={styles.heading}>- Personal Info</span>
                <div className={styles.inputWrapper}>
                  <div className={styles.inputStyle}>
                    <Field
                      component={TextField}
                      className={styles.inputWidth}
                      name="name"
                      label="User name"
                      variant="outlined"
                    />
                  </div>
                  <div className={styles.inputStyle}>
                    <Field
                      component={TextField}
                      className={styles.inputWidth}
                      name="role"
                      label="User role"
                      variant="outlined"
                    />
                  </div>
                  <div className={styles.inputStyle}>
                    <Field
                      component={TextField}
                      className={styles.inputWidth}
                      name="createdAt"
                      label="Account created at"
                      variant="outlined"
                    />
                  </div>
                  <div className={styles.inputStyle}>
                    <Field
                      component={TextField}
                      className={styles.inputWidth}
                      name="updatedAt"
                      label="Account updated at"
                      variant="outlined"
                    />
                  </div>
                  <div className={styles.inputStyle}>
                    <Field
                      component={TextField}
                      className={styles.inputWidth}
                      name="email"
                      label="Email"
                      placeholder="test@gmail.com"
                      variant="outlined"
                      type="email"
                    />
                  </div>
                </div>
              </section>
              <section className={styles.sectionWrapper}>
                <span className={styles.heading}>- Change password</span>
                <div className={styles.inputWrapper}>
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
                  <div className={styles.inputStyle}>
                    <Field
                      component={TextField}
                      type={isPassVisible ? 'text' : 'password'}
                      name="passwordConfirmation"
                      variant="outlined"
                      className={styles.inputW}
                      label="Confirm Password"
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
                </div>
              </section>

              <div className={styles.inputStyle}>
                <LoadingButton fullWidth type="submit" loading={isSubmitting}>
                  Save
                </LoadingButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
});

export default SettingsPage;

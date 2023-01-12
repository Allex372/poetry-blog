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
import { ImageIcon } from '../../icons';
import { CropEasy } from '../../components';
// import { Crop } from '@mui/icons-material';

import { useAuth } from '../../context';
import { api, apiRoutes } from '../../api';
import { UpdateUserInterface } from '../../types';

import styles from './SettingsPage.module.scss';
import axios from 'axios';

const SettingsLayoutRoute = Route(
  {
    theme: Route.query.number,
  },
  '/settings',
);

export const SettingsPage = SettingsLayoutRoute(() => {
  const { userData, isLoading, updateAccountInfo } = useAuth();

  const [isPassVisible, setIsPassVisible] = useState(false);
  const [cropedFile, setFile] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState<string>();
  const [openCrop, setOpenCrop] = useState(false);

  const togglePasswordVisibility = useCallback(() => setIsPassVisible((prev) => !prev), []);

  const updateUserQuery = (values: UpdateUserInterface) =>
    api.put(`${apiRoutes.users}/${userData?._id}`, values).then((res) => res.data);
  const { mutateAsync: updateUser } = useMutation(
    'updateUserQuery',
    (values: UpdateUserInterface) => updateUserQuery(values),
    {
      onSuccess: () => {
        updateAccountInfo();
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

  // useEffect(() => {
  //   console.log(file, photoURL);
  // }, [photoURL, file]);
  const handleSubmit = async (values: UpdateUserInterface) => {
    // console.log(file);
    if (cropedFile) {
      const formData = new FormData();
      formData.append('file', cropedFile);
      formData.append('upload_preset', 'zt2xg5aq');
      const uploadImg = await axios
        .request({
          method: 'POST',
          data: formData,
          url: 'https://api.cloudinary.com/v1_1/dp0ftqcbc/image/upload',
        })
        .then((res) => res.data());
      values.avatar = uploadImg.url;
      values.avatarPublicId = uploadImg.public_id;
      values.oldAvatar = userData?.avatarPublicId;
    }
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
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className={styles.topContainer}>
                <h1 className={styles.blockTitle}>Керування профілем</h1>
              </div>
              <section className={styles.sectionWrapper}>
                <span className={styles.heading}>- Інформація користувача</span>
                <div className={styles.inputWrapper}>
                  <div className={styles.inputStyle}>
                    <Field
                      component={TextField}
                      className={styles.inputWidth}
                      name="name"
                      label="Нік нейм"
                      variant="outlined"
                    />
                  </div>
                  {/* <div className={styles.inputStyle}>
                    <Field
                      component={TextField}
                      className={styles.inputWidth}
                      disabled
                      name="role"
                      label="User role"
                      variant="outlined"
                    />
                  </div> */}
                  <div className={styles.inputStyle}>
                    <Field
                      component={TextField}
                      className={styles.inputWidth}
                      disabled
                      name="createdAt"
                      label="Створений"
                      variant="outlined"
                    />
                  </div>
                  <div className={styles.inputStyle}>
                    <Field
                      component={TextField}
                      className={styles.inputWidth}
                      disabled
                      name="updatedAt"
                      label="Оновлений"
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
                  <div className={styles.inputUploadWrapper}>
                    <label htmlFor="inputTag" className={styles.inputUploadWrapper}>
                      {values?.file ? values?.file.name : 'Обрати фото'}
                      <ImageIcon className={styles.downloadIcon} />
                      <input
                        id="inputTag"
                        name="img"
                        type="file"
                        onChange={(event: React.ChangeEvent) => {
                          const target = event.target as HTMLInputElement;
                          const files = target.files;
                          files && setFile(files[0]);
                          files && setPhotoURL(URL.createObjectURL(files[0]));
                          setOpenCrop(true);
                          files && setFieldValue('file', files[0]);
                        }}
                      />
                    </label>
                  </div>
                </div>
              </section>
              <section className={styles.sectionWrapper}>
                <span className={styles.heading}>- Зміна паролю</span>
                <div className={styles.inputWrapper}>
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
                            aria-label="Show password"
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
                      label="Підтвердити"
                      InputProps={{
                        endAdornment: (
                          <Tooltip
                            aria-label="Show password"
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
                  Оновити
                </LoadingButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {openCrop && <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />}
    </div>
  );
});

export default SettingsPage;

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import { LoadingButton } from '../LoadingButton';

import { ImageIcon } from '../../icons';

import styles from './CreatePostForm.module.scss';

interface PostInterface {
  title?: string;
  text?: string;
  file?: File;
}

type RoleFormProps = {
  submitButtonTitle: string;
  onSubmit: (values: PostInterface) => void;
  close: () => void;
};

const btnStyle = { color: 'black', fontWeight: 'bold' };

export const CreatePostForm = ({ submitButtonTitle, onSubmit, close }: RoleFormProps) => {
  return (
    <Formik initialValues={{ title: '', text: '' }} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className={styles.formWrapper}>
          <div className={styles.inputWrapper}>
            <Field component={TextField} name="title" label="Title" type="text" />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="inputTag" className={styles.inputWrapper}>
              {values?.file ? values?.file.name : 'Select Image'}
              <ImageIcon className={styles.downloadIcon} />
              <input
                id="inputTag"
                name="img"
                type="file"
                onChange={(event: React.ChangeEvent) => {
                  const target = event.target as HTMLInputElement;
                  const files = target.files;
                  files && setFieldValue('file', files[0]);
                }}
              />
            </label>
          </div>
          <div className={styles.inputWrapper}>
            <Field component={TextField} name="text" label="Text" type="text" className="mb-24 mb-md-36" />
          </div>

          <div className={styles.buttonWrapper}>
            <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
              {submitButtonTitle}
            </LoadingButton>
            <Button style={btnStyle} type="reset" variant="text" onClick={() => close()}>
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
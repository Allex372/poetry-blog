import { FC } from 'react';
import Button from '@material-ui/core/Button';
import { LoadingButton } from '../LoadingButton';

import styles from './ConfirmationModal.module.scss';

interface ConfirmationModalProps {
  text?: string;
  onClose: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  submitText?: string;
  cancelText?: string;
}

const btnStyle = { color: 'black', fontWeight: 'bold' };

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  text,
  onSubmit,
  onClose,
  isLoading,
  submitText,
  cancelText,
}) => (
  <div className={styles.modalWrapper}>
    <div className="mb-24 mb-md-36 col-12">
      <p className={styles.text}>{text}</p>
    </div>

    <div className="flex pt-24 justify-content-end col-12">
      <Button className="ml-12" variant="contained" onClick={onClose}>
        {cancelText ?? 'Cancel'}
      </Button>
      <LoadingButton variant="text" onClick={onSubmit} loading={isLoading}>
        {submitText ?? 'Yes, delete'}
      </LoadingButton>
    </div>
  </div>
);

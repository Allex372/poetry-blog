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

    <div className={styles.btnWrapper}>
      <Button style={btnStyle} variant="contained" onClick={onClose}>
        {cancelText ?? 'Скасувати'}
      </Button>
      <LoadingButton variant="text" onClick={onSubmit} loading={isLoading}>
        {submitText ?? 'Видалити'}
      </LoadingButton>
    </div>
  </div>
);

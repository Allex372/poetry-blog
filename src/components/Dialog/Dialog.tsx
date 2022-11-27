import React, { FC, ReactElement } from 'react';
import Dialog from '@material-ui/core/Dialog';

import { CloseIcon } from '../../icons';

import styles from './Dialog.module.scss';

interface ModalState {
  open: boolean;
  header?: string;
  icon?: ReactElement;
  onClose: () => void;
  fullHeight?: boolean;
  className?: string;
  children: React.ReactNode;
  helperText?: string;
}

export const CustomDialog: FC<ModalState> = ({
  children,
  open,
  helperText,
  onClose,
  header,
  icon,
  fullHeight,
  className,
}) => {
  return (
    <div>
      <Dialog className={className} fullScreen={fullHeight} open={open} onClose={onClose}>
        {header && (
          <h2 className={styles.title}>
            {icon}
            {header}
            <CloseIcon onClick={onClose} className={styles.closeBtn} />
          </h2>
        )}
        {helperText && <h6 className={styles.helperText}>{helperText}</h6>}
        {children}
      </Dialog>
    </div>
  );
};

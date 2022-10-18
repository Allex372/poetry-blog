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
}

export const CustomDialog: FC<ModalState> = ({ children, open, onClose, header, icon, fullHeight, className }) => {
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
        {children}
      </Dialog>
    </div>
  );
};

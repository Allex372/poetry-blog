import React from 'react';
import IconButton from '@material-ui/core/IconButton';

import { EyeIcon, EyeIconClosed } from '../../icons';

import styles from './PassVisibilityBtn.module.scss';

interface PassVisibilityBtnProps {
  togglePasswordVisibility: () => void;
  isPassVisible: boolean;
}

export const PassVisibilityBtn = ({ isPassVisible, togglePasswordVisibility }: PassVisibilityBtnProps) => {
  return (
    <IconButton size="small" onClick={togglePasswordVisibility}>
      {isPassVisible ? <EyeIconClosed className={styles.EyeIconIconActive} /> : <EyeIcon />}
    </IconButton>
  );
};

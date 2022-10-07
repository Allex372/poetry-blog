import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';

import styles from './AppLoadingLayout.module.scss';

export const AppLoadingLayout = () => {
  return (
    <div className={clsx(styles.loading)}>
      <CircularProgress size={64} />
    </div>
  );
};

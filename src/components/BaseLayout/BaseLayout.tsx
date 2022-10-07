import React, { FC } from 'react';
import clsx from 'clsx';

import { Sidebar } from '../../components';

import styles from './BaseLayout.module.scss';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className={styles.baseLayoutWrapper}>
      <Sidebar />
      <div className="flex flex-column flex-1">
        <div className={clsx(styles.container, 'flex', 'flex-1')}>
          <div className={clsx(styles.content, 'flex-1')}>{children}</div>
        </div>
      </div>
    </div>
  );
};

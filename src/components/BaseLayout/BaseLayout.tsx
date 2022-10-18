import React, { FC, useState, useEffect } from 'react';

import { Header } from '../../components';
import { localStorageManager } from '../../services';
import clsx from 'clsx';

import styles from './BaseLayout.module.scss';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<number | null | string>(null);

  const handleChangeTheme = (id: number | string | null) => {
    setCurrentTheme(id);
  };

  const handleGetTheme = () => {
    setCurrentTheme(localStorageManager.getItem('theme_Id'));
    currentTheme === null && setCurrentTheme(3);
  };

  useEffect(() => {
    handleGetTheme();
  }, [currentTheme]);

  return (
    <div
      className={clsx(
        currentTheme == '1' && [styles.baseLayoutWrapper, styles.baseLayoutWrapperDarkTheme],
        currentTheme == '2' && [styles.baseLayoutWrapper, styles.baseLayoutWrapperLightTheme],
        currentTheme == '3' && [styles.baseLayoutWrapper, styles.baseLayoutWrapperClassicTheme],
      )}
    >
      <div className={styles.flexWrapper}>
        <Header changeTheme={handleChangeTheme} />
        <div className={clsx(styles.container)}>
          <div className={clsx(styles.content)}>{children}</div>
        </div>
      </div>
    </div>
  );
};

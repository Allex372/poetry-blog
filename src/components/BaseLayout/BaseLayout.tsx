import React, { FC, useState, useEffect } from 'react';

import { Header } from '../../components';
import { localStorageManager } from '../../services';
import Context from '../../context/Context';
import { RefetchContext } from '../../context/Refetch';
import clsx from 'clsx';

import styles from './BaseLayout.module.scss';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<number | null | string>(null);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);

  const handleChangeTheme = (id: number | string | null) => {
    setCurrentTheme(id);
  };

  const handleGetTheme = () => {
    setCurrentTheme(localStorageManager.getItem('theme_Id'));
    currentTheme === null && setCurrentTheme(3);
  };

  const handleNeedRefetch = (isRefetch: boolean) => {
    setIsRefetch(isRefetch);
  };

  useEffect(() => {
    handleGetTheme();
  }, [currentTheme]);

  //improve logic
  useEffect(() => {
    setTimeout(() => {
      setIsRefetch(false);
    }, 3000);
  }, [isRefetch]);

  const value = {
    currentTheme,
  };

  const initialRefetch = {
    isRefetch,
  };

  return (
    <Context.Provider value={value}>
      <RefetchContext.Provider value={initialRefetch}>
        <div
          className={clsx(
            currentTheme == '1' && [styles.baseLayoutWrapper, styles.baseLayoutWrapperDarkTheme],
            currentTheme == '2' && [styles.baseLayoutWrapper, styles.baseLayoutWrapperLightTheme],
            currentTheme == '3' && [styles.baseLayoutWrapper, styles.baseLayoutWrapperClassicTheme],
          )}
        >
          <div className={styles.flexWrapper}>
            <Header handleNeedRefetch={handleNeedRefetch} changeTheme={handleChangeTheme} />
            <div className={styles.container}>
              <div className={styles.content}>{children}</div>
            </div>
          </div>
        </div>
      </RefetchContext.Provider>
    </Context.Provider>
  );
};

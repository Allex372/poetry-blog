import React, { FC, useState, useEffect } from 'react';

import { Header } from '../../components';
import { localStorageManager } from '../../services';
import { RefetchContext } from '../../context/Refetch';

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

  const initialRefetch = {
    isRefetch,
  };

  return (
    <RefetchContext.Provider value={initialRefetch}>
      <div className={styles.baseLayoutWrapper}>
        <div className={styles.flexWrapper}>
          <Header handleNeedRefetch={handleNeedRefetch} changeTheme={handleChangeTheme} />
          <div className={styles.container}>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </div>
    </RefetchContext.Provider>
  );
};

import React, { useState } from 'react';
import { MenuIcon, SearchIcon, CloseIcon } from '../../icons';

import styles from './Header.module.scss';

export const Header = () => {
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  const handleSideBarClick = () => {
    setOpenSideBar(!openSideBar);
  };
  return (
    <>
      <div className={styles.wrapper}>
        {openSideBar ? (
          <CloseIcon className={styles.menuIcon} onClick={handleSideBarClick} />
        ) : (
          <MenuIcon className={styles.menuIcon} onClick={handleSideBarClick} />
        )}

        <p className={styles.raibowText}>B</p>
        <SearchIcon className={styles.menuIcon} />
      </div>
      {openSideBar && (
        <div className={styles.sideBarWrapperOpen}>
          <div className={styles.mainContainer}>sideBar</div>
        </div>
      )}
    </>
  );
};

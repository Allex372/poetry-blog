import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-hoc';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { MenuIcon, SearchIcon, CloseIcon, HomeIcon, SettingsIcon, CustomizingIcon, ChoosenIcon } from '../../icons';
import { SidebarNavItem } from './SidebarItems';
import { links } from '../../App';
import { localStorageManager } from '../../services';

import styles from './Header.module.scss';

const SideBarRoute = Route(
  {
    theme: Route.query.number,
  },
  '/posts',
);

const Themes = [
  { id: 1, name: 'Dark' },
  { id: 2, name: 'Light' },
  { id: 3, name: 'Classic' },
];

export interface ThemeInterface {
  id: number;
  name: string;
}

export interface HeaderInterface {
  changeTheme: (id: number | string | null) => void;
}

export const Header = SideBarRoute<HeaderInterface>(({ changeTheme, match: { query }, link }) => {
  const { push } = useHistory();
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [isThemeOpen, setIsThemeOpen] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<number | null | string>();

  const handleGetTheme = () => {
    setCurrentTheme(localStorageManager.getItem('theme_Id'));
  };

  const handleSetTheme = ({ id }: ThemeInterface) => {
    push(link({ ...query, theme: id }));
    localStorageManager.setItem('theme_Id', id);
    changeTheme(id);
    handleGetTheme();
  };

  const handleSideBarClick = () => {
    setOpenSideBar(!openSideBar);
  };

  useEffect(() => {
    if (currentTheme == null && localStorageManager.getItem('theme_Id') == null) {
      localStorageManager.setItem('theme_Id', 3);
      push(link({ ...query, theme: 3 }));
      setCurrentTheme(3);
    }
    handleGetTheme();
  }, []);

  return (
    <>
      <div
        className={clsx(
          currentTheme == '1' && [styles.wrapper, styles.wrapperDarkTheme],
          currentTheme == '2' && [styles.wrapper, styles.wrapperLightTheme],
          currentTheme == '3' && [styles.wrapper, styles.wrapperClassicTheme],
        )}
      >
        {openSideBar ? (
          <CloseIcon
            className={clsx(
              currentTheme == '1' && [styles.menuIcon, styles.menuIconDarkTheme],
              currentTheme == '2' && [styles.menuIcon, styles.menuIconLightTheme],
              currentTheme == '3' && [styles.menuIcon, styles.menuIconClassicTheme],
            )}
            onClick={handleSideBarClick}
          />
        ) : (
          <MenuIcon
            className={clsx(
              currentTheme == '1' && [styles.menuIcon, styles.themeIconDarkTheme],
              currentTheme == '2' && [styles.menuIcon, styles.menuIconLightTheme],
              currentTheme == '3' && [styles.menuIcon, styles.themeIconClassicTheme],
            )}
            onClick={handleSideBarClick}
          />
        )}

        <p className={styles.raibowText}>B</p>
        <SearchIcon
          className={clsx(
            currentTheme == '1' && [styles.menuIcon, styles.menuIconDarkTheme],
            currentTheme == '2' && [styles.menuIcon, styles.menuIconLightTheme],
            currentTheme == '3' && [styles.menuIcon, styles.menuIconClassicTheme],
          )}
        />
      </div>
      {openSideBar && (
        <div
          className={clsx(
            currentTheme == '1' && [styles.sideBarWrapperOpen, styles.sideBarWrapperOpenDarkTheme],
            currentTheme == '2' && [styles.sideBarWrapperOpen, styles.sideBarWrapperOpenLightTheme],
            currentTheme == '3' && [styles.sideBarWrapperOpen, styles.sideBarWrapperOpenClassicTheme],
          )}
        >
          <SidebarNavItem className={styles.linkStyle} route={links.PostsLayout()}>
            <div className={styles.iconWrapper}>
              <HomeIcon
                className={clsx(
                  currentTheme == '1' && [styles.sideBarIcon, styles.sideBarIconDarkTheme],
                  currentTheme == '2' && [styles.sideBarIcon, styles.sideBarIconLightTheme],
                  currentTheme == '3' && [styles.sideBarIcon, styles.sideBarIconClassicTheme],
                )}
              />
              <p
                className={clsx(
                  currentTheme == '1' && [styles.sidebarText, styles.sidebarTextDarkTheme],
                  currentTheme == '2' && [styles.sidebarText, styles.sidebarTextLightTheme],
                  currentTheme == '3' && [styles.sidebarText, styles.sidebarTextClassicTheme],
                )}
              >
                Home
              </p>
            </div>
          </SidebarNavItem>

          <SidebarNavItem className={styles.linkStyle} route={links.PostsLayout()}>
            <div className={styles.iconWrapper}>
              <SettingsIcon
                className={clsx(
                  currentTheme == '1' && [styles.sideBarIcon, styles.sideBarIconDarkTheme],
                  currentTheme == '2' && [styles.sideBarIcon, styles.sideBarIconLightTheme],
                  currentTheme == '3' && [styles.sideBarIcon, styles.sideBarIconClassicTheme],
                )}
              />
              <p
                className={clsx(
                  currentTheme == '1' && [styles.sidebarText, styles.sidebarTextDarkTheme],
                  currentTheme == '2' && [styles.sidebarText, styles.sidebarTextLightTheme],
                  currentTheme == '3' && [styles.sidebarText, styles.sidebarTextClassicTheme],
                )}
              >
                Settings
              </p>
            </div>
          </SidebarNavItem>

          <div className={styles.iconWrapper}>
            <CustomizingIcon
              className={clsx(
                currentTheme == '1' && [styles.sideBarIcon, styles.sideBarIconDarkTheme],
                currentTheme == '2' && [styles.sideBarIcon, styles.sideBarIconLightTheme],
                currentTheme == '3' && [styles.sideBarIcon, styles.sideBarIconClassicTheme],
              )}
            />

            <div className={styles.themeBlock}>
              <p
                className={clsx(
                  currentTheme == '1' && [styles.sidebarText, styles.sidebarTextDarkTheme],
                  currentTheme == '2' && [styles.sidebarText, styles.sidebarTextLightTheme],
                  currentTheme == '3' && [styles.sidebarText, styles.sidebarTextClassicTheme],
                )}
                onClick={() => setIsThemeOpen(!isThemeOpen)}
              >
                Themes
              </p>
              {isThemeOpen && (
                <div
                  className={clsx(
                    currentTheme == '1' && [styles.themes, styles.themesDarkTheme],
                    currentTheme == '2' && [styles.themes, styles.themesClassicTheme],
                    currentTheme == '3' && [styles.themes, styles.themesLightTheme],
                  )}
                >
                  {Themes.map((theme) => (
                    <div key={theme.id} onClick={() => handleSetTheme(theme)} className={styles.themeItem}>
                      {theme.name}
                      {currentTheme == theme?.id && (
                        <ChoosenIcon
                          className={clsx(
                            currentTheme == '1' && [styles.themeIcon, styles.themeIconDarkTheme],
                            currentTheme == '2' && [styles.themeIcon, styles.sideBarIconLightTheme],
                            currentTheme == '3' && [styles.themeIcon, styles.themeIconClassicTheme],
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
});

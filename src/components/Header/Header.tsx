import React, { useEffect, useState, FC } from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
// import { useMutation, useQuery } from 'react-query';
import clsx from 'clsx';

import {
  MenuIcon,
  CloseIcon,
  HomeIcon,
  ActivityIcon,
  SettingsIcon,
  CustomizingIcon,
  ChoosenIcon,
  UserIcon,
} from '../../icons';
import { SidebarNavItem } from './SidebarItems';
import { links } from '../../App';
import { localStorageManager } from '../../services';
import { CustomDialog } from '../Dialog';
import { CreatePostForm } from '../CreatePostForm';
import { useAuth } from '../../context';

import styles from './Header.module.scss';
import axios from 'axios';

const Themes = [
  { id: 1, name: 'Dark' },
  { id: 2, name: 'Light' },
  { id: 3, name: 'Classic' },
];

interface ThemeInterface {
  id: number;
  name: string;
}

interface HeaderInterface {
  changeTheme: (id: number | string | null) => void;
  handleNeedRefetch: (isRefetch: boolean) => void;
}

enum RolesEnum {
  Admin = 'admin',
  User = 'User',
}

const btnStyle = { backgroundColor: '#00b8ff', color: 'white', fontWeight: 'bold' };

export const Header: FC<HeaderInterface> = ({ changeTheme, handleNeedRefetch }) => {
  const history = useHistory();
  const { userData, logout } = useAuth();

  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [isThemeOpen, setIsThemeOpen] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<number | null | string>();
  const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false);

  history.listen(() => {
    setOpenSideBar(false);
  });

  const handleGetTheme = () => {
    setCurrentTheme(localStorageManager.getItem('theme_Id'));
  };

  const handleSetTheme = ({ id }: ThemeInterface) => {
    localStorageManager.setItem('theme_Id', id);
    changeTheme(id);
    handleGetTheme();
  };

  const handleSideBarClick = () => {
    setOpenSideBar(!openSideBar);
  };

  // eslint-disable-next-line
  const handleCreatePost = async (value: any) => {
    const formData = new FormData();
    formData.append('file', value.file);
    formData.append('upload_preset', 'vm30xf2h');

    const uploadImg = await fetch('https://api.cloudinary.com/v1_1/dp0ftqcbc/image/upload', {
      method: 'POST',
      body: formData,
    }).then((req) => req.json());

    if (uploadImg.secure_url) {
      const newPost = {
        title: value.title,
        text: value.text,
        picture: uploadImg.secure_url,
        userID: userData?._id,
        userName: userData?.name,
        photoPublicId: uploadImg?.public_id,
      };
      await axios
        .request({
          method: 'post',
          url: 'https://poetry-blog-nodejs.herokuapp.com/posts',
          data: newPost,
        })
        .then((res) => {
          if (res.status == 200) {
            setOpenCreatePostDialog(false);
            toast.success('Post Created');
            setOpenSideBar(false);
            handleNeedRefetch(true);
          }
        });
    }
  };

  const handleLogOut = () => {
    logout();
    history.push('/login');
  };

  const handleCloseSelectedDialog = () => setOpenCreatePostDialog(false);

  useEffect(() => {
    if (currentTheme == null && localStorageManager.getItem('theme_Id') == null) {
      localStorageManager.setItem('theme_Id', 3);
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
        <div style={{ width: '75px' }}>
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
        </div>

        <p className={styles.raibowText}>B</p>

        <div className={styles.buttonLogOut}>
          {userData ? (
            <Button style={btnStyle} variant="contained" onClick={() => handleLogOut()}>
              Out
            </Button>
          ) : (
            <NavLink style={btnStyle} to={links.LoginPage()}>
              Log In
            </NavLink>
          )}
        </div>
      </div>
      {openSideBar && (
        <>
          <div
            className={clsx(
              currentTheme == '1' && [styles.sideBarWrapperOpen, styles.sideBarWrapperOpenDarkTheme],
              currentTheme == '2' && [styles.sideBarWrapperOpen, styles.sideBarWrapperOpenLightTheme],
              currentTheme == '3' && [styles.sideBarWrapperOpen, styles.sideBarWrapperOpenClassicTheme],
            )}
          >
            {userData && userData?.role === RolesEnum.Admin && (
              <div className={styles.buttonWrapper}>
                <div className={styles.createBtn}>
                  <Button
                    style={btnStyle}
                    className={styles.createBtn}
                    onClick={() => setOpenCreatePostDialog(true)}
                    variant="contained"
                  >
                    Create Post
                  </Button>
                </div>
              </div>
            )}
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

            <SidebarNavItem className={styles.linkStyle} route={links.SettingsPage()}>
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

            {userData && userData?.role === RolesEnum.Admin && (
              <SidebarNavItem className={styles.linkStyle} route={links.ActivityLayout({ id: userData?._id })}>
                <div className={styles.iconWrapper}>
                  <ActivityIcon
                    className={clsx(
                      currentTheme == '1' && [styles.sideBarIcon, styles.sideBarActiveIconDarkTheme],
                      currentTheme == '2' && [styles.sideBarIcon, styles.sideBarActiveIconLightTheme],
                      currentTheme == '3' && [styles.sideBarIcon, styles.sideBarActiveIconClassicTheme],
                    )}
                  />
                  <p
                    className={clsx(
                      currentTheme == '1' && [styles.sidebarText, styles.sidebarTextDarkTheme],
                      currentTheme == '2' && [styles.sidebarText, styles.sidebarTextLightTheme],
                      currentTheme == '3' && [styles.sidebarText, styles.sidebarTextClassicTheme],
                    )}
                  >
                    Activity
                  </p>
                </div>
              </SidebarNavItem>
            )}

            {userData && (
              <SidebarNavItem className={styles.linkStyle} route={links.ClientAccount({ id: userData?._id })}>
                <div className={styles.iconWrapper}>
                  <UserIcon
                    className={clsx(
                      currentTheme == '1' && [styles.sideBarIcon, styles.sideBarActiveIconDarkTheme],
                      currentTheme == '2' && [styles.sideBarIcon, styles.sideBarActiveIconLightTheme],
                      currentTheme == '3' && [styles.sideBarIcon, styles.sideBarActiveIconClassicTheme],
                    )}
                  />
                  <p
                    className={clsx(
                      currentTheme == '1' && [styles.sidebarText, styles.sidebarTextDarkTheme],
                      currentTheme == '2' && [styles.sidebarText, styles.sidebarTextLightTheme],
                      currentTheme == '3' && [styles.sidebarText, styles.sidebarTextClassicTheme],
                    )}
                  >
                    My Posts
                  </p>
                </div>
              </SidebarNavItem>
            )}

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
          <CustomDialog
            open={openCreatePostDialog}
            header="Create your post"
            // icon={<PlusIcon />}
            onClose={handleCloseSelectedDialog}
          >
            <CreatePostForm
              submitButtonTitle="Create Post"
              onSubmit={handleCreatePost}
              close={handleCloseSelectedDialog}
            />
          </CustomDialog>
        </>
      )}
    </>
  );
};

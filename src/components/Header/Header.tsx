import React, { useState, FC } from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

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
import { CustomDialog } from '../Dialog';
import { CreatePostForm } from '../CreatePostForm';
import { useAuth } from '../../context';
import { ThemesEnums } from '../../enums';
import { useTheme } from '../../context';

import styles from './Header.module.scss';
import axios from 'axios';

const Themes = [
  { id: ThemesEnums.DarkTheme, name: 'Темна' },
  { id: ThemesEnums.LightTheme, name: 'Світла' },
  { id: ThemesEnums.ClassicTheme, name: 'Оригінальна' },
];

interface ThemeInterface {
  id: ThemesEnums;
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

export const Header: FC<HeaderInterface> = ({ handleNeedRefetch }) => {
  const history = useHistory();
  const { userData, logout } = useAuth();
  const { theme, setClassic, setDark, setLight } = useTheme();

  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [isThemeOpen, setIsThemeOpen] = useState<boolean>(false);

  const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false);

  history.listen(() => {
    setOpenSideBar(false);
  });

  const handleSideBarClick = () => {
    setOpenSideBar(!openSideBar);
  };

  // eslint-disable-next-line
  const handleCreatePost = async (value: any) => {
    const formData = new FormData();
    formData.append('file', value.file);
    formData.append('upload_preset', 'vm30xf2h');

    if (value.title && value.text) {
      // const uploadImg = await fetch('https://api.cloudinary.com/v1_1/dp0ftqcbc/image/upload', {
      //   method: 'POST',
      //   body: formData,
      // }).then((req) => req.json());
      const uploadImg = await axios
        .request({
          url: 'https://api.cloudinary.com/v1_1/dp0ftqcbc/image/upload',
          method: 'POST',
          data: formData,
        })
        .then((res) => res.data);

      if (uploadImg.secure_url) {
        const newPost = {
          title: value.title,
          text: value.text,
          picture: uploadImg.secure_url,
          userID: userData?._id,
          userName: userData?.name,
          photoPublicId: uploadImg?.public_id,
        };
        axios
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
    }
  };

  const handleLogOut = () => {
    logout();
    history.push('/login');
  };

  const handleCloseSelectedDialog = () => setOpenCreatePostDialog(false);

  return (
    <>
      <div className={styles.wrapper}>
        <div style={{ width: '75px' }}>
          {openSideBar ? (
            <CloseIcon className={styles.menuIcon} onClick={handleSideBarClick} />
          ) : (
            <MenuIcon className={styles.menuIcon} onClick={handleSideBarClick} />
          )}
        </div>

        <p className={styles.raibowText}>FS</p>

        <div className={styles.buttonLogOut}>
          {userData ? (
            <Button style={btnStyle} variant="contained" onClick={() => handleLogOut()}>
              Вихід
            </Button>
          ) : (
            <NavLink style={btnStyle} to={links.LoginPage()}>
              Вхід
            </NavLink>
          )}
        </div>
      </div>
      {openSideBar && (
        <>
          <div className={styles.sideBarWrapperOpen}>
            {userData && userData?.role === RolesEnum.Admin && (
              <div className={styles.buttonWrapper}>
                <div className={styles.createBtn}>
                  <Button
                    style={btnStyle}
                    className={styles.createBtn}
                    onClick={() => setOpenCreatePostDialog(true)}
                    variant="contained"
                  >
                    Створити пост
                  </Button>
                </div>
              </div>
            )}
            <SidebarNavItem className={styles.linkStyle} route={links.PostsLayout()}>
              <div className={styles.iconWrapper}>
                <HomeIcon className={styles.sideBarIcon} />
                <p className={styles.sidebarText}>Стрічка</p>
              </div>
            </SidebarNavItem>

            <SidebarNavItem className={styles.linkStyle} route={links.SettingsPage()}>
              <div className={styles.iconWrapper}>
                <SettingsIcon className={styles.sideBarIcon} />
                <p className={styles.sidebarText}>Налаштування</p>
              </div>
            </SidebarNavItem>

            {userData && userData?.role === RolesEnum.Admin && (
              <SidebarNavItem className={styles.linkStyle} route={links.ActivityLayout({ id: userData?._id })}>
                <div className={styles.iconWrapper}>
                  <ActivityIcon className={styles.sideBarIcon} />
                  <p className={styles.sidebarText}>Активність</p>
                </div>
              </SidebarNavItem>
            )}

            {userData && (
              <SidebarNavItem className={styles.linkStyle} route={links.ClientAccount({ id: userData._id })}>
                <div className={styles.iconWrapper}>
                  <UserIcon className={styles.sideBarIcon} />
                  <p className={styles.sidebarText}>Мої пости</p>
                </div>
              </SidebarNavItem>
            )}

            <div className={styles.iconWrapper}>
              <CustomizingIcon className={styles.sideBarIcon} />

              <div className={styles.themeBlock}>
                <p className={styles.sidebarText} onClick={() => setIsThemeOpen(!isThemeOpen)}>
                  Тема
                </p>
                {isThemeOpen && (
                  <div className={styles.themes}>
                    {Themes.map((themeEnum: ThemeInterface) => (
                      <div
                        key={themeEnum.id}
                        onClick={() => {
                          themeEnum.id == '1' && setDark(themeEnum);
                          themeEnum.id == '2' && setLight(themeEnum);
                          themeEnum.id == '3' && setClassic(themeEnum);
                        }}
                        className={styles.themeItem}
                      >
                        {themeEnum.name}
                        {theme == themeEnum?.id.toString() && <ChoosenIcon className={styles.themeIcon} />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <CustomDialog
            open={openCreatePostDialog}
            header="Створи свій пост"
            // icon={<PlusIcon />}
            helperText="Всі поля обов`зкові!"
            onClose={handleCloseSelectedDialog}
          >
            <CreatePostForm
              submitButtonTitle="Створити"
              onSubmit={handleCreatePost}
              close={handleCloseSelectedDialog}
            />
          </CustomDialog>
        </>
      )}
    </>
  );
};

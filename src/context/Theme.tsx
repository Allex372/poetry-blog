import React, { useLayoutEffect, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';

import { localStorageManager } from '../services';
import { ThemesEnums } from '../enums';

type ThemeType = {
  theme: ThemesEnums;
  setLight: (newTheme: ThemeInterface) => void;
  setDark: (newTheme: ThemeInterface) => void;
  setClassic: (newTheme: ThemeInterface) => void;
};

interface ThemeInterface {
  id: ThemesEnums;
  name: string;
}

const Context = createContext<ThemeType>({} as ThemeType);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemesEnums>(ThemesEnums.ClassicTheme);

  useEffect(() => {
    const localStorageTheme = localStorageManager.getItem('theme_Id');
    if (localStorageTheme === null) {
      localStorageManager.setItem('theme_Id', ThemesEnums.ClassicTheme);
      setTheme(ThemesEnums.ClassicTheme);
    } else {
      setTheme(localStorageTheme as ThemesEnums);
    }
    handleGetTheme();
  }, []);

  const handleGetTheme = () => {
    const localStorageTheme = localStorageManager.getItem('theme_Id');
    if (!localStorageTheme) {
      setTheme(ThemesEnums.ClassicTheme);
      localStorageManager.setItem('theme_Id', ThemesEnums.ClassicTheme);
    }
  };

  const handleSetTheme = (newTheme: ThemeInterface) => {
    localStorageManager.setItem('theme_Id', newTheme.id);
    setTheme(newTheme.id);
    handleGetTheme();
  };

  const setLight = (newTheme: ThemeInterface) => {
    handleSetTheme(newTheme);
  };
  const setDark = (newTheme: ThemeInterface) => {
    handleSetTheme(newTheme);
  };
  const setClassic = (newTheme: ThemeInterface) => {
    handleSetTheme(newTheme);
  };

  useLayoutEffect(() => {
    document.documentElement.setAttribute('theme_Id', theme);
  }, [theme]);
  return <Context.Provider value={{ theme, setClassic, setDark, setLight }}>{children}</Context.Provider>;
};

export default ThemeProvider;

export const useTheme = () => useContext(Context);

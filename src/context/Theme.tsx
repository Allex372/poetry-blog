import React, { useLayoutEffect, useState, useContext, useEffect } from 'react';
import { createContext } from 'react';

import { localStorageManager } from '../services';
import { ThemesEnums } from '../enums';

type ThemeType = {
  theme: ThemesEnums;
  setTheme: React.Dispatch<React.SetStateAction<ThemesEnums>>;
};

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
  }, []);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('theme_Id', theme);
  }, [theme]);
  return <Context.Provider value={{ theme, setTheme }}>{children}</Context.Provider>;
};

export default ThemeProvider;

export const useTheme = () => useContext(Context);

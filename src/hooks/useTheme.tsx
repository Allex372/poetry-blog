import { useLayoutEffect, useState } from 'react';
import { ThemesEnums } from '../enums';

export const useTheme = (): [ThemesEnums, (arg: ThemesEnums) => void] => {
  const [theme, setTheme] = useState<ThemesEnums>(ThemesEnums.ClassicTheme);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('theme_Id', theme);
  }, [theme]);
  return [theme, setTheme];
};

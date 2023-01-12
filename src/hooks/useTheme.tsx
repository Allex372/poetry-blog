import { useLayoutEffect, useState } from 'react';
export const useTheme = () => {
  const [theme, setTheme] = useState<string | null>();

  useLayoutEffect(() => {
    theme && document.documentElement.setAttribute('theme_Id', theme);
  }, [theme]);
  return { theme, setTheme };
};

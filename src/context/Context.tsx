import { createContext } from 'react';

type Context = {
  currentTheme: number | string | null;
};

const initialState = {
  currentTheme: 3,
};

const Context = createContext<Context>(initialState);

export default Context;

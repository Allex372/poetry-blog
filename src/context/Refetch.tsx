import { createContext } from 'react';

type ContextRefetch = {
  isRefetch: boolean;
};

const initialRefetch = {
  isRefetch: false,
};

export const RefetchContext = createContext<ContextRefetch>(initialRefetch);

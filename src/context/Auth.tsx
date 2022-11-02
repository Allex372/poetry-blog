import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import EventEmitter from 'events';

import { localStorageManager } from '../services';
import { isValidToken } from '../utils';
import { REFRESH_TOKEN, TOKEN } from '../consts';
// import { components } from 'generated/types';
import { api, apiRoutes } from '../api';
import { HttpErrorResponse, LoginFormValues, SignUpFormValuesRequest, VerificationFormValues } from '../types';

// type AccountInfo = components['schemas']['AccountInfo'];
// type RolePermissionsDTO = components['schemas']['RolePermissionsDTO'];

export const AuthEmitter = new EventEmitter();

type LoginType = {
  success: boolean;
  token?: string;
  refreshToken?: string;
  authCode: boolean;
};

interface AuthContextInterface {
  isInitializing: boolean;
  isAuthenticated: boolean;
  //   userData: (AccountInfo & { permissions: Set<string> }) | null;
  signUp: (userData: SignUpFormValuesRequest) => Promise<void>;
  login: (userData: LoginFormValues) => Promise<LoginType>;
  //   verifyCode: (userData: VerificationFormValues) => Promise<void>;
  logout: () => void;
  //   updateAccountInfo: () => void;
  handleAuth: (token: string, refreshToken: string, rememberMe: boolean) => void;
}

const authAPI = axios.create({
  baseURL: apiRoutes.baseURL,
  headers: {
    'content-type': 'application/json',
  },
});

authAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    throw new Error(error.response.data.message);
  },
);

const signUpMutation = (userData: SignUpFormValuesRequest) =>
  api.post(apiRoutes.signUp, userData).then((res) => res.data);

const loginMutation = (userData: LoginFormValues) => authAPI.post(apiRoutes.login, userData).then((res) => res.data);

// const accountQuery = () => api.get<AccountInfo & RolePermissionsDTO>(apiRoutes.account).then((res) => res?.data);

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContextInterface;

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  //   const rememberMe = useMemo(() => !!localStorageManager.getItem(REMEMBER_ME), []);
  //   const [userData, setUserData] = useState<(AccountInfo & { permissions: Set<string> }) | null>(null);
  const [token, setAuthToken] = useState(() => {
    const tokenFromStorage = localStorageManager.getItem(TOKEN);

    if (tokenFromStorage && !isValidToken(tokenFromStorage)) {
      localStorageManager.removeItem(TOKEN);

      return '';
    }

    return tokenFromStorage || '';
  });
  const [refreshToken, setAuthRefreshToken] = useState(() => {
    const tokenFromStorage = localStorageManager.getItem(REFRESH_TOKEN);

    if (!tokenFromStorage) {
      localStorageManager.removeItem(REFRESH_TOKEN);

      return '';
    }

    return tokenFromStorage || '';
  });

  const { mutateAsync: loginRequestMutation } = useMutation('loginMutation', (values: LoginFormValues) =>
    loginMutation(values),
  );

  const { mutateAsync: signUpRequestMutation } = useMutation('signUpMutation', (values: SignUpFormValuesRequest) =>
    signUpMutation(values),
  );

  //   const { data: accountInfo, refetch } = useQuery('accountQuery', () => accountQuery(), {
  //     enabled: false,
  //   });

  const signUp = async (userData: SignUpFormValuesRequest) => {
    try {
      await signUpRequestMutation(userData);
    } catch (e) {
      throw new Error((e as HttpErrorResponse).message);
    }
  };

  const login = async (userData: LoginFormValues) => {
    try {
      const data = await loginRequestMutation(userData);
      const { token, refreshToken } = data;

      token && refreshToken && setToken(token, refreshToken);

      return data;
    } catch (e) {
      throw new Error((e as HttpErrorResponse).message);
    }
  };

  const resetToken = async () => {
    localStorageManager.removeItem(TOKEN);
    localStorageManager.removeItem(REFRESH_TOKEN);
  };

  const setToken = (token: string, refreshToken: string) => {
    const validated = isValidToken(token);

    if (validated) {
      localStorageManager.setItem<typeof token>(TOKEN, token);
      localStorageManager.setItem<typeof refreshToken>(REFRESH_TOKEN, refreshToken);
      //   rememberMe && localStorageManager.setItem(REMEMBER_ME, rememberMe);
      setAuthToken(token);
      setAuthRefreshToken(refreshToken);
    }
  };

  const handleAuth = (token: string, refreshToken: string) => {
    setToken(token, refreshToken);
  };

  const logout = () => {
    resetToken();
    setAuthToken('');
    setAuthRefreshToken('');
  };

  AuthEmitter.on('interceptorError', logout);

  useEffect(() => {
    token && refreshToken ? handleAuth(token, refreshToken) : logout();
  }, []);

  useEffect(() => {
    token && refreshToken;
  }, [token, refreshToken]);

  //   useEffect(() => {
  //     if (accountInfo) {
  //       const account = { ...accountInfo, permissions: new Set(accountInfo?.permissions) };
  //       setUserData(account);
  //     }
  //   }, [accountInfo]);

  //   console.log('token,', token, refreshToken);

  const isInitializing = !!token;

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        isInitializing,
        isAuthenticated,
        // userData,
        // updateAccountInfo: refetch,
        // verifyCode,
        signUp,
        login,
        handleAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

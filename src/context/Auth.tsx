import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import EventEmitter from 'events';

import { localStorageManager } from '../services';
import { isValidToken } from '../utils';
import { REFRESH_TOKEN, TOKEN } from '../consts';
// import { components } from 'generated/types';
import { api, apiRoutes } from '../api';
import { HttpErrorResponse, LoginFormValues, SignUpFormValuesRequest } from '../types';

// type AccountInfo = components['schemas']['AccountInfo'];
// type RolePermissionsDTO = components['schemas']['RolePermissionsDTO'];

export const AuthEmitter = new EventEmitter();

type LoginType = {
  success: boolean;
  access_token?: string;
  refresh_token?: string;
  authCode: boolean;
};

interface UserDataInterface {
  createdAt: string;
  email: string;
  id: string;
  password: string;
  role: string;
  updatedAr: string;
  _id: string;
}

interface AuthContextInterface {
  isInitializing: boolean;
  isAuthenticated: boolean;
  userData: UserDataInterface | null;
  signUp: (userData: SignUpFormValuesRequest) => Promise<void>;
  login: (userData: LoginFormValues) => Promise<LoginType>;
  //   verifyCode: (userData: VerificationFormValues) => Promise<void>;
  logout: () => void;
  updateAccountInfo: () => void;
  handleAuth: (access_token: string, refresh_token: string, rememberMe: boolean) => void;
}

const authAPI = axios.create({
  baseURL: apiRoutes.baseURL,
  headers: {
    'Content-Type': 'application/json',
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

const accountQuery = () => api.get(apiRoutes.account).then((res) => res?.data);

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContextInterface;

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  //   const rememberMe = useMemo(() => !!localStorageManager.getItem(REMEMBER_ME), []);
  const [userData, setUserData] = useState(null);
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

  const { data: accountInfo, refetch } = useQuery('accountQuery', () => accountQuery(), {
    enabled: false,
  });

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
      const { access_token, refresh_token } = data;

      access_token && refresh_token && setToken(access_token, refresh_token);

      return data;
    } catch (e) {
      throw new Error((e as HttpErrorResponse).message);
    }
  };

  const resetToken = async () => {
    localStorageManager.removeItem(TOKEN);
    localStorageManager.removeItem(REFRESH_TOKEN);
  };

  const setToken = (access_token: string, refresh_token: string) => {
    const validated = isValidToken(access_token);

    if (validated) {
      localStorageManager.setItem<typeof access_token>(TOKEN, access_token);
      localStorageManager.setItem<typeof refresh_token>(REFRESH_TOKEN, refresh_token);
      //   rememberMe && localStorageManager.setItem(REMEMBER_ME, rememberMe);
      setAuthToken(access_token);
      setAuthRefreshToken(refresh_token);
    }
  };

  const handleAuth = (access_token: string, refresh_token: string) => {
    setToken(access_token, refresh_token);
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
    token && refreshToken && refetch();
  }, [token, refreshToken]);

  useEffect(() => {
    if (accountInfo) {
      const account = { ...accountInfo, permissions: new Set(accountInfo?.permissions) };
      setUserData(account);
    }
  }, [accountInfo]);

  //   console.log('token,', token, refreshToken);

  const isInitializing = !!token;

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        isInitializing,
        isAuthenticated,
        userData,
        updateAccountInfo: refetch,
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

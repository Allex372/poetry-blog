import axios from 'axios';

import { apiRoutes } from './routes';
import { localStorageManager } from '../services';
import { REFRESH_TOKEN, TOKEN } from '../consts';
import { isValidToken } from '../utils';
import { AuthEmitter } from '../context';

// const rememberMe = localStorage.getItem(REMEMBER_ME);

const api = axios.create({
  baseURL: apiRoutes.baseURL,
  headers: {
    'content-type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorageManager.getItem(TOKEN);

  if (config.headers) config.headers['Authorization'] = token;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      try {
        const refreshToken = localStorageManager.getItem(REFRESH_TOKEN);
        const response = await axios.post(
          `${apiRoutes.baseURL}${apiRoutes.refresh}`,
          {},
          {
            headers: {
              ['Authorization']: refreshToken,
            },
          },
        );

        console.log(response);
        if (response.status == 200) {
          const { access_token, refresh_token: newRefreshToken } = response.data;

          const validated = isValidToken(access_token);

          if (validated) {
            localStorageManager.setItem(TOKEN, access_token),
              localStorageManager.setItem(REFRESH_TOKEN, newRefreshToken);
          }

          return api(originalRequest);
        }

        if (response.status !== 200) {
          localStorageManager.removeItem(TOKEN), localStorageManager.removeItem(REFRESH_TOKEN);

          return;
        }
      } catch (err) {
        localStorageManager.removeItem(TOKEN), localStorageManager.removeItem(REFRESH_TOKEN);
        AuthEmitter.emit('interceptorError');
      }
    }

    return Promise.reject(error.response);
  },
);

export default api;

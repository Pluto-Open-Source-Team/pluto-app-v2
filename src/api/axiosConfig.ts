import { AxiosError, AxiosInstance } from 'axios';

export function setupAxiosInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      const token = globalThis.localStorage.getItem('ACCESS_TOKEN');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        throw error;
      } else if (error.request) {
        throw new Error('No response from server');
      } else {
        throw new Error('Something went wrong with request.');
      }
    },
  );
}

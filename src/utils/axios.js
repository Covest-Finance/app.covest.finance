import axios from 'axios';
import { apiConfig } from 'src/config';
import { getSession } from 'next-auth/client';
import jsonwebtoken from 'jsonwebtoken';

const axiosInstance = axios.create({
  baseURL: `${apiConfig.api_host}/baseApi`,
  timeout: 12000,
});

axiosInstance.interceptors.request.use(async (axiosReqConfig) => {
  const axiosInstanceConfig = axiosReqConfig;

  if (typeof window !== 'undefined') {
    const session = await getSession();
    if (session) {
      const { accessToken } = jsonwebtoken.decode(session?.accessToken ) ;
      delete axiosInstanceConfig.headers.common['X-Guest'];
      axiosInstanceConfig.headers.common.Authorization = `Bearer ${accessToken}`;
    }
    if (!session) {
      delete axiosInstanceConfig.headers.common.Authorization;
      axiosInstanceConfig.headers.common['X-Guest'] = 'Julian';
    }
  }
  return axiosInstanceConfig;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong'),
);

export * from 'axios';

export default axiosInstance;
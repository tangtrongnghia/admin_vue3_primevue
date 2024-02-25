import axios from 'axios';
import { cleanAuthInfo } from '../utils/helpers';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

// API Url defined in .env file
export const apiUrl = import.meta.env.VITE_API_URL;

export const apiFullPath = apiUrl + '/api';

const axiosIns = axios.create({
    baseURL: apiFullPath,
    headers: { 'Content-type': 'application/json' }
});

// ℹ️ Add response interceptor to handle 401 responsecsrfCookie
axiosIns.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status == 401) {
            cleanAuthInfo();
            window.location.href = 'auth/login';
        }

        return Promise.reject(error);
    }
);

export default axiosIns;

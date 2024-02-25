import Cookies from 'js-cookie';

export const cleanAuthInfo = () => {
    localStorage.removeItem('user');
    Cookies.remove('is_logged_in', { domain: import.meta.env.VITE_SANCTUM_STATEFUL_DOMAINS });
};
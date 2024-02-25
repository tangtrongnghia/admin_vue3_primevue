import { defineStore } from 'pinia';
import { ref } from 'vue';
import Cookies from 'js-cookie';
import { login, logout, getUser, csrfCookie, forgotPassword, checkResetPassword, resetPassword } from '../apis/auth';
import { cleanAuthInfo } from '../utils/helpers';

export const useAuthStore = defineStore('authStore', () => {
    const getUserFromLocalStorage = () => {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    };

    const user = ref(getUserFromLocalStorage() || {});

    const refreshUser = () => {
        user.value = getUserFromLocalStorage() || {};
    };

    const handleLogin = async (credentials) => {
        try {
            if (!Cookies.get('XSRF-TOKEN')) {
                await csrfCookie();
            }

            const { data, status } = await login(credentials);

            if (status) {
                localStorage.setItem('user', JSON.stringify(data.user));
                refreshUser();
            } else {
                cleanAuthInfo();
            }

            return data;
        } catch (error) {
            cleanAuthInfo();
            return error;
        }
    };

    const fetchUser = async () => {
        const data = await getUser();

        return data;
    };

    const handleLogout = async () => {
        try {
            await logout();

            cleanAuthInfo();

            return true;
        } catch (e) {
            throw e;
        }
    };

    const handleForgot = async (email) => {
        const data = await forgotPassword(email);

        return data;
    };

    const checkReset = async (form) => {
        const data = await checkResetPassword(form);

        return data;
    };

    const handleReset = async (form) => {
        const data = await resetPassword(form);

        return data;
    };

    return {
        user,
        handleLogin,
        fetchUser,
        handleLogout,
        handleForgot,
        handleReset,
        checkReset
    };
});

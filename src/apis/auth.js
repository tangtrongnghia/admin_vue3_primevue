import axiosIns from './axios';
import { apiUrl } from './axios';
import { stringifyQuery } from 'vue-router';

export const csrfCookie = () => axiosIns.get(apiUrl + '/sanctum/csrf-cookie');

export const login = async (form) => {
    const { data } = await axiosIns.post('/login', form);

    return data;
};

export const logout = async () => {
    const { data } = await axiosIns.post('/logout');

    return data;
};

export const getUser = () => axiosIns.get('/user');

export const forgotPassword = async (form) => {
    const { data } = await axiosIns.post('/forgot-password', form);

    return data;
};

export const checkResetPassword = async (form) => {
    const { email, token } = form;

    const { data } = await axiosIns.get('/check-reset?' + stringifyQuery({ email, token }));

    return data;
};

export const resetPassword = async (form) => {

    const { data } = await axiosIns.post('/reset-password', form);

    return data;
};

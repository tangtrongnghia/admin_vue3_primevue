import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import Cookies from 'js-cookie';
import { cleanAuthInfo } from '../utils/helpers';

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (!to.name.startsWith('auth')) {
        redirect(next);
    } else {
        redirectNonAuthPath(next);
    }
});

const redirect = async (next) => {
    if (Cookies.get('is_logged_in')) {
        next();
    } else {
        cleanAuthInfo();
        next('/auth/login');
    }
};

const redirectNonAuthPath = async (next) => {
    if (Cookies.get('is_logged_in')) {
        cleanAuthInfo();
        next('/');
    } else {
        next();
    }
};

export default router;

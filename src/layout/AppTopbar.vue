<template>
    <div class="layout-topbar">
        <RouterLink to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <!-- <span>Giàu Thịnh</span> -->
        </RouterLink>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <div class="layout-topbar-menu-button pi-d">
            <span class="hidden sm:inline mr-2">{{ user.name }}</span>
            <button class="p-link layout-topbar-button" @click="onTopBarMenuButton()">
                <i class="pi pi-user"></i>
            </button>
        </div>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <button @click="onProfile()" class="p-link layout-topbar-button">
                <i class="pi pi-user"></i>
                <span>Thông tin tài khoản</span>
            </button>
            <button @click="onChangePassword()" class="p-link layout-topbar-button">
                <i class="pi pi-user-edit"></i>
                <span>Đổi mật khẩu</span>
            </button>
            <button @click="onLogout()" class="p-link layout-topbar-button">
                <i class="pi pi-power-off"></i>
                <span>Đăng xuất</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useIndexStore } from '@/stores/indexStore';

const { setLoading } = useIndexStore();
const { user, handleLogout, fetchUser } = useAuthStore();

const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `/layout/images/icon.svg`;
});

// const logoUrl = computed(() => {
//     return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
// });

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const onProfile = () => {
    fetchUser();
    topbarMenuActive.value = false;
    // router.push('/user/profile');
};

const onChangePassword = () => {
    topbarMenuActive.value = false;
    router.push('/user/change-password');
};

const onLogout = async () => {
    setLoading(true);
    topbarMenuActive.value = false;

    try {
        await handleLogout();
        setLoading(false);
        router.push('/auth/login');
    } catch (error) {
        setLoading(false);
        alert('Có lỗi xảy ra, vui lòng thử lại sau!');
    }
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(
        sidebarEl.isSameNode(event.target) ||
        sidebarEl.contains(event.target) ||
        topbarEl.isSameNode(event.target) ||
        topbarEl.contains(event.target)
    );
};
</script>

<template>
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
    >
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-10rem flex-shrink-0" />
            <div
                style="
                    border-radius: 56px;
                    padding: 0.3rem;
                    background: linear-gradient(
                        180deg,
                        var(--primary-color) 10%,
                        rgba(33, 150, 243, 0) 30%
                    );
                "
                @keypress.enter="submitLogin"
            >
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <!-- <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" /> -->
                        <div class="text-900 text-3xl font-medium mb-3">
                            Chào mừng bạn đến trang quản trị
                        </div>
                        <span class="text-600 font-medium">Đăng nhập để tiếp tục!</span>
                    </div>

                    <Message v-show="error" severity="error" :life="4000" @close="error = ''">{{
                        error
                    }}</Message>
                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2"
                            >Email</label
                        >
                        <InputText
                            :disabled="isLoading"
                            id="email1"
                            type="email"
                            placeholder="Nhập địa chỉ email"
                            class="w-full md:w-30rem mb-5"
                            style="padding: 1rem"
                            v-model="form.email"
                            autofocus
                        />
                        <label for="password1" class="block text-900 font-medium text-xl mb-2"
                            >Mật khẩu</label
                        >
                        <Password
                            id="password1"
                            v-model="form.password"
                            placeholder="Nhập mật khẩu"
                            :toggleMask="true"
                            class="w-full mb-3"
                            inputClass="w-full"
                            :disabled="isLoading"
                            :feedback="false"
                            :inputStyle="{ padding: '1rem' }"
                        >
                        </Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox
                                    v-model="form.remember_me"
                                    :disabled="isLoading"
                                    id="rememberme1"
                                    binary
                                    class="mr-2"
                                >
                                </Checkbox>
                                <label for="rememberme1">Ghi nhớ</label>
                            </div>
                            <RouterLink
                                to="/auth/forgot-password"
                                class="font-medium no-underline ml-2 text-right cursor-pointer"
                                :class="{ disabled: isLoading }"
                                style="color: var(--primary-color)"
                                >Quên mật khẩu?</RouterLink
                            >
                        </div>
                        <Button
                            :loading="isLoading"
                            label="Đăng nhập"
                            class="w-full p-3 text-xl"
                            @click="submitLogin"
                        >
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>

<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { useAuthStore } from '../../../stores/authStore.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const { handleLogin } = useAuthStore();

const { layoutConfig } = useLayout();

const form = ref({
    email: '',
    password: '',
    remember_me: false
});

const isLoading = ref(false);
const error = ref('');

const logoUrl = computed(() => {
    return `/layout/images/icon.svg`;
});
// const logoUrl = computed(() => {
//     return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
// });

// Methods
const submitLogin = async () => {
    try {
        error.value = '';

        if (!isValidEmail(form.value.email)) {
            error.value = 'Email không hợp lệ!';
            return;
        }

        isLoading.value = true;

        const data = await handleLogin({ ...form.value });

        if (data?.user) {
            router.push('/');
        } else {
            error.value =
                data?.response?.data?.message || 'Xảy ra lỗi bất thường, vui lòng thử lại sau!';
        }
    } catch (e) {
        error.value = 'Xảy ra lỗi bất thường, vui lòng thử lại sau!';
    }

    isLoading.value = false;
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
</script>

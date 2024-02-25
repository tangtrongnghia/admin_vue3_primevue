<template>
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
    >
        <div class="flex flex-column align-items-center justify-content-center">
            <img src="/layout/images/icon.svg" alt="Sakai logo" class="mb-5 w-10rem flex-shrink-0" />
            <div
                style="
                    border-radius: 56px;
                    padding: 0.3rem;
                    background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
                "
                @keypress.enter="requestResetPassword"
            >
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <template v-if="isSuccess">
                        <div class="text-center mb-5">
                            <span
                                >Một email đã được gửi đến <strong>{{ email }}</strong
                                >. Vui lòng kiểm tra hộp thư của bạn.</span
                            >
                        </div>
                        <div class="text-center">
                            <Button
                                label="Về trang đăng nhập"
                                class="p-3 text-xl"
                                @click.prevent="router.push('/auth/login')"
                            >
                            </Button>
                        </div>
                    </template>
                    <template v-else>
                        <div class="text-center mb-5">
                            <div class="text-900 text-3xl font-medium mb-3">Quên mật khẩu</div>
                            <span class="text-600 font-medium">Vui lòng nhập địa chỉ email của bạn!</span>
                        </div>
                        <Message v-show="error" severity="error" :life="4000" @close="error = ''">{{ error }}</Message>
                        <div>
                            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText
                                :disabled="isLoading"
                                type="email"
                                placeholder="Email address"
                                class="w-full md:w-30rem mb-5"
                                style="padding: 1rem"
                                v-model="email"
                                autofocus
                            />
                            <div class="flex align-items-center justify-content-center mb-5 gap-5">
                                <RouterLink
                                    to="/auth/login"
                                    class="font-medium no-underline ml-2 text-right cursor-pointer"
                                    :class="{ disabled: isLoading }"
                                    style="color: var(--primary-color)"
                                    >Quay lại đăng nhập</RouterLink
                                >
                            </div>
                            <Button
                                :loading="isLoading"
                                label="Gửi yêu cầu"
                                class="w-full p-3 text-xl"
                                @click="requestResetPassword"
                            >
                            </Button>
                        </div>
                    </template>
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
import { ref } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { useAuthStore } from '../../../stores/authStore.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const { handleForgot } = useAuthStore();

const isSuccess = ref(false);
const email = ref('');
const isLoading = ref(false);
const error = ref('');

const requestResetPassword = async () => {
    try {
        error.value = '';

        if (!isValidEmail(email.value)) {
            error.value = 'Email không hợp lệ!';
            return;
        }

        isLoading.value = true;
        await handleForgot({ email: email.value });
        isSuccess.value = true;
    } catch (e) {
        error.value =
            e.response?.status == 400 ? 'Địa chỉ email tồn tại!' : 'Xảy ra lỗi bất thường, vui lòng thử lại sau!';
    }

    isLoading.value = false;
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
</script>

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
                @keypress.enter="submitReset"
            >
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <template v-if="status == STATUS_CHECK_ERROR">
                        <div class="text-center mb-5">
                            <span class="text-900 font-medium"
                                >Yêu cầu đặt lại mật khẩu đã hết hạn hoặc không tồn tại!</span
                            >
                        </div>
                        <Button
                            label="Về trang đăng nhập"
                            class="w-full p-3 text-xl"
                            @click="router.push('/auth/login')"
                        >
                        </Button>
                    </template>

                    <template v-else-if="status == STATUS_CHECK_OK">
                        <div class="text-center mb-5">
                            <div class="text-900 text-3xl font-medium mb-3">Đặt lại mật khẩu</div>
                            <span class="text-900 font-medium">{{ form.email }}</span>
                        </div>

                        <Message v-show="error" severity="error" :life="4000" @close="error = ''">{{
                            error
                        }}</Message>
                        <div>
                            <label for="email1" class="block text-900 text-xl font-medium mb-2"
                                >Mật khẩu mới</label
                            >
                            <Password
                                weakLabel="Yếu"
                                mediumLabel="Trung bình"
                                strongLabel="Mạnh"
                                v-model="form.password"
                                placeholder="Nhập mật khẩu mới"
                                :toggleMask="true"
                                class="w-full md:w-25rem mb-3"
                                inputClass="w-full"
                                :disabled="isLoading"
                                :inputStyle="{ padding: '1rem' }"
                                :strongRegex="STRONG_PASSWORD_PATTERN"
                            >
                                <template #footer>
                                    <Divider />
                                    <p class="mt-2">Gợi ý</p>
                                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                        <li>Ít nhất một chữ cái hoa và thường</li>
                                        <li>Ít nhất một số</li>
                                        <li>Ít nhất một ký tự đặc biệt</li>
                                        <li>Ít nhất 8 ký tự</li>
                                    </ul>
                                </template>
                            </Password>
                            <label for="password1" class="block text-900 font-medium text-xl mb-2"
                                >Xác nhận mật khẩu</label
                            >
                            <Password
                                id="password1"
                                v-model="form.password_confirmation"
                                placeholder="Nhập lại mật khẩu"
                                :toggleMask="true"
                                class="w-full mb-3"
                                inputClass="w-full"
                                :disabled="isLoading"
                                :inputStyle="{ padding: '1rem' }"
                            >
                                <template #content>
                                    <div>
                                        <span v-if="form.password_confirmation.length == 0"
                                            >Nhập lại password</span
                                        >
                                        <span
                                            v-else-if="form.password_confirmation != form.password"
                                            class="text-red-500"
                                            >Mật khẩu không khớp</span
                                        >
                                        <span v-else class="text-teal-400">OK</span>
                                    </div>
                                </template>
                            </Password>

                            <div class="flex align-items-center justify-content-between mb-5 gap-5">
                                <RouterLink
                                    to="/auth/login"
                                    class="font-medium no-underline ml-2 text-right cursor-pointer"
                                    :class="{ disabled: isLoading }"
                                    style="color: var(--primary-color)"
                                    >Về trang đăng nhập
                                </RouterLink>
                            </div>
                            <Button
                                :loading="isLoading"
                                label="Đăng nhập"
                                class="w-full p-3 text-xl"
                                @click="submitReset"
                            >
                            </Button>
                        </div>
                    </template>

                    <template v-else-if="status == STATUS_SUCCESS">
                        <div class="text-center mb-5">
                            <span class="text-900 font-medium">Đặt lại mật khẩu thành công!</span>
                        </div>
                        <Button
                            label="Về trang đăng nhập"
                            class="w-full p-3 text-xl"
                            @click="router.push('/auth/login')"
                        >
                        </Button>
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
import { ref, computed, onBeforeMount } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { useAuthStore } from '../../../stores/authStore.js';
import { useRouter, useRoute } from 'vue-router';
import { useIndexStore } from '@/stores/indexStore';

const router = useRouter();
const route = useRoute();

const { handleReset, checkReset } = useAuthStore();
const { setLoading } = useIndexStore();

const STATUS_CHECKING = 0;
const STATUS_CHECK_ERROR = 1;
const STATUS_CHECK_OK = 2;
const STATUS_SUCCESS = 3;
const status = ref(STATUS_CHECKING);
const STRONG_PASSWORD_PATTERN = `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{8,})`;

const form = ref({
    token: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const isLoading = ref(false);
const error = ref('');

const logoUrl = computed(() => {
    return `/layout/images/icon.svg`;
});

// Methods
const submitReset = async () => {
    try {
        error.value = '';

        if (form.value.password.length == 0 || form.value.password.length == 0) {
            error.value = 'Vui lòng nhập mật khẩu!';
            return;
        }

        if (!new RegExp(STRONG_PASSWORD_PATTERN).test(form.value.password)) {
            error.value = 'Mật khẩu chưa đủ mạnh!';
            return;
        }

        if (form.value.password !== form.value.password_confirmation) {
            error.value = 'Mật khẩu không khớp!';
            return;
        }

        isLoading.value = true;

        await handleReset({ ...form.value });

        status.value = STATUS_SUCCESS;
    } catch (e) {
        error.value = 'Xảy ra lỗi bất thường, vui lòng thử lại sau!';
    }

    isLoading.value = false;
};

const checkTokenReset = async () => {
    try {
        await checkReset({ ...form.value });

        status.value = STATUS_CHECK_OK;
    } catch (error) {
        status.value = STATUS_CHECK_ERROR;
    }
};

onBeforeMount(async () => {
    setLoading(true);

    form.value.email = route.query.email;
    form.value.token = route.query.token;

    await checkTokenReset();

    setLoading(false);
});
</script>

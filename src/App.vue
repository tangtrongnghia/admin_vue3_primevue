<template>
    <div v-show="loading" class="preloader">
        <div class="preloader-content"></div>
    </div>
    <RouterView />
</template>

<style scoped></style>

<script setup>
import { useAuthStore } from './stores/authStore';
import { useIndexStore } from '@/stores/indexStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const indexStore = useIndexStore();
const { loading } = storeToRefs(indexStore);
const { setLoading } = indexStore;
useAuthStore();

onMounted(() => {
    setLoading(false);
});
</script>

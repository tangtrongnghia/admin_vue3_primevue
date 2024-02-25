// store/index.js
import { defineStore } from 'pinia';

export const useIndexStore = defineStore('indexStore', {
    state: () => ({
        isLoading: false
    }),
    actions: {
        setLoading(isLoading) {
            this.isLoading = isLoading;
        }
    },
    getters: {
        loading: (state) => state.isLoading
    }
});
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '@/fonts';
import setupPrimeVue from '@/primevue-setup';
import BlockViewer from '@/components/BlockViewer.vue';
import '@/assets/styles.scss';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);
setupPrimeVue(app);

app.use(router);
app.use(createPinia());

app.component('FaIcon', FontAwesomeIcon);
app.component('BlockViewer', BlockViewer);

app.mount('#app');

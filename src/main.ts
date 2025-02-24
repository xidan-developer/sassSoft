import './assets/style.css';
import './assets/main.sass';


import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import router from './router';
import Aura from '@primeuix/themes/aura';

import App from '@/views/App.vue';


const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.use(createPinia());
app.use(router);

app.mount('#app');

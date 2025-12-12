import './assets/app.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { useAnalytics } from './composables/useAnalytics';

const app = createApp(App);

app.use(router);

// Initialize analytics
useAnalytics();

app.mount('#app');


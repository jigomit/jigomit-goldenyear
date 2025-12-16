import './assets/app.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

// Defer analytics initialization to not block rendering
if (typeof window !== 'undefined') {
    const loadAnalytics = () => {
        import('./composables/useAnalytics').then(({ useAnalytics }) => {
            useAnalytics();
        });
    };
    
    // Use requestIdleCallback if available, otherwise use setTimeout
    if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(loadAnalytics, { timeout: 2000 });
    } else {
        setTimeout(loadAnalytics, 2000);
    }
}

app.mount('#app');


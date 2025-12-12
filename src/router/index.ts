import { createRouter, createWebHistory } from 'vue-router';
import { trackPageView } from '@/composables/useAnalytics';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/pages/Home.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/About.vue'),
    },
    {
        path: '/services',
        name: 'services',
        component: () => import('@/pages/Services.vue'),
    },
    {
        path: '/gallery',
        name: 'gallery',
        component: () => import('@/pages/Gallery.vue'),
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('@/pages/Contact.vue'),
    },
    {
        path: '/donate',
        name: 'donate',
        component: () => import('@/pages/Donate.vue'),
    },
    {
        path: '/blog',
        name: 'blog',
        component: () => import('@/pages/Blog.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

// Track page views for analytics
router.afterEach((to) => {
    trackPageView(to.path, to.meta.title as string);
});

export default router;


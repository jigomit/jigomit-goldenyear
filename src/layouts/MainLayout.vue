<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
];

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20;
};

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

const currentYear = new Date().getFullYear();

// Newsletter subscription
const newsletterEmail = ref('');
const newsletterError = ref('');
const newsletterSuccess = ref(false);
const isSubmitting = ref(false);

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const handleNewsletterSubmit = async () => {
    newsletterError.value = '';
    newsletterSuccess.value = false;

    // Validation
    if (!newsletterEmail.value.trim()) {
        newsletterError.value = 'Please enter your email address';
        return;
    }

    if (!validateEmail(newsletterEmail.value)) {
        newsletterError.value = 'Please enter a valid email address';
        return;
    }

    // Simulate submission
    isSubmitting.value = true;

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    isSubmitting.value = false;
    newsletterSuccess.value = true;
    newsletterEmail.value = '';

    // Reset success message after 5 seconds
    setTimeout(() => {
        newsletterSuccess.value = false;
    }, 5000);
};
</script>

<template>
    <div class="min-h-screen flex flex-col bg-[var(--color-warm-white)]">
        <!-- Header -->
        <header
            :class="[
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
                isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg'
                    : 'bg-transparent'
            ]"
        >
            <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <nav class="flex items-center justify-between transition-all duration-500 ease-in-out" :class="isScrolled ? 'py-2' : 'py-4'">
                    <!-- Logo -->
                    <RouterLink to="/" class="flex items-center gap-2 sm:gap-3 group shrink-0">
                        <div class="transition-transform duration-300 ease-in-out group-hover:scale-105">
                            <img
                                src="/oldage-logo.png"
                                alt="Golden Years Care & Comfort Home"
                                class="h-[4.8rem] w-auto object-contain transition-all duration-500"
                                :class="isScrolled ? 'h-[4.2rem]' : ''"
                            />
                        </div>
                        <div class="block transition-opacity duration-300">
                            <span class="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[var(--color-primary)] transition-colors duration-200 group-hover:text-[var(--color-primary-light)]">Golden Years</span>
                            <span class="block text-[9px] sm:text-[10px] md:text-xs text-[var(--color-soft-gray)] transition-colors duration-200">Care & Comfort Home</span>
                        </div>
                    </RouterLink>

                    <!-- Desktop Navigation -->
                    <div class="hidden lg:flex items-center gap-1">
                        <RouterLink
                            v-for="(link, index) in navLinks"
                            :key="link.href"
                            :to="link.href"
                            class="px-3 xl:px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-in-out relative overflow-hidden group"
                            :class="route.path === link.href
                                ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
                                : 'text-[var(--color-dark-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10'"
                            :style="{ animationDelay: `${index * 50}ms` }"
                        >
                            <span class="relative z-10">{{ link.name }}</span>
                            <span
                                class="absolute inset-0 bg-[var(--color-primary)]/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"
                            ></span>
                        </RouterLink>
                    </div>

                    <!-- CTA Button & Mobile Toggle -->
                    <div class="flex items-center gap-2 sm:gap-3 lg:gap-4">
                        <!-- Donate Button - Desktop Only -->
                        <RouterLink
                            to="/donate"
                            class="hidden lg:inline-flex items-center gap-2 px-4 xl:px-6 py-2 xl:py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span class="hidden xl:inline">Donate Now</span>
                            <span class="xl:hidden">Donate</span>
                        </RouterLink>

                        <!-- Mobile Menu Button -->
                        <button
                            @click="toggleMobileMenu"
                            class="lg:hidden p-2 rounded-lg hover:bg-gray-100/80 transition-all duration-300 ease-in-out"
                            :class="isMobileMenuOpen ? 'bg-gray-100' : ''"
                            aria-label="Toggle menu"
                        >
                            <Transition name="menu-icon" mode="out-in">
                                <svg
                                    v-if="!isMobileMenuOpen"
                                    key="menu"
                                    class="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-dark-text)] transition-all duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg
                                    v-else
                                    key="close"
                                    class="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-dark-text)] transition-all duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Transition>
                        </button>
                    </div>
                </nav>
            </div>

            <!-- Mobile Menu -->
            <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 -translate-y-4 max-h-0"
                enter-to-class="opacity-100 translate-y-0 max-h-[500px]"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 translate-y-0 max-h-[500px]"
                leave-to-class="opacity-0 -translate-y-4 max-h-0"
            >
                <div
                    v-if="isMobileMenuOpen"
                    class="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-lg shadow-xl border-t border-gray-100 overflow-hidden"
                >
                    <div class="px-3 sm:px-4 py-3 sm:py-4 space-y-1">
                        <RouterLink
                            v-for="(link, index) in navLinks"
                            :key="link.href"
                            :to="link.href"
                            @click="closeMobileMenu"
                            class="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-xl transition-all duration-300 ease-in-out"
                            :class="route.path === link.href
                                ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
                                : 'text-[var(--color-dark-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 active:bg-[var(--color-primary)]/10'"
                            :style="{ animationDelay: `${index * 50}ms` }"
                        >
                            <span class="w-1.5 h-1.5 rounded-full" :class="route.path === link.href ? 'bg-[var(--color-primary)]' : 'bg-gray-300'"></span>
                            {{ link.name }}
                        </RouterLink>
                        <div class="pt-2 sm:pt-3">
                            <RouterLink
                                to="/donate"
                                @click="closeMobileMenu"
                                class="flex items-center justify-center gap-2 w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-xl transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Donate Now
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </Transition>
        </header>

        <!-- Main Content -->
        <main class="flex-grow transition-all duration-500 ease-in-out pt-24" :class="isScrolled ? '!pt-20' : ''">
            <slot />
        </main>

        <!-- Footer -->
        <footer class="bg-[var(--color-primary-dark)] text-white">
            <!-- Top Wave -->
            <div class="relative -mt-1">
                <svg class="w-full h-16 text-[var(--color-primary-dark)]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" />
                </svg>
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    <!-- About Column -->
                    <div class="lg:col-span-1">
                        <div class="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 mb-6 text-center sm:text-left">
                            <div class="flex items-center justify-center shrink-0">
                                <img
                                    src="/oldage-logo.png"
                                    alt="Golden Years Care & Comfort Home"
                                    class="h-16 sm:h-[68px] md:h-[76px] w-auto object-contain"
                                />
                            </div>
                            <div class="block leading-tight">
                                <span class="text-lg sm:text-xl font-bold text-white">Golden Years</span>
                                <span class="block text-[11px] sm:text-xs text-white/80">Care & Comfort Home</span>
                            </div>
                        </div>
                        <p class="text-white/70 text-sm leading-relaxed">
                            Providing compassionate care and a loving home for our beloved seniors since 1995. Your trust is our commitment.
                        </p>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h4 class="text-lg font-semibold mb-6 text-[var(--color-secondary)]">Quick Links</h4>
                        <ul class="space-y-3">
                            <li v-for="link in navLinks" :key="link.href">
                                <RouterLink :to="link.href" class="text-white/70 hover:text-white text-sm transition-colors inline-flex items-center gap-2">
                                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    {{ link.name }}
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/blog" class="text-white/70 hover:text-white text-sm transition-colors inline-flex items-center gap-2">
                                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    Blog
                                </RouterLink>
                            </li>
                        </ul>
                    </div>

                    <!-- Contact Info -->
                    <div>
                        <h4 class="text-lg font-semibold mb-6 text-[var(--color-secondary)]">Contact Us</h4>
                        <ul class="space-y-4">
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-[var(--color-secondary)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span class="text-white/70 text-sm">123 Care Lane, Peaceful Valley, State 12345</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-[var(--color-secondary)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span class="text-white/70 text-sm">+1 (555) 123-4567</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <svg class="w-5 h-5 text-[var(--color-secondary)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span class="text-white/70 text-sm">care@goldenyears.org</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Newsletter -->
                    <div>
                        <h4 class="text-lg font-semibold mb-4 sm:mb-6 text-[var(--color-secondary)]">Stay Connected</h4>
                        <p class="text-white/70 text-sm mb-4">Subscribe to our newsletter for updates and stories.</p>

                        <!-- Success Message -->
                        <Transition
                            enter-active-class="transition-all duration-300 ease-out"
                            enter-from-class="opacity-0 scale-95"
                            enter-to-class="opacity-100 scale-100"
                            leave-active-class="transition-all duration-200 ease-in"
                            leave-from-class="opacity-100 scale-100"
                            leave-to-class="opacity-0 scale-95"
                        >
                            <div v-if="newsletterSuccess" class="mb-4 p-4 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center gap-3">
                                <svg class="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span class="text-green-300 text-sm">Thank you for subscribing!</span>
                            </div>
                        </Transition>

                        <form v-if="!newsletterSuccess" @submit.prevent="handleNewsletterSubmit" class="space-y-3">
                            <div>
                                <input
                                    v-model="newsletterEmail"
                                    type="email"
                                    placeholder="Your email address"
                                    :class="[
                                        'w-full px-4 py-3 rounded-lg bg-white/10 border text-white placeholder-white/50 text-sm focus:outline-none transition-all duration-200',
                                        newsletterError
                                            ? 'border-red-400 focus:border-red-400'
                                            : 'border-white/20 focus:border-[var(--color-secondary)]'
                                    ]"
                                    :disabled="isSubmitting"
                                />
                                <!-- Error Message -->
                                <Transition
                                    enter-active-class="transition-all duration-200 ease-out"
                                    enter-from-class="opacity-0 -translate-y-1"
                                    enter-to-class="opacity-100 translate-y-0"
                                    leave-active-class="transition-all duration-150 ease-in"
                                    leave-from-class="opacity-100 translate-y-0"
                                    leave-to-class="opacity-0 -translate-y-1"
                                >
                                    <p v-if="newsletterError" class="mt-2 text-red-400 text-xs flex items-center gap-1.5">
                                        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {{ newsletterError }}
                                    </p>
                                </Transition>
                            </div>
                            <button
                                type="submit"
                                :disabled="isSubmitting"
                                class="w-full px-4 py-3 rounded-lg bg-[var(--color-secondary)] text-[var(--color-primary-dark)] font-semibold text-sm hover:bg-[var(--color-secondary-light)] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <svg v-if="isSubmitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Social Links & Copyright -->
                <div class="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p class="text-white/60 text-sm text-center sm:text-left">
                        &copy; {{ currentYear }} Golden Years Care Home. All rights reserved. Made with love.
                    </p>
                    <div class="flex items-center gap-4">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors group" aria-label="Follow us on Twitter">
                            <svg class="w-5 h-5 text-white group-hover:text-[var(--color-primary-dark)]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors group" aria-label="Follow us on Instagram">
                            <svg class="w-5 h-5 text-white group-hover:text-[var(--color-primary-dark)]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors group" aria-label="Follow us on Facebook">
                            <svg class="w-5 h-5 text-white group-hover:text-[var(--color-primary-dark)]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

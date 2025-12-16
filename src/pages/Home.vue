<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useSeo, pageSeoConfigs, structuredDataTemplates } from '@/composables/useSeo';

// SEO Configuration for Home Page
useSeo({
    ...pageSeoConfigs.home,
    structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
            structuredDataTemplates.organization,
            structuredDataTemplates.localBusiness,
            {
                '@type': 'WebPage',
                '@id': 'https://goldenyearscare.com/',
                url: 'https://goldenyearscare.com/',
                name: 'Golden Years Care & Comfort Home | Best Senior Care Facility Near You',
                description: 'Looking for the best senior care home for your loved ones? Golden Years provides compassionate 24/7 elderly care, nursing services, memory care & assisted living.',
                isPartOf: { '@id': 'https://goldenyearscare.com/#website' },
                primaryImageOfPage: { '@id': 'https://goldenyearscare.com/#primaryimage' },
            },
        ],
    },
});

const stats = [
    { number: '500+', label: 'Happy Residents', target: 500, suffix: '+' },
    { number: '29+', label: 'Years of Care', target: 29, suffix: '+' },
    { number: '50+', label: 'Expert Staff', target: 50, suffix: '+' },
    { number: '24/7', label: 'Care Available', target: null, suffix: null }, // Special case, no animation
];

const animatedNumbers = ref<{ [key: number]: number }>({});
const hasAnimated = ref(false);

const services = [
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>`,
        title: 'Personal Care',
        description: 'Compassionate assistance with daily activities, ensuring comfort and dignity for every resident.',
    },
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>`,
        title: 'Medical Support',
        description: 'Round-the-clock medical care with qualified nurses and regular doctor visits.',
    },
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
        title: 'Social Activities',
        description: 'Engaging programs and activities that promote joy, friendship, and mental wellness.',
    },
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`,
        title: 'Comfortable Living',
        description: 'Spacious, well-furnished rooms designed for comfort, safety, and independence.',
    },
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`,
        title: 'Spiritual Care',
        description: 'Nurturing the soul with prayer, meditation, and spiritual guidance for inner peace.',
    },
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>`,
        title: 'Nutritious Meals',
        description: 'Delicious, balanced meals prepared fresh daily by our experienced kitchen team.',
    },
];

const testimonials = [
    {
        name: 'Margaret Wilson',
        relation: 'Daughter of Resident',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        quote: 'The care and love my mother receives here is beyond what we ever imagined. The staff treats her like family.',
    },
    {
        name: 'Robert Thompson',
        relation: 'Son of Resident',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        quote: 'Dad has found a new community here. He participates in activities and has made wonderful friends.',
    },
    {
        name: 'Susan Chen',
        relation: 'Granddaughter of Resident',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        quote: 'Visiting grandma here feels like coming home. The environment is warm, clean, and full of life.',
    },
];

const isVisible = ref<{ [key: string]: boolean }>({});

// Animate number counting with easing
const animateNumber = (index: number, target: number, duration: number = 2000): void => {
    if (animatedNumbers.value[index] !== undefined) return; // Already animated
    
    const startTime = Date.now();
    const start = 0;
    
    const updateNumber = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        animatedNumbers.value[index] = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            animatedNumbers.value[index] = target;
        }
    };
    
    updateNumber();
};

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isVisible.value[entry.target.id] = true;
                    
                    // Animate stats when stats section is visible
                    if (entry.target.id === 'stats-section' && !hasAnimated.value) {
                        hasAnimated.value = true;
                        stats.forEach((stat, index) => {
                            if (stat.target !== null && typeof stat.target === 'number') {
                                setTimeout(() => {
                                    animateNumber(index, stat.target, 2000);
                                }, index * 200); // Stagger animations
                            }
                        });
                    }
                }
            });
        },
        { threshold: 0.3 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
        observer.observe(el);
    });
    
    // Also observe stats section
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});
</script>

<template>
    <MainLayout>

        <!-- Hero Section -->
        <section class="relative min-h-screen flex items-center overflow-hidden">
            <!-- Background Image with Overlay -->
            <div class="absolute inset-0">
                <img
                    src="/homeback.jpg"
                    alt="Golden Years Care & Comfort Home - Best Senior Care Facility Providing 24/7 Elderly Care Services"
                    class="w-full h-full object-cover"
                    fetchpriority="high"
                    decoding="async"
                    width="1920"
                    height="1080"
                    loading="eager"
                />
                <div class="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)]/90 via-[var(--color-primary-dark)]/70 to-transparent"></div>
            </div>

            <!-- Floating Decorative Elements -->
            <div class="absolute top-1/4 right-1/4 w-64 h-64 bg-[var(--color-secondary)]/20 rounded-full blur-3xl float"></div>
            <div class="absolute bottom-1/4 right-1/3 w-48 h-48 bg-[var(--color-primary-light)]/20 rounded-full blur-3xl float" style="animation-delay: 2s;"></div>

            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div class="max-w-3xl">
                    <!-- Badge -->
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-8 fade-up">
                        <span class="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse"></span>
                         Organization Since 1995
                    </div>

                    <!-- Heading -->
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 fade-up" style="animation-delay: 0.2s;">
                        Where Every Senior
                        <span class="block text-[var(--color-secondary)]">Finds Home</span>
                    </h1>

                    <!-- Description -->
                    <p class="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl fade-up" style="animation-delay: 0.4s;">
                        Looking for the best senior care home near you? Golden Years Care & Comfort Home provides compassionate 24/7 elderly care, nursing services, memory care, and assisted living for your cherished loved ones. Schedule a tour today!
                    </p>

                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 fade-up" style="animation-delay: 0.6s;">
                        <a href="/contact" class="btn-primary group inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300">
                            Schedule a Visit
                            <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a href="/about" class="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white/20 backdrop-blur-md border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[var(--color-primary-dark)] transition-all duration-300 shadow-lg">
                            Learn more about our senior care home
                        </a>
                    </div>
                </div>
            </div>

            <!-- Scroll Indicator (hidden on mobile) -->
            <div class="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/60">
                
                <div class="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
                    <div class="w-1.5 h-3 rounded-full bg-white/60 animate-bounce"></div>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section id="stats-section" class="relative -mt-14 sm:-mt-20 z-10">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        <div
                            v-for="(stat, index) in stats"
                            :key="index"
                            class="text-center"
                        >
                            <div class="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                                <template v-if="stat.target !== null">
                                    {{ animatedNumbers[index] !== undefined ? animatedNumbers[index] : 0 }}{{ stat.suffix }}
                                </template>
                                <template v-else>
                                    {{ stat.number }}
                                </template>
                            </div>
                            <div class="text-[var(--color-soft-gray)] text-sm lg:text-base">{{ stat.label }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Preview Section -->
        <section id="about-preview" data-animate class="py-20 lg:py-32">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <!-- Image Grid -->
                    <div :class="['relative', isVisible['about-preview'] ? 'slide-in-left' : 'opacity-0']">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-4">
                                <img
                                    src="/Family.jpg"
                                    alt="Family Visiting Elderly Parent at Golden Years Senior Care Home - Compassionate Care for Aging Loved Ones"
                                    class="rounded-2xl shadow-lg w-full h-48 object-cover"
                                    loading="lazy"
                                />
                                <img
                                    src="/Lincescare.jpg"
                                    alt="Licensed Senior Care Facility - State Certified Nursing Home with Professional Elderly Care Services"
                                    class="rounded-2xl shadow-lg w-full h-64 object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div class="space-y-4 pt-8">
                                <img
                                    src="/trained.jpg"
                                    alt="Trained Medical Staff Providing 24 Hour Nursing Care for Elderly Residents at Senior Care Facility"
                                    class="rounded-2xl shadow-lg w-full h-64 object-cover"
                                    loading="lazy"
                                />
                                <img
                                    src="/emarg.jpg"
                                    alt="Emergency Medical Response Team at Golden Years Care Home - 24/7 Emergency Care for Seniors"
                                    class="rounded-2xl shadow-lg w-full h-48 object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <!-- Floating Card -->
                        
                    </div>

                    <!-- Content -->
                    <div :class="[isVisible['about-preview'] ? 'slide-in-right' : 'opacity-0']">
                        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium mb-6">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                            About Our Mission
                        </div>

                        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-dark-text)] mb-6 leading-tight">
                            A Place Where Love Meets
                            <span class="text-[var(--color-primary)]">Professional Care</span>
                        </h2>

                        <p class="text-[var(--color-soft-gray)] text-lg leading-relaxed mb-6">
                            At Golden Years Care Home, we believe every senior deserves to live with dignity, joy, and purpose. Our award-winning senior care facility provides personalized care that honors the unique needs and preferences of each resident. As a highly rated elderly care home, we offer a safe place for elderly parents to live with compassionate care for aging loved ones.
                        </p>

                        <p class="text-[var(--color-soft-gray)] text-lg leading-relaxed mb-8">
                            From morning activities to evening routines, we create a home-like atmosphere for elderly care while ensuring the highest standards of health and safety. Our licensed care facility provides 24 hour nursing care for elderly parents, making us one of the best senior care homes near you.
                        </p>

                        <!-- Features -->
                        <div class="grid sm:grid-cols-2 gap-4 mb-8">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                                    <svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span class="text-[var(--color-dark-text)] font-medium">Licensed Care Facility</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                                    <svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span class="text-[var(--color-dark-text)] font-medium">Trained Medical Staff</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                                    <svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span class="text-[var(--color-dark-text)] font-medium">Family Visiting Hours</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                                    <svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span class="text-[var(--color-dark-text)] font-medium">Emergency Response</span>
                            </div>
                        </div>

                        <a href="/about" class="btn-primary inline-flex">
                            Learn More About Our Senior Care Facility
                            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services-section" data-animate class="py-20 lg:py-32 bg-gradient-to-b from-[var(--color-warm-cream)] to-white relative">
            <!-- Top Wave -->
            <div class="absolute top-0 left-0 right-0">
                <svg class="w-full h-16 text-[var(--color-warm-white)]" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,50 C360,100 1080,0 1440,50 L1440,0 L0,0 Z" />
                </svg>
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <!-- Section Header -->
                <div class="text-center max-w-3xl mx-auto mb-16">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium mb-6">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                        Our Services
                    </div>
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-dark-text)] mb-6">
                        Comprehensive Care for
                        <span class="text-[var(--color-primary)]">Complete Wellbeing</span>
                    </h2>
                    <p class="text-[var(--color-soft-gray)] text-lg">
                        We offer a wide range of services designed to meet every need of our residents, ensuring they live their golden years with dignity and happiness.
                    </p>
                </div>

                <!-- Services Grid -->
                <div :class="['grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8', isVisible['services-section'] ? 'stagger-children' : 'opacity-0']">
                    <div
                        v-for="(service, index) in services"
                        :key="index"
                        class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 card-hover border border-gray-100"
                    >
                        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" v-html="service.icon"></div>
                        <h3 class="text-xl font-bold text-[var(--color-dark-text)] mb-3">{{ service.title }}</h3>
                        <p class="text-[var(--color-soft-gray)] leading-relaxed">{{ service.description }}</p>
                    </div>
                </div>

                <!-- CTA -->
                <div class="text-center mt-12">
                    <a href="/services" class="btn-primary inline-flex">
                        Explore Our Comprehensive Senior Care Services
                        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section id="testimonials-section" data-animate class="py-20 lg:py-32 bg-[var(--color-primary-dark)] relative overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-5">
                <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <!-- Section Header -->
                <div class="text-center max-w-3xl mx-auto mb-16">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[var(--color-secondary)] text-sm font-medium mb-6">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                        </svg>
                        Testimonials
                    </div>
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                        What Families Say
                        <span class="text-[var(--color-secondary)]">About Us</span>
                    </h2>
                    <p class="text-white/70 text-lg">
                        The trust of families is our greatest reward. Here's what they have to say about their experience.
                    </p>
                </div>

                <!-- Testimonials Grid -->
                <div :class="['grid md:grid-cols-3 gap-6 lg:gap-8', isVisible['testimonials-section'] ? 'stagger-children' : 'opacity-0']">
                    <div
                        v-for="(testimonial, index) in testimonials"
                        :key="index"
                        class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-colors"
                    >
                        <!-- Quote Icon -->
                        <svg class="w-10 h-10 text-[var(--color-secondary)] mb-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>

                        <p class="text-white/90 text-lg leading-relaxed mb-8">
                            "{{ testimonial.quote }}"
                        </p>

                        <div class="flex items-center gap-4">
                            <img
                                :src="testimonial.image"
                                :alt="`${testimonial.name} - ${testimonial.relation} - Golden Years Senior Care Home Testimonial`"
                                class="w-14 h-14 rounded-full object-cover border-2 border-[var(--color-secondary)]"
                                loading="lazy"
                            />
                            <div>
                                <div class="text-white font-semibold">{{ testimonial.name }}</div>
                                <div class="text-white/60 text-sm">{{ testimonial.relation }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 lg:py-32 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]"></div>
            <div class="absolute inset-0 opacity-10">
                <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5" />
                    </pattern>
                    <rect width="100" height="100" fill="url(#grid)" />
                </svg>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                    Ready to Give Your Loved One the Care They Deserve?
                </h2>
                <p class="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                    Schedule a visit today and see firsthand why families choose Golden Years Care Home for their loved ones.
                </p>
                <div class="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                    <a href="/contact" class="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white text-[var(--color-primary)] font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Schedule a Visit
                    </a>
                    <a href="tel:+15551234567" class="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[var(--color-primary)] transition-all duration-300">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call Us Now
                    </a>
                </div>
            </div>
        </section>
    </MainLayout>
</template>


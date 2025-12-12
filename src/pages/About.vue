<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useSeo, pageSeoConfigs, structuredDataTemplates } from '@/composables/useSeo';

// SEO Configuration for About Page
useSeo({
    ...pageSeoConfigs.about,
    structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
            structuredDataTemplates.organization,
            structuredDataTemplates.breadcrumb([
                { name: 'Home', url: 'https://goldenyearscare.com/' },
                { name: 'About Us', url: 'https://goldenyearscare.com/about' },
            ]),
        ],
    },
});

const teamMembers = [
    {
        name: 'Dr. Sarah Johnson',
        role: 'Medical Director',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
        bio: '20+ years in geriatric medicine',
    },
    {
        name: 'Michael Chen',
        role: 'Care Manager',
        image: '/CareManager.jpg',
        bio: 'Certified in senior care management',
    },
    {
        name: 'Emily Rodriguez',
        role: 'Head Nurse',
        image: '/nurces.jpg',
        bio: '15 years of compassionate nursing',
    },
    {
        name: 'David Thompson',
        role: 'Activities Director',
        image: '/Activities.jpg',
        bio: 'Expert in therapeutic recreation',
    },
];

const milestones = [
    { year: '1995', title: 'Foundation', description: 'Golden Years was founded with a mission to provide loving care for seniors.' },
    { year: '2000', title: 'Expansion', description: 'Opened our new wing with 50 additional rooms and modern facilities.' },
    { year: '2010', title: 'Excellence Award', description: 'Received state recognition for outstanding senior care services.' },
    { year: '2015', title: 'Community Center', description: 'Launched our community outreach program for isolated seniors.' },
    { year: '2020', title: 'Modern Upgrade', description: 'Complete renovation with state-of-the-art medical equipment.' },
    { year: '2024', title: 'Growing Family', description: 'Now caring for over 500 residents with expanded services.' },
];

const values = [
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>`,
        title: 'Compassion',
        description: 'Every action is driven by genuine care and empathy for our residents.',
    },
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`,
        title: 'Dignity',
        description: 'We honor the life experience and individuality of every person in our care.',
    },
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
        title: 'Community',
        description: 'Building meaningful connections between residents, families, and staff.',
    },
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>`,
        title: 'Excellence',
        description: 'Committed to the highest standards in healthcare and daily care practices.',
    },
];

const isVisible = ref<{ [key: string]: boolean }>({});

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isVisible.value[entry.target.id] = true;
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
        observer.observe(el);
    });
});
</script>

<template>
    <MainLayout>

        <!-- Hero Section -->
        <section class="relative min-h-[70vh] flex items-center py-24 lg:py-32 overflow-hidden bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-light)]">

            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6 fade-up">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    Established 1995
                </div>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 fade-up" style="animation-delay: 0.2s;">
                    Our Story of
                    <span class="text-[var(--color-secondary)]">Compassionate Care</span>
                </h1>
                <p class="text-xl text-white/80 max-w-3xl mx-auto fade-up" style="animation-delay: 0.4s;">
                    For nearly three decades, Golden Years has been a sanctuary of love, dignity, and exceptional care for seniors and their families.
                </p>
            </div>
        </section>

        <!-- Mission & Vision Section -->
        <section id="mission-section" data-animate class="py-20 lg:py-32">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <!-- Image -->
                    <div :class="['relative', isVisible['mission-section'] ? 'slide-in-left' : 'opacity-0']">
                        <img
                            src="/ourmission1.jpg"
                            alt="Golden Years Care Home Mission - Providing Compassionate Elderly Care Services Since 1995"
                            class="rounded-3xl shadow-2xl w-full object-cover"
                            loading="lazy"
                        />
                        <div class="absolute -bottom-6 -right-6 w-48 h-48 bg-[var(--color-secondary)]/20 rounded-full blur-3xl"></div>
                        <div class="absolute -top-6 -left-6 w-32 h-32 bg-[var(--color-primary)]/20 rounded-full blur-2xl"></div>
                    </div>

                    <!-- Content -->
                    <div :class="[isVisible['mission-section'] ? 'slide-in-right' : 'opacity-0']">
                        <h2 class="text-3xl sm:text-4xl font-bold text-[var(--color-dark-text)] mb-8">
                            Our Mission & Vision
                        </h2>

                        <div class="space-y-8">
                            <div class="bg-[var(--color-warm-cream)] rounded-2xl p-6 border-l-4 border-[var(--color-primary)]">
                                <h3 class="text-xl font-bold text-[var(--color-primary)] mb-3">Our Mission</h3>
                                <p class="text-[var(--color-soft-gray)] leading-relaxed">
                                    To provide exceptional, personalized care that enhances the quality of life for every senior entrusted to us, treating each resident with the love, respect, and dignity they deserve.
                                </p>
                            </div>

                            <div class="bg-[var(--color-warm-cream)] rounded-2xl p-6 border-l-4 border-[var(--color-secondary)]">
                                <h3 class="text-xl font-bold text-[var(--color-accent)] mb-3">Our Vision</h3>
                                <p class="text-[var(--color-soft-gray)] leading-relaxed">
                                    To be the leading non-profit senior care community, known for innovative approaches to aging, unwavering compassion, and creating an environment where every senior thrives.
                                </p>
                            </div>

                            <p class="text-[var(--color-soft-gray)] text-lg leading-relaxed">
                                As a non-profit organization, we reinvest every resource back into our community, ensuring that financial status never stands between a senior and the care they need.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Values Section -->
        <section id="values-section" data-animate class="py-20 lg:py-32 bg-gradient-to-b from-[var(--color-warm-cream)] to-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-3xl mx-auto mb-16">
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-dark-text)] mb-6">
                        Our Core
                        <span class="text-[var(--color-primary)]">Values</span>
                    </h2>
                    <p class="text-[var(--color-soft-gray)] text-lg">
                        These principles guide everything we do, from daily care routines to long-term planning.
                    </p>
                </div>

                <div :class="['grid sm:grid-cols-2 lg:grid-cols-4 gap-6', isVisible['values-section'] ? 'stagger-children' : 'opacity-0']">
                    <div
                        v-for="(value, index) in values"
                        :key="index"
                        class="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
                    >
                        <div class="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mx-auto mb-6" v-html="value.icon"></div>
                        <h3 class="text-xl font-bold text-[var(--color-dark-text)] mb-3">{{ value.title }}</h3>
                        <p class="text-[var(--color-soft-gray)] text-sm leading-relaxed">{{ value.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Timeline Section -->
        <section id="timeline-section" data-animate class="py-20 lg:py-32">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-3xl mx-auto mb-16">
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-dark-text)] mb-6">
                        Our
                        <span class="text-[var(--color-primary)]">Journey</span>
                    </h2>
                    <p class="text-[var(--color-soft-gray)] text-lg">
                        From humble beginnings to becoming a trusted community pillar.
                    </p>
                </div>

                <div :class="['relative', isVisible['timeline-section'] ? 'fade-up' : 'opacity-0']">
                    <!-- Timeline Line - Desktop (continuous, solid color) -->
                    <div class="hidden lg:block absolute left-1/2 -translate-x-1/2 top-7 bottom-7 w-1 bg-[var(--color-primary)] rounded-full"></div>

                    <!-- Timeline Line - Mobile (continuous, solid color) -->
                    <div class="block lg:hidden absolute left-6 -translate-x-1/2 top-6 bottom-6 w-1 bg-[var(--color-primary)] rounded-full"></div>

                    <div class="space-y-6 lg:space-y-0">
                        <div
                            v-for="(milestone, index) in milestones"
                            :key="index"
                            class="relative lg:py-6"
                        >
                            <!-- Mobile View -->
                            <div class="lg:hidden flex items-start gap-4 pl-0">
                                <!-- Mobile Node -->
                                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm flex items-center justify-center z-10 border-4 border-[var(--color-warm-white)] shadow-lg">
                                    {{ index + 1 }}
                                </div>
                                <!-- Mobile Card -->
                                <div class="flex-1 bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                                    <div class="text-xl sm:text-2xl font-bold text-[var(--color-primary)] mb-1">{{ milestone.year }}</div>
                                    <h3 class="text-base sm:text-lg font-bold text-[var(--color-dark-text)] mb-2">{{ milestone.title }}</h3>
                                    <p class="text-[var(--color-soft-gray)] text-sm leading-relaxed">{{ milestone.description }}</p>
                                </div>
                            </div>

                            <!-- Desktop View -->
                            <div class="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-0">
                                <!-- Left Side Card (even index) -->
                                <div v-if="index % 2 === 0" class="pr-8 text-right flex justify-end">
                                    <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 max-w-md">
                                        <div class="text-3xl font-bold text-[var(--color-primary)] mb-2">{{ milestone.year }}</div>
                                        <h3 class="text-xl font-bold text-[var(--color-dark-text)] mb-2">{{ milestone.title }}</h3>
                                        <p class="text-[var(--color-soft-gray)]">{{ milestone.description }}</p>
                                    </div>
                                </div>
                                <div v-else class="pr-8"></div>

                                <!-- Center Numbered Node -->
                                <div class="relative flex items-center justify-center">
                                    <!-- Horizontal connecting lines -->
                                    <div
                                        :class="[
                                            'absolute right-full h-0.5 bg-[var(--color-primary)]/50 transition-all duration-300',
                                            index % 2 === 0 ? 'w-8' : 'w-0'
                                        ]"
                                    ></div>
                                    <div class="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-primary)] text-white font-bold text-base z-10 border-4 border-[var(--color-warm-white)] shadow-xl">
                                        {{ index + 1 }}
                                    </div>
                                    <div
                                        :class="[
                                            'absolute left-full h-0.5 bg-[var(--color-primary)]/50 transition-all duration-300',
                                            index % 2 === 1 ? 'w-8' : 'w-0'
                                        ]"
                                    ></div>
                                </div>

                                <!-- Right Side Card (odd index) -->
                                <div v-if="index % 2 === 1" class="pl-8 text-left flex justify-start">
                                    <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 max-w-md">
                                        <div class="text-3xl font-bold text-[var(--color-primary)] mb-2">{{ milestone.year }}</div>
                                        <h3 class="text-xl font-bold text-[var(--color-dark-text)] mb-2">{{ milestone.title }}</h3>
                                        <p class="text-[var(--color-soft-gray)]">{{ milestone.description }}</p>
                                    </div>
                                </div>
                                <div v-else class="pl-8"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Team Section -->
        <section id="team-section" data-animate class="py-20 lg:py-32 bg-[var(--color-primary-dark)]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-3xl mx-auto mb-16">
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Meet Our
                        <span class="text-[var(--color-secondary)]">Leadership Team</span>
                    </h2>
                    <p class="text-white/70 text-lg">
                        Dedicated professionals committed to providing the best care possible.
                    </p>
                </div>

                <div :class="['grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8', isVisible['team-section'] ? 'stagger-children' : 'opacity-0']">
                    <div
                        v-for="(member, index) in teamMembers"
                        :key="index"
                        class="group"
                    >
                        <div class="relative overflow-hidden rounded-2xl mb-4">
                            <img
                                :src="member.image"
                                :alt="`${member.name} - ${member.role} at Golden Years Senior Care Facility - Experienced Elderly Care Professional`"
                                class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                            />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-1">{{ member.name }}</h3>
                        <p class="text-[var(--color-secondary)] font-medium mb-2">{{ member.role }}</p>
                        <p class="text-white/60 text-sm">{{ member.bio }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 lg:py-32">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-dark-text)] mb-6">
                    Want to Learn More?
                </h2>
                <p class="text-[var(--color-soft-gray)] text-lg mb-10 max-w-2xl mx-auto">
                    We'd love to show you around our facility and answer any questions you may have about our care services.
                </p>
                <div class="flex flex-wrap justify-center gap-4">
                    <a href="/contact" class="btn-primary">
                        Schedule a Tour
                        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                    <a href="/services" class="btn-secondary">
                        View Our Services
                    </a>
                </div>
            </div>
        </section>
    </MainLayout>
</template>


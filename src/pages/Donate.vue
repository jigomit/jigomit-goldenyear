<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useSeo, pageSeoConfigs, structuredDataTemplates } from '@/composables/useSeo';

// SEO Configuration for Donate Page
useSeo({
    ...pageSeoConfigs.donate,
    structuredData: structuredDataTemplates.breadcrumb([
        { name: 'Home', url: 'https://goldenyearscare.com/' },
        { name: 'Donate', url: 'https://goldenyearscare.com/donate' },
    ]),
});

const donationAmounts = [25, 50, 100, 250, 500];
const selectedAmount = ref(50);
const customAmount = ref('');
const donationType = ref<'one-time' | 'monthly'>('one-time');
const isProcessing = ref(false);
const showThankYou = ref(false);

const displayAmount = computed(() => {
    return customAmount.value ? Number(customAmount.value) : selectedAmount.value;
});

const selectAmount = (amount: number) => {
    selectedAmount.value = amount;
    customAmount.value = '';
};

const handleCustomAmount = () => {
    selectedAmount.value = 0;
};

const processDonation = () => {
    isProcessing.value = true;
    setTimeout(() => {
        isProcessing.value = false;
        showThankYou.value = true;
    }, 2000);
};

const impactItems = [
    {
        amount: 25,
        impact: 'Provides nutritious meals for a resident for one week',
        icon: '🍽️',
    },
    {
        amount: 50,
        impact: 'Supplies essential medical supplies for a month',
        icon: '💊',
    },
    {
        amount: 100,
        impact: 'Funds recreational activities for all residents',
        icon: '🎨',
    },
    {
        amount: 250,
        impact: 'Covers specialized therapy sessions for one resident',
        icon: '🧘',
    },
    {
        amount: 500,
        impact: 'Helps maintain our beautiful garden and outdoor spaces',
        icon: '🌳',
    },
];

const testimonials = [
    {
        name: 'Anonymous Donor',
        quote: 'Knowing my contribution helps elderly folks live with dignity makes every dollar worth it.',
    },
    {
        name: 'Local Business Owner',
        quote: 'Golden Years has been a beacon in our community. Supporting them is supporting our parents and grandparents.',
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
        <Head title="Donate - Support Our Mission">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        </Head>

        <!-- Hero Section -->
        <section class="relative py-24 lg:py-32 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-light)]"></div>

            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6 fade-up">
                    <svg class="w-4 h-4 text-[var(--color-secondary)]" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>
                    Make a Difference Today
                </div>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 fade-up" style="animation-delay: 0.2s;">
                    Your Generosity
                    <span class="text-[var(--color-secondary)]">Changes Lives</span>
                </h1>
                <p class="text-xl text-white/80 max-w-3xl mx-auto fade-up" style="animation-delay: 0.4s;">
                    As a non-profit organization, we rely on the kindness of donors to continue providing exceptional care to our beloved seniors.
                </p>
            </div>
        </section>

        <!-- Donation Form Section -->
        <section id="donation-form" data-animate class="py-20 lg:py-32">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    <!-- Donation Form -->
                    <div :class="[isVisible['donation-form'] ? 'slide-in-left' : 'opacity-0']">
                        <div class="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
                            <!-- Thank You Message -->
                            <Transition
                                enter-active-class="transition-all duration-500 ease-out"
                                enter-from-class="opacity-0 scale-95"
                                enter-to-class="opacity-100 scale-100"
                            >
                                <div v-if="showThankYou" class="text-center py-12">
                                    <div class="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                                        <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 class="text-2xl font-bold text-[var(--color-dark-text)] mb-4">Thank You!</h3>
                                    <p class="text-[var(--color-soft-gray)] text-lg mb-6">
                                        Your generous donation of ${{ displayAmount }} will help us continue our mission of providing compassionate care.
                                    </p>
                                    <p class="text-[var(--color-primary)] font-semibold">
                                        A receipt has been sent to your email.
                                    </p>
                                </div>
                            </Transition>

                            <div v-if="!showThankYou">
                                <h2 class="text-2xl font-bold text-[var(--color-dark-text)] mb-2">Make a Donation</h2>
                                <p class="text-[var(--color-soft-gray)] mb-8">Choose an amount that works for you.</p>

                                <!-- Donation Type Toggle -->
                                <div class="flex bg-gray-100 rounded-xl p-1 mb-8">
                                    <button
                                        @click="donationType = 'one-time'"
                                        :class="[
                                            'flex-1 py-3 rounded-lg font-medium text-sm transition-all',
                                            donationType === 'one-time'
                                                ? 'bg-white text-[var(--color-primary)] shadow-md'
                                                : 'text-[var(--color-soft-gray)]'
                                        ]"
                                    >
                                        One-Time
                                    </button>
                                    <button
                                        @click="donationType = 'monthly'"
                                        :class="[
                                            'flex-1 py-3 rounded-lg font-medium text-sm transition-all',
                                            donationType === 'monthly'
                                                ? 'bg-white text-[var(--color-primary)] shadow-md'
                                                : 'text-[var(--color-soft-gray)]'
                                        ]"
                                    >
                                        Monthly
                                    </button>
                                </div>

                                <!-- Amount Selection -->
                                <div class="grid grid-cols-3 gap-3 mb-6">
                                    <button
                                        v-for="amount in donationAmounts"
                                        :key="amount"
                                        @click="selectAmount(amount)"
                                        :class="[
                                            'py-4 rounded-xl font-bold text-lg transition-all border-2',
                                            selectedAmount === amount && !customAmount
                                                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                                                : 'bg-white text-[var(--color-dark-text)] border-gray-200 hover:border-[var(--color-primary)]'
                                        ]"
                                    >
                                        ${{ amount }}
                                    </button>
                                    <div class="col-span-3">
                                        <div class="relative">
                                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-soft-gray)] font-bold">$</span>
                                            <input
                                                v-model="customAmount"
                                                @input="handleCustomAmount"
                                                type="number"
                                                min="1"
                                                placeholder="Custom Amount"
                                                :class="[
                                                    'w-full py-4 pl-8 pr-4 rounded-xl font-bold text-lg border-2 transition-all outline-none',
                                                    customAmount
                                                        ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20'
                                                        : 'border-gray-200 focus:border-[var(--color-primary)]'
                                                ]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <!-- Donation Summary -->
                                <div class="bg-[var(--color-warm-cream)] rounded-xl p-6 mb-8">
                                    <div class="flex justify-between items-center mb-2">
                                        <span class="text-[var(--color-soft-gray)]">Donation Amount</span>
                                        <span class="text-2xl font-bold text-[var(--color-primary)]">${{ displayAmount }}</span>
                                    </div>
                                    <div class="flex justify-between items-center text-sm">
                                        <span class="text-[var(--color-soft-gray)]">Frequency</span>
                                        <span class="font-medium text-[var(--color-dark-text)]">{{ donationType === 'monthly' ? 'Monthly' : 'One-Time' }}</span>
                                    </div>
                                </div>

                                <!-- Donate Button -->
                                <button
                                    @click="processDonation"
                                    :disabled="isProcessing || (!selectedAmount && !customAmount)"
                                    class="w-full btn-primary text-lg py-5 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg v-if="isProcessing" class="w-6 h-6 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span v-if="!isProcessing">
                                        Donate ${{ displayAmount }} {{ donationType === 'monthly' ? '/month' : '' }}
                                    </span>
                                    <span v-else>Processing...</span>
                                </button>

                                <p class="text-center text-[var(--color-soft-gray)] text-sm mt-4">
                                    <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Your donation is secure and tax-deductible.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Impact Information -->
                    <div :class="[isVisible['donation-form'] ? 'slide-in-right' : 'opacity-0']">
                        <h2 class="text-3xl sm:text-4xl font-bold text-[var(--color-dark-text)] mb-6">
                            Your Impact
                        </h2>
                        <p class="text-[var(--color-soft-gray)] text-lg mb-8">
                            Every donation, no matter the size, makes a real difference in the lives of our residents. Here's how your generosity helps:
                        </p>

                        <div class="space-y-4">
                            <div
                                v-for="(item, index) in impactItems"
                                :key="index"
                                class="flex items-start gap-4 bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div class="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl shrink-0">
                                    {{ item.icon }}
                                </div>
                                <div>
                                    <span class="text-[var(--color-primary)] font-bold text-lg">${{ item.amount }}</span>
                                    <p class="text-[var(--color-soft-gray)]">{{ item.impact }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Testimonials -->
                        <div class="mt-12 bg-[var(--color-primary)] rounded-2xl p-8 text-white">
                            <h3 class="text-xl font-bold mb-6">What Donors Say</h3>
                            <div class="space-y-6">
                                <div v-for="(testimonial, index) in testimonials" :key="index">
                                    <p class="text-white/90 italic mb-2">"{{ testimonial.quote }}"</p>
                                    <p class="text-[var(--color-secondary)] font-medium">- {{ testimonial.name }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Other Ways to Help -->
        <section id="other-ways" data-animate class="py-20 lg:py-32 bg-gradient-to-b from-[var(--color-warm-cream)] to-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-3xl mx-auto mb-16">
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-dark-text)] mb-6">
                        Other Ways to
                        <span class="text-[var(--color-primary)]">Help</span>
                    </h2>
                    <p class="text-[var(--color-soft-gray)] text-lg">
                        Not ready to donate? There are many other ways you can support our mission.
                    </p>
                </div>

                <div :class="['grid sm:grid-cols-2 lg:grid-cols-3 gap-6', isVisible['other-ways'] ? 'stagger-children' : 'opacity-0']">
                    <!-- Volunteer -->
                    <div class="bg-white rounded-2xl p-8 shadow-lg card-hover text-center">
                        <div class="w-20 h-20 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-6">
                            <svg class="w-10 h-10 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-[var(--color-dark-text)] mb-3">Volunteer</h3>
                        <p class="text-[var(--color-soft-gray)] mb-6">Share your time and talents with our residents. Every hour counts.</p>
                        <a href="/contact" class="btn-secondary inline-flex">Learn More</a>
                    </div>

                    <!-- Corporate Partnership -->
                    <div class="bg-white rounded-2xl p-8 shadow-lg card-hover text-center">
                        <div class="w-20 h-20 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-6">
                            <svg class="w-10 h-10 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-[var(--color-dark-text)] mb-3">Corporate Partnership</h3>
                        <p class="text-[var(--color-soft-gray)] mb-6">Partner with us to make a bigger impact in senior care.</p>
                        <a href="/contact" class="btn-secondary inline-flex">Get in Touch</a>
                    </div>

                    <!-- Spread the Word -->
                    <div class="bg-white rounded-2xl p-8 shadow-lg card-hover text-center sm:col-span-2 lg:col-span-1">
                        <div class="w-20 h-20 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-6">
                            <svg class="w-10 h-10 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-[var(--color-dark-text)] mb-3">Spread the Word</h3>
                        <p class="text-[var(--color-soft-gray)] mb-6">Share our mission with friends and family on social media.</p>
                        <div class="flex justify-center gap-3">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white hover:bg-[var(--color-primary-dark)] transition-colors" aria-label="Share on Twitter">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white hover:bg-[var(--color-primary-dark)] transition-colors" aria-label="Share on Facebook">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white hover:bg-[var(--color-primary-dark)] transition-colors" aria-label="Share on Instagram">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </MainLayout>
</template>


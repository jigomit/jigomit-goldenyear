<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useSeo, pageSeoConfigs, structuredDataTemplates } from '@/composables/useSeo';
import { trackFormSubmission, trackTourSchedule } from '@/composables/useAnalytics';

const form = ref({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiry_type: 'general',
});

const isSubmitting = ref(false);
const showSuccess = ref(false);
const inquiryOpen = ref(false);
const inquiryOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'admission', label: 'Admission Information' },
    { value: 'visit', label: 'Schedule a Visit' },
    { value: 'volunteer', label: 'Volunteer' },
    { value: 'donation', label: 'Donation' },
];

const selectedInquiryLabel = computed(() => {
    return inquiryOptions.find(option => option.value === form.value.inquiry_type)?.label ?? 'Select';
});

const closeInquiry = () => {
    inquiryOpen.value = false;
};

const toggleInquiry = () => {
    inquiryOpen.value = !inquiryOpen.value;
};

const selectInquiry = (value: string) => {
    form.value.inquiry_type = value;
    inquiryOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target) {
        return;
    }
    const dropdown = document.getElementById('inquiry-dropdown');
    if (dropdown && !dropdown.contains(target)) {
        closeInquiry();
    }
};

const resetForm = () => {
    form.value = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiry_type: 'general',
    };
};

const submitForm = () => {
    isSubmitting.value = true;
    
    // Track form submission
    trackFormSubmission('contact_form');
    if (form.value.inquiry_type === 'visit') {
        trackTourSchedule();
    }
    
    // Simulate form submission
    setTimeout(() => {
        isSubmitting.value = false;
        showSuccess.value = true;
        resetForm();
        setTimeout(() => {
            showSuccess.value = false;
        }, 5000);
    }, 1500);
};

const contactInfo = [
    {
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
        title: 'Visit Us',
        details: ['123 Care Lane', 'Peaceful Valley, State 12345'],
    },
    {
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>`,
        title: 'Call Us',
        details: ['+1 (555) 123-4567', '+1 (555) 987-6543 (Emergency)'],
    },
    {
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
        title: 'Email Us',
        details: ['care@goldenyears.org', 'info@goldenyears.org'],
    },
    {
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        title: 'Visiting Hours',
        details: ['Mon - Fri: 9:00 AM - 8:00 PM', 'Sat - Sun: 10:00 AM - 6:00 PM'],
    },
];

const faqs = [
    {
        question: 'What are the admission requirements?',
        answer: 'We accept seniors aged 60 and above who require varying levels of care. A medical assessment is conducted to ensure we can meet their specific needs.',
    },
    {
        question: 'Can families visit anytime?',
        answer: 'We have flexible visiting hours and encourage family involvement. Special arrangements can be made for visits outside regular hours.',
    },
    {
        question: 'What is included in the care package?',
        answer: 'Our comprehensive care includes accommodation, meals, personal care assistance, medical monitoring, activities, and housekeeping services.',
    },
    {
        question: 'Do you accept government subsidies?',
        answer: 'As a non-profit organization, we work with various assistance programs and can help families navigate available financial support options.',
    },
];

// SEO Configuration for Contact Page (with FAQ structured data)
useSeo({
    ...pageSeoConfigs.contact,
    structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
            structuredDataTemplates.localBusiness,
            structuredDataTemplates.breadcrumb([
                { name: 'Home', url: 'https://goldenyearscare.com/' },
                { name: 'Contact', url: 'https://goldenyearscare.com/contact' },
            ]),
            structuredDataTemplates.faqPage(faqs.map(faq => ({ question: faq.question, answer: faq.answer }))),
        ],
    },
});

const openFaq = ref<number | null>(null);

const toggleFaq = (index: number) => {
    openFaq.value = openFaq.value === index ? null : index;
};

const isVisible = ref<{ [key: string]: boolean }>({});

onMounted(() => {
    document.title = 'Contact Us - Get In Touch';
    
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

    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <MainLayout>

        <!-- Hero Section -->
        <section class="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-light)]">
            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6 fade-up">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    We're Here to Help
                </div>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 fade-up" style="animation-delay: 0.2s;">
                    Get In
                    <span class="text-[var(--color-secondary)]">Touch</span>
                </h1>
                <p class="text-xl text-white/80 max-w-3xl mx-auto fade-up" style="animation-delay: 0.4s;">
                    Have questions or want to schedule a visit? We'd love to hear from you. Our team is ready to assist.
                </p>
            </div>
        </section>

        <!-- Contact Info Cards -->
        <section class="relative -mt-16 z-10">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div
                        v-for="(info, index) in contactInfo"
                        :key="index"
                        class="bg-white rounded-2xl p-6 shadow-xl text-center card-hover"
                    >
                        <div class="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mx-auto mb-4" v-html="info.icon"></div>
                        <h3 class="text-lg font-bold text-[var(--color-dark-text)] mb-2">{{ info.title }}</h3>
                        <p v-for="(detail, dIndex) in info.details" :key="dIndex" class="text-[var(--color-soft-gray)] text-sm">
                            {{ detail }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Form & Map Section -->
        <section id="contact-form-section" data-animate class="py-20 lg:py-32">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    <!-- Contact Form -->
                    <div :class="[isVisible['contact-form-section'] ? 'slide-in-left' : 'opacity-0']">
                        <h2 class="text-3xl sm:text-4xl font-bold text-[var(--color-dark-text)] mb-6">
                            Send Us a Message
                        </h2>
                        <p class="text-[var(--color-soft-gray)] text-lg mb-8">
                            Fill out the form below and we'll get back to you within 24 hours.
                        </p>

                        <!-- Success Message -->
                        <Transition
                            enter-active-class="transition-all duration-300 ease-out"
                            enter-from-class="opacity-0 -translate-y-4"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition-all duration-200 ease-in"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 -translate-y-4"
                        >
                            <div v-if="showSuccess" class="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                                <svg class="w-6 h-6 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p class="text-green-700 font-medium">Thank you! Your message has been sent successfully. We'll be in touch soon.</p>
                            </div>
                        </Transition>

                        <form @submit.prevent="submitForm" class="space-y-6">
                            <div class="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-[var(--color-dark-text)] mb-2">Full Name *</label>
                                    <input
                                        v-model="form.name"
                                        type="text"
                                        required
                                        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-[var(--color-dark-text)] mb-2">Email Address *</label>
                                    <input
                                        v-model="form.email"
                                        type="email"
                                        required
                                        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div class="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-[var(--color-dark-text)] mb-2">Phone Number</label>
                                    <input
                                        v-model="form.phone"
                                        type="tel"
                                        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all outline-none"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                <div class="min-w-0">
                                    <label class="block text-sm font-medium text-[var(--color-dark-text)] mb-2">Inquiry Type</label>
                                    <div
                                        id="inquiry-dropdown"
                                        class="relative"
                                    >
                                        <button
                                            type="button"
                                            @click.stop="toggleInquiry"
                                            class="min-w-0 w-full px-4 pr-10 py-3 rounded-xl border border-gray-300 bg-[var(--color-warm-white)] text-[var(--color-dark-text)] text-sm sm:text-base focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all outline-none flex items-center justify-between"
                                            :aria-expanded="inquiryOpen"
                                            aria-haspopup="listbox"
                                        >
                                            <span class="truncate">{{ selectedInquiryLabel }}</span>
                                            <svg
                                                class="h-4 w-4 text-gray-500 shrink-0 transition-transform duration-200"
                                                :class="inquiryOpen ? 'rotate-180' : ''"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <div
                                            v-if="inquiryOpen"
                                            class="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg"
                                            role="listbox"
                                        >
                                            <button
                                                v-for="option in inquiryOptions"
                                                :key="option.value"
                                                type="button"
                                                @click.stop="selectInquiry(option.value)"
                                                class="w-full text-left px-4 py-3 text-sm sm:text-base hover:bg-gray-100 transition-colors"
                                                :class="option.value === form.inquiry_type ? 'bg-gray-100 font-semibold text-[var(--color-dark-text)]' : 'text-[var(--color-dark-text)]'"
                                            >
                                                {{ option.label }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-[var(--color-dark-text)] mb-2">Subject *</label>
                                <input
                                    v-model="form.subject"
                                    type="text"
                                    required
                                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all outline-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-[var(--color-dark-text)] mb-2">Message *</label>
                                <textarea
                                    v-model="form.message"
                                    required
                                    rows="5"
                                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all outline-none resize-none"
                                    placeholder="Tell us more about your inquiry..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                :disabled="isSubmitting"
                                class="w-full sm:w-auto btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg v-if="isSubmitting" class="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span v-if="!isSubmitting">Send Message</span>
                                <span v-else>Sending...</span>
                                <svg v-if="!isSubmitting" class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </form>
                    </div>

                    <!-- Map & Additional Info -->
                    <div :class="[isVisible['contact-form-section'] ? 'slide-in-right' : 'opacity-0']">
                        <!-- Map Placeholder -->
                        <div class="bg-gray-100 rounded-2xl overflow-hidden shadow-lg mb-8 h-80">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291865!2d-73.98784492404069!3d40.75797657138846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1699900000000!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style="border:0;"
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        <!-- Quick Actions -->
                        <div class="bg-[var(--color-warm-cream)] rounded-2xl p-6">
                            <h3 class="text-xl font-bold text-[var(--color-dark-text)] mb-4">Quick Actions</h3>
                            <div class="space-y-3">
                                <a href="tel:+15551234567" class="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all group">
                                    <div class="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span class="block text-sm text-[var(--color-soft-gray)]">Call us directly</span>
                                        <span class="block font-semibold text-[var(--color-dark-text)]">+1 (555) 123-4567</span>
                                    </div>
                                </a>
                                <a href="mailto:care@goldenyears.org" class="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all group">
                                    <div class="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span class="block text-sm text-[var(--color-soft-gray)]">Send us an email</span>
                                        <span class="block font-semibold text-[var(--color-dark-text)]">care@goldenyears.org</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section id="faq-section" data-animate class="py-20 lg:py-32 bg-gradient-to-b from-[var(--color-warm-cream)] to-white">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-dark-text)] mb-6">
                        Frequently Asked
                        <span class="text-[var(--color-primary)]">Questions</span>
                    </h2>
                    <p class="text-[var(--color-soft-gray)] text-lg">
                        Find quick answers to common questions about our care services.
                    </p>
                </div>

                <div :class="['space-y-4', isVisible['faq-section'] ? 'fade-up' : 'opacity-0']">
                    <div
                        v-for="(faq, index) in faqs"
                        :key="index"
                        class="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                        <button
                            @click="toggleFaq(index)"
                            class="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                        >
                            <span class="font-semibold text-[var(--color-dark-text)] pr-8">{{ faq.question }}</span>
                            <svg
                                :class="['w-5 h-5 text-[var(--color-primary)] shrink-0 transition-transform duration-300', openFaq === index ? 'rotate-180' : '']"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <Transition
                            enter-active-class="transition-all duration-300 ease-out"
                            enter-from-class="opacity-0 max-h-0"
                            enter-to-class="opacity-100 max-h-48"
                            leave-active-class="transition-all duration-200 ease-in"
                            leave-from-class="opacity-100 max-h-48"
                            leave-to-class="opacity-0 max-h-0"
                        >
                            <div v-if="openFaq === index" class="px-6 pb-6 overflow-hidden">
                                <p class="text-[var(--color-soft-gray)] leading-relaxed">{{ faq.answer }}</p>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </section>
    </MainLayout>
</template>


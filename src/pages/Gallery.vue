<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useSeo, pageSeoConfigs, structuredDataTemplates } from '@/composables/useSeo';

// SEO Configuration for Gallery Page
useSeo({
    ...pageSeoConfigs.gallery,
    structuredData: structuredDataTemplates.breadcrumb([
        { name: 'Home', url: 'https://goldenyearscare.com/' },
        { name: 'Gallery', url: 'https://goldenyearscare.com/gallery' },
    ]),
});

const categories = ['All', 'Facilities', 'Activities', 'Events', 'Residents'];
const activeCategory = ref('All');

const images = [
    { src: '/Compassionate.jpg', category: 'Residents', title: 'Compassionate Care' },
    { src: '/rooms.jpg', category: 'Facilities', title: 'Comfortable Rooms' },
    { src: '/Social.jpg', category: 'Activities', title: 'Social Gatherings' },
    { src: '/EntertainmentActivities.jpg', category: 'Activities', title: 'Entertainment Activities' },
    { src: '/Health.jpg', category: 'Activities', title: 'Healthcare Activities' },
    { src: '/diningArea.jpg', category: 'Facilities', title: 'Dining Area' },
    { src: '/Peaceful.jpg', category: 'Activities', title: 'Peaceful Moments' },
    { src: '/Happy.jpg', category: 'Residents', title: 'Happy Smiles' },
    { src: '/Golden.jpg', category: 'Residents', title: 'Golden Moments' },
    { src: '/Celebration.jpg', category: 'Events', title: 'Celebration Day' },
    { src: '/Food&FunEvents.jpg', category: 'Events', title: 'Food & Fun Events' },
    { src: '/Creative.jpg', category: 'Events', title: 'Creative & Hobby Events' },
    { src: '/garden.jpg', category: 'Facilities', title: 'Garden View' },
    { src: '/CommonArea.jpg', category: 'Facilities', title: 'Common Area' },
    { src: '/Art.jpg', category: 'Activities', title: 'Art Therapy' },
];

const filteredImages = ref(images);

const filterByCategory = (category: string) => {
    activeCategory.value = category;
    if (category === 'All') {
        filteredImages.value = images;
    } else {
        filteredImages.value = images.filter(img => img.category === category);
    }
};

const selectedImage = ref<{ src: string; title: string } | null>(null);

const openLightbox = (image: { src: string; title: string }) => {
    selectedImage.value = image;
    document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
    selectedImage.value = null;
    document.body.style.overflow = 'auto';
};

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
        <Head title="Gallery - Life at Golden Years">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        </Head>

        <!-- Hero Section -->
        <section class="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-light)]">
            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6 fade-up">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                    </svg>
                    Moments & Memories
                </div>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 fade-up" style="animation-delay: 0.2s;">
                    A Glimpse Into
                    <span class="text-[var(--color-secondary)]">Our World</span>
                </h1>
                <p class="text-xl text-white/80 max-w-3xl mx-auto fade-up" style="animation-delay: 0.4s;">
                    Explore our facilities, activities, and the joy-filled moments that make Golden Years a special place.
                </p>
            </div>
        </section>

        <!-- Gallery Section -->
        <section id="gallery-section" data-animate class="py-20 lg:py-32">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Filter Buttons -->
                <div class="flex flex-wrap justify-center gap-3 mb-12">
                    <button
                        v-for="category in categories"
                        :key="category"
                        @click="filterByCategory(category)"
                        :class="[
                            'px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300',
                            activeCategory === category
                                ? 'bg-[var(--color-primary)] text-white shadow-lg'
                                : 'bg-gray-100 text-[var(--color-soft-gray)] hover:bg-gray-200'
                        ]"
                    >
                        {{ category }}
                    </button>
                </div>

                <!-- Gallery Grid -->
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TransitionGroup name="gallery">
                        <div
                            v-for="(image, index) in filteredImages"
                            :key="image.src"
                            class="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg"
                            @click="openLightbox(image)"
                        >
                            <img
                                :src="image.src"
                                :alt="`${image.title} - ${image.category} at Golden Years Senior Care Facility - Elderly Care Home Gallery`"
                                class="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                            />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span class="text-[var(--color-secondary)] text-sm font-medium mb-1">{{ image.category }}</span>
                                <h3 class="text-white text-xl font-bold">{{ image.title }}</h3>
                            </div>
                            <div class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                        </div>
                    </TransitionGroup>
                </div>
            </div>
        </section>

        <!-- Lightbox -->
        <Teleport to="body">
            <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="selectedImage"
                    class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    @click.self="closeLightbox"
                >
                    <button
                        @click="closeLightbox"
                        class="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div class="max-w-5xl w-full">
                        <img
                            :src="selectedImage.src"
                            :alt="`${selectedImage.title} - Golden Years Care & Comfort Home Senior Care Facility Photo Gallery`"
                            class="w-full max-h-[80vh] object-contain rounded-lg"
                        />
                        <p class="text-white text-center mt-4 text-xl font-semibold">{{ selectedImage.title }}</p>
                    </div>
                </div>
            </Transition>
        </Teleport>

        <!-- Virtual Tour CTA -->
        <section class="py-20 lg:py-32 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-8">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                    Want to See More?
                </h2>
                <p class="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                    Nothing beats an in-person visit. Schedule a tour and experience the warmth and care of Golden Years firsthand.
                </p>
                <div class="flex flex-wrap justify-center gap-4">
                    <a href="/contact" class="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--color-primary)] font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Schedule a Visit
                    </a>
                </div>
            </div>
        </section>
    </MainLayout>
</template>

<style scoped>
.gallery-enter-active,
.gallery-leave-active {
    transition: all 0.5s ease;
}

.gallery-enter-from,
.gallery-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.gallery-move {
    transition: transform 0.5s ease;
}
</style>


import { ref, watch, onMounted } from 'vue';

interface SeoConfig {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    ogType?: string;
    canonicalUrl?: string;
    structuredData?: object;
    robots?: string;
    author?: string;
    articleAuthor?: string;
    articlePublishedTime?: string;
    articleModifiedTime?: string;
    geoRegion?: string;
    geoPlacename?: string;
    geoPosition?: string;
    ICBM?: string;
}

// Long-tail keywords for senior care / old age home
export const seoKeywords = {
    primary: [
        'senior care home',
        'elderly care facility',
        'old age home',
        'nursing home',
        'assisted living facility',
    ],
    longTail: [
        // Location-based long-tail keywords
        'best senior care home near me',
        'affordable elderly care facility in my area',
        'top rated nursing home for parents',
        'luxury assisted living for seniors',
        'senior care facility near downtown',
        'elderly care home close to hospital',
        'nursing home near family',
        'assisted living community in my city',
        'local senior care facility',
        'nearest elderly care home',

        // Service-specific long-tail keywords
        '24 hour nursing care for elderly parents',
        'memory care facility for dementia patients',
        'respite care services for senior citizens',
        'physical therapy services for elderly',
        'medical care facility for aging parents',
        'Alzheimer care facility for seniors',
        'dementia care home with specialized programs',
        'skilled nursing care for elderly',
        'rehabilitation services for senior citizens',
        'hospice care facility for terminally ill',
        'post-surgery care for elderly',
        'chronic disease management for seniors',
        'medication management for elderly residents',
        'wound care services for seniors',
        'diabetes care for elderly patients',

        // Need-based long-tail keywords
        'safe place for elderly parents to live',
        'caring environment for senior citizens',
        'home like atmosphere for elderly care',
        'compassionate care for aging loved ones',
        'dignified living for senior citizens',
        'secure facility for elderly with dementia',
        'peaceful environment for senior living',
        'comfortable home for aging parents',
        'supportive community for elderly',
        'trusted care facility for seniors',

        // Cost-related long-tail keywords
        'affordable senior living options',
        'non-profit elderly care home',
        'senior care home with financial assistance',
        'cost effective nursing home services',
        'low cost assisted living facility',
        'Medicaid accepted nursing home',
        'Medicare covered senior care',
        'affordable memory care facility',
        'budget friendly elderly care',
        'senior care with payment plans',
        'financial aid for elderly care',
        'sliding scale fees for senior care',

        // Quality-related long-tail keywords
        'highly rated senior care facility',
        'best reviewed elderly care home',
        'award winning nursing home',
        'accredited assisted living facility',
        '5 star rated senior care home',
        'top rated memory care facility',
        'certified nursing home',
        'licensed elderly care facility',
        'JCAHO accredited senior care',
        'state licensed nursing home',
        'family owned senior care facility',
        'locally owned elderly care home',

        // Activity-related long-tail keywords
        'senior care with recreational activities',
        'elderly home with social programs',
        'active lifestyle senior living community',
        'engaging activities for elderly residents',
        'senior care with exercise programs',
        'elderly facility with art therapy',
        'nursing home with music therapy',
        'assisted living with gardening programs',
        'senior care with pet therapy',
        'elderly home with religious services',

        // Intent-based: Informational keywords
        'how to choose a senior care facility',
        'what to look for in nursing home',
        'signs your parent needs assisted living',
        'when to consider memory care',
        'how much does senior care cost',
        'what is the difference between assisted living and nursing home',
        'how to pay for elderly care',
        'questions to ask when touring senior care',
        'what services do nursing homes provide',
        'how to find the best senior care facility',

        // Intent-based: Transactional keywords
        'schedule tour of senior care facility',
        'apply for senior care admission',
        'book consultation for elderly care',
        'reserve spot in nursing home',
        'enroll in assisted living program',
        'get quote for senior care services',
        'request information about memory care',
        'contact senior care facility today',

        // Intent-based: Navigational keywords
        'golden years care home website',
        'golden years senior care contact',
        'golden years nursing home location',
        'golden years care facility hours',
        'golden years assisted living reviews',

        // Problem-solving keywords
        'elderly care for parents who can no longer live alone',
        'nursing home for elderly with mobility issues',
        'assisted living for seniors who need help with daily tasks',
        'memory care for parents with Alzheimer disease',
        'senior care for elderly with chronic pain',
        'elderly facility for seniors who are lonely',
        'nursing home for elderly who fall frequently',
        'assisted living for seniors who forget medications',
        'elderly care for parents who need 24 hour supervision',
        'senior care for elderly who cannot cook',

        // Comparison keywords
        'assisted living vs nursing home',
        'memory care vs assisted living',
        'home care vs nursing home',
        'senior care facility vs retirement community',
        'skilled nursing vs assisted living',
        'independent living vs assisted living',
        'elderly care home vs home health care',
        'nursing home vs hospice care',

        // Question-based keywords
        'how much does it cost to put parent in nursing home',
        'what is the average cost of assisted living',
        'how do I know if my parent needs memory care',
        'what age qualifies for senior care facility',
        'where can I find affordable elderly care',
        'what documents needed for nursing home admission',
        'how long is the waiting list for senior care',
        'what happens during nursing home tour',
        'can I visit my parent in nursing home anytime',
        'what should I bring when moving parent to assisted living',

        // Service-specific deep keywords
        'personal care assistance for elderly',
        'bathing and grooming help for seniors',
        'meal preparation services for elderly',
        'housekeeping services in senior care',
        'transportation services for elderly residents',
        'pharmacy services in nursing home',
        'beauty salon services for seniors',
        'library services in assisted living',
        'chapel services in senior care facility',
        'therapy services for elderly residents',
    ],
};

export const defaultSeoConfig: SeoConfig = {
    title: 'Golden Years Care & Comfort Home | Best Senior Care Facility',
    description: 'Golden Years Care Home provides compassionate 24/7 elderly care services. Award-winning senior living facility offering nursing care, memory care, and assisted living for your loved ones.',
    keywords: [
        ...seoKeywords.primary,
        'best senior care home near me',
        '24 hour nursing care for elderly',
        'compassionate care for aging loved ones',
    ],
    ogImage: '/og-image.jpg',
    ogType: 'website',
};

export function useSeo(config: Partial<SeoConfig> = {}) {
    const seoConfig = ref<SeoConfig>({
        ...defaultSeoConfig,
        ...config,
    });

    const updateMetaTags = () => {
        // Title
        document.title = seoConfig.value.title;

        // Meta description
        updateMetaTag('description', seoConfig.value.description);

        // Meta keywords
        updateMetaTag('keywords', seoConfig.value.keywords.join(', '));

        // Meta robots
        if (seoConfig.value.robots) {
            updateMetaTag('robots', seoConfig.value.robots);
        } else {
            updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
        }

        // Meta author
        if (seoConfig.value.author) {
            updateMetaTag('author', seoConfig.value.author);
        }

        // Article meta tags
        if (seoConfig.value.articleAuthor) {
            updateMetaTag('article:author', seoConfig.value.articleAuthor, 'property');
        }
        if (seoConfig.value.articlePublishedTime) {
            updateMetaTag('article:published_time', seoConfig.value.articlePublishedTime, 'property');
        }
        if (seoConfig.value.articleModifiedTime) {
            updateMetaTag('article:modified_time', seoConfig.value.articleModifiedTime, 'property');
        }

        // Geo meta tags
        if (seoConfig.value.geoRegion) {
            updateMetaTag('geo.region', seoConfig.value.geoRegion);
        }
        if (seoConfig.value.geoPlacename) {
            updateMetaTag('geo.placename', seoConfig.value.geoPlacename);
        }
        if (seoConfig.value.geoPosition) {
            updateMetaTag('geo.position', seoConfig.value.geoPosition);
        }
        if (seoConfig.value.ICBM) {
            updateMetaTag('ICBM', seoConfig.value.ICBM);
        }

        // Open Graph tags
        updateMetaTag('og:title', seoConfig.value.title, 'property');
        updateMetaTag('og:description', seoConfig.value.description, 'property');
        updateMetaTag('og:type', seoConfig.value.ogType || 'website', 'property');
        updateMetaTag('og:image', seoConfig.value.ogImage || '/og-image.jpg', 'property');
        updateMetaTag('og:url', window.location.href, 'property');
        updateMetaTag('og:site_name', 'Golden Years Care & Comfort Home', 'property');

        // Twitter Card tags
        updateMetaTag('twitter:card', 'summary_large_image', 'name');
        updateMetaTag('twitter:title', seoConfig.value.title, 'name');
        updateMetaTag('twitter:description', seoConfig.value.description, 'name');
        updateMetaTag('twitter:image', seoConfig.value.ogImage || '/og-image.jpg', 'name');

        // Canonical URL
        updateCanonicalUrl(seoConfig.value.canonicalUrl || window.location.href);

        // Structured Data
        if (seoConfig.value.structuredData) {
            updateStructuredData(seoConfig.value.structuredData);
        }
    };

    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
        let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(attribute, name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    };

    const updateCanonicalUrl = (url: string) => {
        let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', url);
    };

    const updateStructuredData = (data: object) => {
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    };

    onMounted(() => {
        updateMetaTags();
    });

    watch(seoConfig, () => {
        updateMetaTags();
    }, { deep: true });

    return {
        seoConfig,
        updateMetaTags,
    };
}

// Structured Data Templates
export const structuredDataTemplates = {
    organization: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Golden Years Care & Comfort Home',
        url: 'https://goldenyearscare.com',
        logo: 'https://goldenyearscare.com/oldage-logo.png',
        description: 'Compassionate senior care facility providing 24/7 nursing care, memory care, and assisted living services.',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Care Lane',
            addressLocality: 'Peaceful Valley',
            addressRegion: 'State',
            postalCode: '12345',
            addressCountry: 'US',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-555-123-4567',
            contactType: 'customer service',
            availableLanguage: 'English',
        },
        sameAs: [
            'https://facebook.com/goldenyearscare',
            'https://twitter.com/goldenyearscare',
            'https://instagram.com/goldenyearscare',
        ],
    },

    localBusiness: {
        '@context': 'https://schema.org',
        '@type': 'NursingHome',
        name: 'Golden Years Care & Comfort Home',
        image: 'https://goldenyearscare.com/og-image.jpg',
        url: 'https://goldenyearscare.com',
        telephone: '+1-555-123-4567',
        email: 'care@goldenyears.org',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Care Lane',
            addressLocality: 'Peaceful Valley',
            addressRegion: 'State',
            postalCode: '12345',
            addressCountry: 'US',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 40.7128,
            longitude: -74.0060,
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59',
        },
        priceRange: '$$',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '150',
        },
    },

    breadcrumb: (items: Array<{ name: string; url: string }>) => ({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }),

    faqPage: (faqs: Array<{ question: string; answer: string }>) => ({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }),

    service: (name: string, description: string) => ({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        provider: {
            '@type': 'Organization',
            name: 'Golden Years Care & Comfort Home',
        },
        areaServed: {
            '@type': 'State',
            name: 'State',
        },
    }),

    review: (reviews: Array<{
        author: string;
        rating: number;
        reviewBody: string;
        datePublished?: string;
    }>) => ({
        '@context': 'https://schema.org',
        '@type': 'Review',
        itemReviewed: {
            '@type': 'NursingHome',
            name: 'Golden Years Care & Comfort Home',
        },
        reviewRating: {
            '@type': 'Rating',
            ratingValue: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
            bestRating: 5,
            worstRating: 1,
        },
        author: reviews.map((review) => ({
            '@type': 'Person',
            name: review.author,
        })),
        reviewBody: reviews.map((r) => r.reviewBody).join(' '),
    }),

    howTo: (name: string, description: string, steps: Array<{ name: string; text: string }>) => ({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        description,
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text,
        })),
    }),

    videoObject: (name: string, description: string, thumbnailUrl: string, contentUrl: string, uploadDate: string) => ({
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name,
        description,
        thumbnailUrl,
        contentUrl,
        uploadDate,
        publisher: {
            '@type': 'Organization',
            name: 'Golden Years Care & Comfort Home',
            logo: {
                '@type': 'ImageObject',
                url: 'https://goldenyearscare.com/oldage-logo.png',
            },
        },
    }),

    event: (name: string, description: string, startDate: string, endDate: string, location: string) => ({
        '@context': 'https://schema.org',
        '@type': 'Event',
        name,
        description,
        startDate,
        endDate,
        location: {
            '@type': 'Place',
            name: location,
            address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Care Lane',
                addressLocality: 'Peaceful Valley',
                addressRegion: 'State',
                postalCode: '12345',
                addressCountry: 'US',
            },
        },
        organizer: {
            '@type': 'Organization',
            name: 'Golden Years Care & Comfort Home',
        },
    }),

    medicalBusiness: {
        '@context': 'https://schema.org',
        '@type': 'MedicalBusiness',
        '@id': 'https://goldenyearscare.com/#medicalbusiness',
        name: 'Golden Years Care & Comfort Home',
        alternateName: 'Golden Years Senior Care',
        url: 'https://goldenyearscare.com',
        logo: 'https://goldenyearscare.com/oldage-logo.png',
        image: 'https://goldenyearscare.com/og-image.jpg',
        description: 'Compassionate senior care facility providing 24/7 nursing care, memory care, and assisted living services.',
        medicalSpecialty: [
            'Geriatrics',
            'Memory Care',
            'Rehabilitation Medicine',
            'Palliative Care',
        ],
        telephone: '+1-555-123-4567',
        email: 'care@goldenyears.org',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Care Lane',
            addressLocality: 'Peaceful Valley',
            addressRegion: 'State',
            postalCode: '12345',
            addressCountry: 'US',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 40.7128,
            longitude: -74.0060,
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59',
        },
        priceRange: '$$',
        paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Medicare', 'Medicaid', 'Insurance'],
        currenciesAccepted: 'USD',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '150',
            bestRating: '5',
            worstRating: '1',
        },
    },
};

// Page-specific SEO configurations
export const pageSeoConfigs = {
    home: {
        title: 'Golden Years Care & Comfort Home | Best Senior Care Facility Near You',
        description: 'Looking for the best senior care home for your loved ones? Golden Years provides compassionate 24/7 elderly care, nursing services, memory care & assisted living. Schedule a tour today!',
        keywords: [
            'best senior care home near me',
            'top rated elderly care facility',
            '24 hour nursing care for elderly parents',
            'compassionate care for aging loved ones',
            'safe place for elderly parents to live',
            'highly rated senior care facility',
            'affordable senior living options',
            'non-profit elderly care home',
            'assisted living facility with medical care',
            'senior care home with recreational activities',
            'how to choose a senior care facility',
            'what to look for in nursing home',
            'signs your parent needs assisted living',
            'schedule tour of senior care facility',
            'elderly care for parents who can no longer live alone',
            'assisted living vs nursing home',
            'how much does senior care cost',
            'award winning nursing home',
            'licensed elderly care facility',
            'family owned senior care facility',
        ],
    },

    about: {
        title: 'About Us | Our Mission & Story | Golden Years Senior Care Home',
        description: 'Learn about Golden Years Care Home\'s 30-year mission of providing dignified, compassionate care for seniors. Meet our award-winning team of caregivers dedicated to your loved ones.',
        keywords: [
            'about golden years care home',
            'senior care home history',
            'award winning nursing home team',
            'compassionate elderly care providers',
            'experienced senior care staff',
            'non-profit senior care mission',
            'dedicated elderly care professionals',
            'trusted nursing home since 1995',
        ],
    },

    services: {
        title: 'Senior Care Services | Nursing, Memory Care & Assisted Living | Golden Years',
        description: 'Comprehensive senior care services including 24/7 nursing care, memory care for dementia, physical therapy, assisted living & respite care. Personalized care plans for every resident.',
        keywords: [
            '24 hour nursing care for elderly',
            'memory care facility for dementia patients',
            'assisted living services for seniors',
            'physical therapy for elderly residents',
            'respite care services for senior citizens',
            'personalized senior care plans',
            'medical care facility for aging parents',
            'skilled nursing facility services',
            'rehabilitation services for elderly',
            'palliative care for seniors',
            'Alzheimer care facility for seniors',
            'dementia care home with specialized programs',
            'when to consider memory care',
            'memory care vs assisted living',
            'what services do nursing homes provide',
            'personal care assistance for elderly',
            'medication management for elderly residents',
            'chronic disease management for seniors',
            'post-surgery care for elderly',
            'wound care services for seniors',
        ],
    },

    gallery: {
        title: 'Photo Gallery | Our Facilities & Activities | Golden Years Care Home',
        description: 'Explore our beautiful senior care facilities, spacious rooms, gardens, and see our residents enjoying activities. Virtual tour of Golden Years Care & Comfort Home.',
        keywords: [
            'senior care home facilities photos',
            'nursing home virtual tour',
            'elderly care facility rooms',
            'senior living community amenities',
            'assisted living facility gallery',
            'nursing home activity photos',
            'senior care home environment',
            'elderly care facility tour',
        ],
    },

    contact: {
        title: 'Contact Us | Schedule a Tour | Golden Years Senior Care Home',
        description: 'Contact Golden Years Care Home to schedule a tour or get information about our senior care services. Call +1 (555) 123-4567 or fill out our contact form. We\'re here to help!',
        keywords: [
            'contact senior care home',
            'schedule nursing home tour',
            'senior care facility phone number',
            'elderly care home address',
            'nursing home consultation',
            'senior living inquiry',
            'assisted living facility contact',
            'get senior care information',
        ],
    },

    donate: {
        title: 'Donate | Support Senior Care | Golden Years Care Home',
        description: 'Support Golden Years non-profit senior care home. Your donation helps provide compassionate care for elderly residents who need financial assistance. Make a difference today!',
        keywords: [
            'donate to senior care home',
            'support elderly care charity',
            'non-profit nursing home donation',
            'help seniors in need',
            'elderly care financial assistance',
            'charitable giving for seniors',
            'sponsor senior care resident',
            'contribute to nursing home',
        ],
    },

    blog: {
        title: 'Senior Care Blog | Tips & Resources | Golden Years Care Home',
        description: 'Expert articles on senior care, aging tips, caregiver resources, and elderly health information. Stay informed with Golden Years Care Home\'s senior living blog.',
        keywords: [
            'senior care tips and advice',
            'elderly health information',
            'caregiver resources and support',
            'aging parent care guide',
            'nursing home selection tips',
            'senior wellness articles',
            'elderly care best practices',
            'family caregiver blog',
        ],
    },
};

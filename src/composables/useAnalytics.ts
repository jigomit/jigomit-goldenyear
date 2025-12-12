import { onMounted } from 'vue';

// Google Analytics 4 Configuration
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
const GTM_CONTAINER_ID = import.meta.env.VITE_GTM_CONTAINER_ID || '';

// Initialize Google Analytics 4
export function initGoogleAnalytics() {
    if (!GA_MEASUREMENT_ID) {
        console.warn('Google Analytics Measurement ID not configured');
        return;
    }

    // Load gtag script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
        window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
    });

    // Make gtag available globally
    (window as any).gtag = gtag;
}

// Initialize Google Tag Manager
export function initGoogleTagManager() {
    if (!GTM_CONTAINER_ID) {
        console.warn('Google Tag Manager Container ID not configured');
        return;
    }

    // GTM script
    const script1 = document.createElement('script');
    script1.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
    `;
    document.head.appendChild(script1);

    // GTM noscript
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.insertBefore(noscript, document.body.firstChild);
}

// Track page views
export function trackPageView(path: string, title?: string) {
    if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('config', GA_MEASUREMENT_ID, {
            page_path: path,
            page_title: title || document.title,
        });
    }

    // GTM page view
    if (typeof (window as any).dataLayer !== 'undefined') {
        (window as any).dataLayer.push({
            event: 'page_view',
            page_path: path,
            page_title: title || document.title,
        });
    }
}

// Track events
export function trackEvent(
    eventName: string,
    eventCategory: string,
    eventLabel?: string,
    value?: number
) {
    if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', eventName, {
            event_category: eventCategory,
            event_label: eventLabel,
            value: value,
        });
    }

    // GTM event
    if (typeof (window as any).dataLayer !== 'undefined') {
        (window as any).dataLayer.push({
            event: eventName,
            event_category: eventCategory,
            event_label: eventLabel,
            value: value,
        });
    }
}

// Track conversions
export function trackConversion(conversionType: string, value?: number) {
    trackEvent('conversion', conversionType, undefined, value);
}

// Track form submissions
export function trackFormSubmission(formName: string) {
    trackEvent('form_submit', 'engagement', formName);
    trackConversion('form_submission');
}

// Track phone calls
export function trackPhoneCall(phoneNumber: string) {
    trackEvent('phone_call', 'contact', phoneNumber);
    trackConversion('phone_call');
}

// Track email clicks
export function trackEmailClick(email: string) {
    trackEvent('email_click', 'contact', email);
}

// Track tour scheduling
export function trackTourSchedule() {
    trackEvent('schedule_tour', 'conversion', 'tour_request');
    trackConversion('tour_schedule');
}

// Track button clicks
export function trackButtonClick(buttonName: string, location: string) {
    trackEvent('button_click', 'engagement', `${buttonName}_${location}`);
}

// Initialize analytics on mount
export function useAnalytics() {
    onMounted(() => {
        initGoogleAnalytics();
        initGoogleTagManager();
        trackPageView(window.location.pathname, document.title);
    });

    return {
        trackPageView,
        trackEvent,
        trackConversion,
        trackFormSubmission,
        trackPhoneCall,
        trackEmailClick,
        trackTourSchedule,
        trackButtonClick,
    };
}

// TypeScript declarations
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}


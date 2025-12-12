<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useRoute } from 'vue-router';
import { useSeo, pageSeoConfigs, structuredDataTemplates } from '@/composables/useSeo';

// SEO Configuration for Blog Page
useSeo({
    ...pageSeoConfigs.blog,
    structuredData: structuredDataTemplates.breadcrumb([
        { name: 'Home', url: 'https://goldenyearscare.com/' },
        { name: 'Blog', url: 'https://goldenyearscare.com/blog' },
    ]),
});

const route = useRoute();

const blogPosts = [
    {
        id: 1,
        title: 'The Importance of Compassionate Care in Senior Living',
        excerpt: 'Discover how compassionate care transforms the lives of our residents and creates a warm, loving environment where seniors can thrive.',
        content: `At Golden Years Care & Comfort Home, we believe that compassionate care is the foundation of exceptional senior living. Our approach goes beyond meeting basic needs—we create meaningful connections, respect individual dignity, and foster a sense of belonging.

Every day, our dedicated team members take the time to understand each resident's unique story, preferences, and needs. This personalized attention ensures that our residents feel valued, heard, and truly at home.

Compassionate care means:
- Listening with empathy and understanding
- Respecting each resident's autonomy and choices
- Creating opportunities for joy and fulfillment
- Supporting families through every step of the journey
- Building a community where everyone feels connected

When seniors receive care that comes from the heart, they don't just survive—they thrive. They maintain their sense of purpose, stay engaged with life, and continue to grow and learn. This is the difference that compassionate care makes.`,
        author: 'Sarah Johnson',
        date: 'March 15, 2024',
        category: 'Care Philosophy',
        image: '/Compassionate.jpg',
    },
    {
        id: 2,
        title: 'Creating Meaningful Activities for Seniors: A Guide to Engagement',
        excerpt: 'Learn how structured activities and social engagement contribute to the physical, mental, and emotional well-being of our residents.',
        content: `Engagement is essential for senior well-being. At Golden Years, we've developed a comprehensive activity program that addresses physical health, cognitive stimulation, social connection, and emotional fulfillment.

Our activity calendar includes:
- Art therapy sessions that encourage creativity and self-expression
- Music therapy that brings joy and can help with memory recall
- Gardening programs that connect residents with nature
- Social gatherings that build friendships and community
- Exercise classes tailored to different mobility levels
- Educational workshops and guest speakers

Research shows that seniors who stay active and engaged experience:
- Better physical health and mobility
- Improved cognitive function and memory
- Reduced feelings of loneliness and depression
- Increased sense of purpose and satisfaction
- Stronger immune systems

We work closely with each resident to identify activities that align with their interests and abilities. Whether it's painting, gardening, playing cards, or simply enjoying a cup of coffee with friends, every activity is designed to bring joy and meaning to their day.

The key is variety, choice, and respect for individual preferences. When seniors have opportunities to engage in activities they love, they maintain their independence, build confidence, and continue to grow.`,
        author: 'Michael Chen',
        date: 'March 10, 2024',
        category: 'Activities & Wellness',
        image: '/Social.jpg',
    },
    {
        id: 3,
        title: 'How to Choose the Right Senior Care Facility: A Complete Guide for Families',
        excerpt: 'Discover the essential factors to consider when selecting a senior care facility, from location and amenities to staff qualifications and care philosophy.',
        content: `Choosing the right senior care facility for your loved one is one of the most important decisions you'll make. With so many options available, it can feel overwhelming. This comprehensive guide will help you navigate the process and find the perfect home for your family member.

When searching for a senior care facility near you, there are several key factors to consider:

**Location and Accessibility**
The best senior care facility should be conveniently located for family visits. Consider proximity to hospitals, shopping centers, and places of worship. Easy access ensures you can visit regularly and your loved one can maintain connections with their community.

**Staff Qualifications and Training**
Look for facilities with licensed nurses, certified caregivers, and ongoing staff training programs. At Golden Years, all our staff members are trained in compassionate care, dementia support, and emergency response protocols. The staff-to-resident ratio is also crucial—ensure there are enough caregivers to provide personalized attention.

**Amenities and Services**
What amenities should you look for in an assisted living facility? Essential services include:
- 24/7 medical support and emergency response systems
- Nutritious meal planning and special dietary accommodations
- Housekeeping and laundry services
- Transportation for medical appointments and outings
- Social and recreational activities
- Spiritual and emotional support services

**Care Philosophy and Approach**
Understanding how to choose the right senior care facility means finding one that aligns with your values. Visit the facility, observe interactions between staff and residents, and ask about their care philosophy. Do they respect resident autonomy? How do they handle medical emergencies? What is their approach to end-of-life care?

**Cost and Financial Planning**
Affordable senior living options are available, but it's important to understand all costs upfront. Ask about:
- Monthly fees and what's included
- Additional charges for specialized care
- Financial assistance programs
- Insurance and Medicare acceptance
- Payment plans and options

**Safety and Security**
The right senior care facility prioritizes safety with:
- Secure entrances and exits
- Emergency call systems in every room
- Fall prevention measures
- Fire safety systems
- Regular health and safety inspections

**Making the Decision**
Schedule tours, ask questions, and trust your instincts. The best facility will feel like home—warm, welcoming, and focused on your loved one's well-being. At Golden Years Care & Comfort Home, we welcome families to visit, ask questions, and see firsthand how we provide exceptional care.

Remember, choosing a senior care facility is not just about finding a place to live—it's about finding a community where your loved one can thrive, maintain dignity, and enjoy their golden years with comfort and joy.`,
        author: 'Emily Rodriguez',
        date: 'March 20, 2024',
        category: 'Family Resources',
        image: '/Family.jpg',
    },
    {
        id: 4,
        title: 'Signs Your Parent Needs Assisted Living: A Comprehensive Guide for Families',
        excerpt: 'Recognizing when it\'s time to consider assisted living for your aging parent can be challenging. Learn the key warning signs and how to make the best decision for your loved one\'s safety and wellbeing.',
        content: `As our parents age, many families face the difficult question: "When is it time to consider assisted living?" This decision is never easy, but recognizing the warning signs early can help ensure your loved one receives the care they need while maintaining their dignity and quality of life.

Understanding when your parent needs assisted living is crucial for their safety, health, and overall wellbeing. At Golden Years Care & Comfort Home, we've helped hundreds of families navigate this transition, and we understand the emotional weight of this decision.

**Physical Health Warning Signs**

One of the most critical indicators that your parent may need assisted living is a decline in their physical health. If you notice any of the following, it's time to have a serious conversation:

- Frequent falls or balance issues that weren't present before
- Difficulty managing medications or missing doses regularly
- Unexplained weight loss or changes in eating habits
- Declining personal hygiene or inability to maintain cleanliness
- Chronic health conditions that require regular monitoring
- Mobility issues that make daily tasks dangerous or impossible

When these physical signs appear, it often means your parent needs 24 hour nursing care for elderly support that may not be available at home. Assisted living facilities provide round-the-clock medical monitoring and immediate access to healthcare professionals.

**Cognitive and Memory Concerns**

Memory issues and cognitive decline are among the most common reasons families seek assisted living services. Warning signs include:

- Forgetting to take medications or taking incorrect dosages
- Getting lost in familiar places
- Repeating questions or conversations multiple times
- Difficulty managing finances or paying bills on time
- Confusion about time, dates, or current events
- Poor judgment in decision-making

If you notice these signs, your parent may benefit from a memory care facility for dementia patients. Early intervention can help slow cognitive decline and ensure your loved one receives specialized care tailored to their needs.

**Safety and Home Management Issues**

A safe place for elderly parents to live is essential. If your parent's home is becoming unsafe, it's a clear indicator that assisted living may be necessary:

- Inability to maintain the home (dirty dishes, unkempt living spaces)
- Leaving the stove on or other dangerous situations
- Difficulty navigating stairs or home hazards
- Isolation and lack of social interaction
- Inability to drive safely but still attempting to do so
- Neglecting home maintenance and repairs

When home becomes unsafe, finding a caring environment for senior citizens becomes a priority. Assisted living facilities are designed with safety in mind, featuring emergency call systems, fall prevention measures, and 24/7 supervision.

**Social and Emotional Indicators**

Loneliness and social isolation can significantly impact an elderly person's mental and physical health. Watch for:

- Withdrawal from social activities they once enjoyed
- Depression or mood changes
- Lack of interest in hobbies or activities
- Difficulty maintaining friendships
- Increased reliance on family for social interaction

Senior care with recreational activities can help combat isolation and improve quality of life. Many assisted living facilities offer comprehensive activity programs designed to keep residents engaged and connected.

**Financial and Legal Concerns**

Sometimes, the need for assisted living becomes apparent through financial difficulties:

- Unpaid bills or financial mismanagement
- Falling victim to scams or financial exploitation
- Inability to manage banking or financial transactions
- Concerns about financial security and planning

Affordable senior living options are available, and many facilities offer financial assistance programs for those who qualify. It's important to discuss costs and payment options early in the decision-making process.

**When to Act: The Critical Decision Point**

The question "when to consider memory care" or assisted living often comes down to safety and quality of life. If your parent's current living situation poses risks to their health or safety, it's time to explore options.

Key questions to ask yourself:
- Is my parent safe living alone?
- Can they get help quickly in an emergency?
- Are their basic needs being met?
- Is their quality of life declining?
- Am I experiencing caregiver burnout?

**Making the Transition Easier**

If you've identified that your parent needs assisted living, the next step is finding the right facility. Look for:

- Licensed and accredited facilities with good ratings
- Staff trained in elderly care and dementia support
- Clean, well-maintained facilities
- Positive reviews from families
- Activities and programs that match your parent's interests
- Proximity to family for regular visits

**The Benefits of Early Intervention**

Moving to assisted living before a crisis occurs has numerous advantages:

- Your parent can participate in the decision-making process
- You have time to find the best facility
- The transition is less stressful for everyone
- Your parent can adjust while they're still relatively independent
- You can ensure they receive appropriate care as needs increase

**Conclusion: Trust Your Instincts**

Recognizing the signs your parent needs assisted living is the first step toward ensuring they receive the compassionate care for aging loved ones they deserve. If you're noticing multiple warning signs, it's time to schedule tours and explore your options.

At Golden Years Care & Comfort Home, we understand that this decision is never easy. We're here to help families navigate this transition with compassion, respect, and professional guidance. Our goal is to provide a home-like atmosphere for elderly care where your loved one can thrive, maintain dignity, and enjoy their golden years.

Remember, seeking help isn't a sign of failure—it's an act of love. By recognizing when your parent needs additional support, you're ensuring they receive the best possible care in a safe, supportive environment.`,
        author: 'Dr. Sarah Johnson',
        date: 'Jan 5, 2005',
        category: 'Family Resources',
        image: '/Health.jpg',
    },
    {
        id: 5,
        title: 'Nutrition and Wellness: The Foundation of Healthy Aging',
        excerpt: 'Discover how proper nutrition, personalized meal plans, and wellness programs contribute to the vitality and longevity of our senior residents.',
        content: `At Golden Years Care & Comfort Home, we understand that nutrition is the cornerstone of healthy aging. Our comprehensive wellness program goes beyond simply providing meals—we create personalized nutrition plans that support each resident's unique health needs, preferences, and medical requirements.

**The Importance of Proper Nutrition for Seniors**

As we age, our nutritional needs change significantly. Seniors require:
- Higher protein intake to maintain muscle mass and strength
- Increased calcium and vitamin D for bone health
- Adequate hydration to prevent dehydration
- Balanced meals that support cognitive function
- Specialized diets for chronic conditions like diabetes, heart disease, and hypertension

Our registered dietitians work closely with each resident and their healthcare providers to develop meal plans that address these specific needs while respecting personal preferences and cultural backgrounds.

**Our Approach to Senior Nutrition**

Every meal at Golden Years is designed with health and enjoyment in mind:

- **Fresh, Locally Sourced Ingredients**: We prioritize fresh, seasonal produce and high-quality proteins to ensure maximum nutritional value and flavor.

- **Personalized Meal Plans**: Whether a resident needs a diabetic-friendly diet, low-sodium options, or texture-modified meals, we customize every plan to their specific requirements.

- **Regular Nutritional Assessments**: Our team conducts ongoing assessments to ensure each resident's nutritional needs are being met and adjusts plans as health conditions change.

- **Social Dining Experience**: Meals are served in our beautiful dining room, creating opportunities for social connection and community building—an essential component of overall wellness.

**Wellness Programs Beyond Nutrition**

Nutrition is just one part of our comprehensive wellness approach. We also offer:

- **Exercise Programs**: Tailored to different mobility levels, including chair exercises, gentle yoga, and walking groups
- **Mental Health Support**: Regular counseling sessions, support groups, and activities that promote emotional wellbeing
- **Preventive Care**: Regular health screenings, medication management, and coordination with healthcare providers
- **Recreational Activities**: Engaging programs that keep residents active, social, and mentally stimulated

**The Results Speak for Themselves**

Residents who participate in our wellness programs experience:
- Improved energy levels and physical strength
- Better management of chronic health conditions
- Enhanced cognitive function and memory
- Stronger immune systems and faster recovery from illness
- Increased sense of independence and confidence
- Better sleep quality and overall mood

**Family Involvement**

We believe families play a crucial role in their loved one's wellness journey. We regularly communicate with families about their loved one's nutritional status, health improvements, and any concerns. Family members are always welcome to join us for meals and see firsthand how we care for their loved ones.

**A Commitment to Excellence**

At Golden Years, we're committed to providing the highest standard of nutritional care. Our kitchen staff is trained in senior nutrition, food safety, and special dietary needs. We maintain the highest standards of cleanliness and food preparation, ensuring every meal is not only nutritious but also safe and delicious.

Remember, proper nutrition isn't just about eating—it's about nourishing the body, mind, and spirit. When seniors receive the right nutrition in a supportive, caring environment, they don't just live longer—they live better.`,
        author: 'Chef Maria Thompson',
        date: 'March 05, 2002',
        category: 'Wellness & Nutrition',
        image: '/dining.jpg',
    },
    {
        id: 6,
        title: 'Building a Supportive Community: The Social Benefits of Senior Living',
        excerpt: 'Learn how living in a senior care community provides essential social connections, reduces isolation, and creates a sense of belonging that enhances quality of life.',
        content: `One of the most significant benefits of senior living communities is the opportunity to build meaningful social connections. At Golden Years Care & Comfort Home, we've created a vibrant, supportive community where residents form lasting friendships, share experiences, and support one another through life's journey.

**The Epidemic of Senior Isolation**

Loneliness and social isolation are serious health concerns for seniors. Research shows that isolated seniors are at higher risk for:
- Depression and anxiety
- Cognitive decline and dementia
- Cardiovascular disease
- Weakened immune systems
- Premature mortality

Many seniors living alone experience social isolation, especially after the loss of a spouse, retirement, or when family members move away. This isolation can have devastating effects on both physical and mental health.

**How Senior Living Communities Combat Isolation**

At Golden Years, we've designed our community to naturally foster social connections:

- **Common Areas for Gathering**: Our beautifully designed common areas encourage residents to come together for conversation, games, or simply enjoying each other's company.

- **Structured Social Activities**: From book clubs and card games to movie nights and holiday celebrations, we offer a full calendar of activities that bring residents together.

- **Shared Dining Experiences**: Meals are served in our community dining room, providing daily opportunities for social interaction and relationship building.

- **Interest-Based Groups**: Residents can join groups based on shared interests—gardening, art, music, exercise, or discussion groups—creating natural connections with like-minded peers.

- **Volunteer Opportunities**: Many residents find purpose and connection through volunteering within our community or with local organizations.

**The Power of Peer Support**

One of the unique aspects of senior living is the peer support that naturally develops. Residents who have experienced similar life transitions can offer understanding, empathy, and practical advice to newcomers. This peer support is invaluable for:

- Adjusting to life in a new environment
- Coping with health challenges
- Processing grief and loss
- Finding new purpose and meaning
- Maintaining independence and confidence

**Intergenerational Connections**

We also facilitate connections between residents and younger generations through:
- Visits from local school children
- Family events and celebrations
- Community outreach programs
- Storytelling sessions where residents share their life experiences

These intergenerational connections benefit both seniors and children, creating meaningful relationships that enrich everyone's lives.

**Supporting Family Relationships**

Living in a senior community doesn't mean losing family connections—it often strengthens them. When families know their loved one is safe, well-cared for, and socially engaged, they can focus on quality time together rather than worrying about daily care needs. Our community welcomes family members to participate in activities, join for meals, and be part of the community.

**Building a Sense of Belonging**

Every resident at Golden Years is valued as an individual with unique experiences, talents, and contributions. We work to ensure everyone feels:

- **Welcomed**: New residents are paired with "community ambassadors" who help them adjust and make connections.

- **Valued**: We recognize and celebrate each resident's contributions, whether through sharing skills, participating in activities, or simply being a good friend to others.

- **Included**: Our activities and programs are designed to be accessible to residents of all abilities, ensuring everyone can participate and contribute.

- **Respected**: We honor each resident's autonomy, preferences, and dignity in all our interactions.

**The Results: A Thriving Community**

When seniors live in a supportive, socially engaged community, the benefits are remarkable:

- Improved mental health and emotional wellbeing
- Better physical health through increased activity and engagement
- Enhanced cognitive function through social stimulation
- Reduced feelings of loneliness and depression
- Increased sense of purpose and meaning
- Longer, healthier lives

**Creating Your Community**

If you're considering senior living for yourself or a loved one, we encourage you to visit our community and see firsthand how we build connections. Talk to our residents, participate in an activity, and experience the warmth and camaraderie that makes Golden Years a true community.

At Golden Years Care & Comfort Home, we believe that everyone deserves to live in a community where they feel connected, valued, and supported. Building these connections isn't just part of what we do—it's at the heart of who we are.`,
        author: 'James Wilson',
        date: 'April 18, 2024',
        category: 'Community & Social',
        image: '/Building.jpg',
    },
];

const selectedPost = ref<typeof blogPosts[0] | null>(null);

const openPost = (post: typeof blogPosts[0]) => {
    selectedPost.value = post;
    document.body.style.overflow = 'hidden';
};

const closePost = () => {
    selectedPost.value = null;
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
        <!-- Hero Section -->
        <section class="relative py-24 lg:py-32 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-light)]"></div>
            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6 fade-up">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                    </svg>
                    Insights & Stories
                </div>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 fade-up" style="animation-delay: 0.2s;">
                    Our
                    <span class="text-[var(--color-secondary)]">Blog</span>
                </h1>
                <p class="text-xl text-white/80 max-w-3xl mx-auto fade-up" style="animation-delay: 0.4s;">
                    Discover insights, stories, and tips about senior care, wellness, and creating meaningful experiences for our beloved residents.
                </p>
            </div>
        </section>

        <!-- Blog Posts -->
        <section id="blog-posts" data-animate class="py-20 lg:py-32">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
                    <article
                        v-for="(post, index) in blogPosts"
                        :key="post.id"
                        :class="[
                            'bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer',
                            isVisible['blog-posts'] ? 'fade-up' : 'opacity-0'
                        ]"
                        :style="{ animationDelay: `${index * 0.2}s` }"
                        @click="openPost(post)"
                    >
                        <div class="relative h-64 overflow-hidden">
                            <img
                                :src="post.image"
                                :alt="`${post.title} - Senior Care Blog Article at Golden Years Care Home`"
                                class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                            />
                            <div class="absolute top-4 left-4">
                                <span class="px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold">
                                    {{ post.category }}
                                </span>
                            </div>
                        </div>
                        <div class="p-6 lg:p-8">
                            <div class="flex items-center gap-4 text-sm text-[var(--color-soft-gray)] mb-4">
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {{ post.author }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {{ post.date }}
                                </span>
                            </div>
                            <h2 class="text-2xl lg:text-3xl font-bold text-[var(--color-dark-text)] mb-4 hover:text-[var(--color-primary)] transition-colors">
                                {{ post.title }}
                            </h2>
                            <p class="text-[var(--color-soft-gray)] leading-relaxed mb-6">
                                {{ post.excerpt }}
                            </p>
                            <button class="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:gap-3 transition-all">
                                Read More
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- Blog Post Modal -->
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
                    v-if="selectedPost"
                    class="blog-modal-overlay fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto"
                    @click.self="closePost"
                >
                    <div class="max-w-4xl w-full bg-white rounded-3xl shadow-2xl my-8 flex flex-col max-h-[90vh]">
                        <!-- Image Section -->
                        <div class="relative h-80 lg:h-96 overflow-hidden rounded-t-3xl flex-shrink-0">
                            <img
                                :src="selectedPost.image"
                                :alt="`${selectedPost.title} - Golden Years Senior Care Blog - Expert Elderly Care Information`"
                                class="w-full h-full object-cover object-center"
                            />
                            <div class="absolute top-4 left-4">
                                <span class="px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold backdrop-blur-sm">
                                    {{ selectedPost.category }}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Content Section -->
                        <div class="blog-modal-content p-8 lg:p-12 overflow-y-auto flex-1">
                            <div class="flex items-center gap-4 text-sm text-[var(--color-soft-gray)] mb-6 flex-wrap">
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {{ selectedPost.author }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {{ selectedPost.date }}
                                </span>
                            </div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-[var(--color-dark-text)] mb-6">
                                {{ selectedPost.title }}
                            </h1>
                            <div class="prose prose-lg max-w-none text-[var(--color-soft-gray)] leading-relaxed mb-8">
                                <p v-for="(paragraph, index) in selectedPost.content.split('\n\n')" :key="index" class="mb-4 whitespace-pre-line">
                                    {{ paragraph }}
                                </p>
                            </div>
                        </div>
                        
                        <!-- Bottom Close Button -->
                        <div class="p-6 lg:p-8 border-t border-gray-200 flex-shrink-0 flex justify-end">
                            <button
                                @click="closePost"
                                class="py-2.5 px-5 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </MainLayout>
</template>

<style scoped>
.blog-modal-overlay {
    scrollbar-width: none;
}

.blog-modal-overlay::-webkit-scrollbar {
    display: none;
}

.blog-modal-content {
    scrollbar-width: none;
}

.blog-modal-content::-webkit-scrollbar {
    display: none;
}
</style>


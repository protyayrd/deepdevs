
export interface FAQ {
    id: string;
    page: string;
    question: string;
    answer: string;
}

export interface ContactSubmission {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    subject: string;
    message: string;
    isRobot: boolean;
    submittedAt: string;
}

export interface Testimonial {
    id: string;
    page: string;
    customerName: string;
    location: string;
    avatar: string;
    content: string;
    rating?: number;
    isActive: boolean;
    order: number;
}

export interface AppLink {
    id: string;
    appName: string;
    appDisplayName: string;
    websiteUrl: string;
    appStoreUrl: string;
    playStoreUrl: string;
    appIcon: string;
    mockupImage: string;
    qrCode: string;
    appDescription: string;
    features: string[];
    platforms: string[];
    order: number;
    isActive: boolean;
}

export interface PageContent {
    id: string;
    slug: string;
    title: string;
    content: string;
    metaDescription?: string;
    isPublished: boolean;
}

export interface DashboardStats {
    counts: {
        contacts: number;
        faqs: number;
        testimonials: number;
        pages: number;
    };
    recentContacts: ContactSubmission[];
}

// Homepage Content Types
export interface HomepageStats {
    customerCount: string;
    customerCountNumber: number;
    satisfactionRate: number;
}

export interface HeroAvatar {
    src: string;
    alt: string;
    order: number;
}

export interface FeatureCard {
    title: string;
    description: string;
    image: string;
    order: number;
}

export interface AppSliderItem {
    appId: string;
    eyebrow: string;
    title: string;
    description: string;
    accentColor: string;
    phoneImage: string;
    playStoreUrl?: string;
    appStoreUrl?: string;
    order: number;
}

export interface StoreBadges {
    playStoreBadge: string;
    appStoreBadge: string;
    defaultPlayStoreUrl: string;
    defaultAppStoreUrl: string;
}

export interface FeaturedApp {
    id: string;
    title: string;
    description: string;
    link: string;
    iconUrl: string;
    order: number;
}

export interface FooterLink {
    label: string;
    url: string;
}

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export interface FooterContent {
    socialLinks: {
        facebook: string;
        instagram: string;
        twitter?: string;
        linkedin?: string;
        youtube?: string;
    };
    columns: FooterColumn[];
    copyrightText: string;
}

export interface HomepageContent {
    stats: HomepageStats;
    heroAvatars: HeroAvatar[];
    featureCards: FeatureCard[];
    appSliderItems: AppSliderItem[];
    storeBadges?: StoreBadges;
    featuredApps?: FeaturedApp[];
    footer?: FooterContent;
    testimonialsConfig?: {
        sectionTitle: string;
        sectionSubtitle: string;
        sectionDescription: string;
    };
}


// Yoler Content Types
export interface YolerHero {
    title: string;
    appStoreUrl: string;
    playStoreUrl: string;
    heroImage: string;
    logo: string;
}

export interface YolerFeatureCard {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
}

export interface YolerBrand {
    id: string;
    name: string;
    logoUrl: string;
    order: number;
}

export interface YolerTheoryTestApp {
    title: string;
    description1: string;
    description2: string;
    phoneImage: string;
}

export interface YolerFeatureGridItem {
    id: string;
    title: string;
    isList: boolean;
    listItems: string[];
    icon: string;
    backgroundColor: string;
    order: number;
}

export interface YolerInfoSection {
    id: string;
    title: string;
    description: string[];
    image: string;
    imagePosition: 'left' | 'right';
}

export interface YolerDownloadCta {
    title: string;
    appStoreUrl: string;
    playStoreUrl: string;
}

export interface YolerContent {
    hero?: YolerHero;
    featureCards?: YolerFeatureCard[];
    featuredBrands?: YolerBrand[];
    theoryTestApp?: YolerTheoryTestApp;
    featuresGrid?: YolerFeatureGridItem[];
    infoSections?: YolerInfoSection[];
    downloadCta?: YolerDownloadCta;
}

// SeSign Content Types
export interface SeSignHero {
    tag: string;
    title: string;
    subtitle: string;
    leftImage: string;
    rightImage: string;
    bottomLeftImage: string;
    bottomRightImage: string;
    happyClientsCount: string;
    happyClientsLabel: string;
}

export interface SeSignBrand {
    id: string;
    name: string;
    logoUrl: string;
    order: number;
}

export interface SeSignMetricCard {
    id: string;
    value: string;
    suffix?: string;
    label: string;
    order: number;
}

export interface SeSignAbout {
    tag: string;
    title: string;
    subtitle: string;
    cards: SeSignMetricCard[];
}

export interface SeSignFeatureCard {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
}

export interface SeSignFeatures {
    tag: string;
    title: string;
    subtitle: string;
    cards: SeSignFeatureCard[];
}

export interface SeSignWorkAnywhere {
    tag: string;
    title: string;
    subtitle: string;
    heroImage: string;
    order: number;
}

export interface SeSignTestimonial {
    id: string;
    text: string;
    userName: string;
    userLocation: string;
    userAvatar: string;
    order: number;
}

export interface SeSignTestimonialsSection {
    title: string;
    subtitle: string;
    items: SeSignTestimonial[];
}

export interface SeSignIntegration {
    id: string;
    name: string;
    icon: string;
    order: number;
}

export interface SeSignIntegrationsSection {
    tag: string;
    title: string;
    subtitle: string;
    items: SeSignIntegration[];
}

export interface SeSignDownloadCta {
    title: string;
    subtitle: string;
    appStoreUrl: string;
    playStoreUrl: string;
    phoneImage: string;
}

export interface SeSignContent {
    hero?: SeSignHero;
    featuredBrands?: SeSignBrand[];
    about?: SeSignAbout;
    features?: SeSignFeatures;
    workAnywhere?: SeSignWorkAnywhere;
    testimonials?: SeSignTestimonialsSection;
    integrations?: SeSignIntegrationsSection;
    downloadCta?: SeSignDownloadCta;
}

// Ztax Content Types
export interface ZtaxHero {
    title: string;
    subtitle: string;
    appStoreUrl: string;
    playStoreUrl: string;
    heroImage: string;
    logo: string;
}

export interface ZtaxStat {
    id: string;
    number: string;
    text: string;
    backgroundColor: string;
    icon: string;
    order: number;
}

export interface ZtaxFeature {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
}

export interface ZtaxPowerfulFeatureStep {
    id: string;
    title: string;
    description: string;
    order: number;
}

export interface ZtaxPowerfulFeatures {
    title: string;
    subtitle: string;
    steps: ZtaxPowerfulFeatureStep[];
    phoneImage: string;
}

export interface ZtaxTestimonial {
    id: string;
    quote: string;
    authorName: string;
    authorRole: string;
    avatar: string;
    order: number;
}

export interface ZtaxPlan {
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    order: number;
}

export interface ZtaxPricing {
    title: string;
    subtitle: string;
    description: string;
    plans: ZtaxPlan[];
}

export interface ZtaxContent {
    hero?: ZtaxHero;
    stats?: ZtaxStat[];
    features?: ZtaxFeature[];
    powerfulFeatures?: ZtaxPowerfulFeatures;
    testimonials?: ZtaxTestimonial[];
    pricing?: ZtaxPricing;
}

// Plantzify Content Types
export interface PlantzifyHero {
    welcomeText: string;
    title: string;
    subtitle: string;
    appStoreUrl: string;
    playStoreUrl: string;
    heroImage: string;
    logo: string;
}

export interface PlantzifyFeature {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface PlantzifyProblemSolution {
    id: string;
    title: string;
    description: string;
    image: string;
    imagePosition: 'left' | 'right';
}

export interface PlantzifyTestimonial {
    text: string;
    name: string;
    avatar: string;
    rating: number;
}

export interface PlantzifyGalleryImage {
    id: string;
    imageUrl: string;
    altText: string;
}

export interface PlantzifyBlogPost {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;
    readTime: string;
}

export interface PlantzifyDownloadCta {
    title: string;
    appStoreUrl: string;
    playStoreUrl: string;
    phoneImage: string;
}

export interface PlantzifyContent {
    hero?: PlantzifyHero;
    features?: PlantzifyFeature[];
    problemSolution?: PlantzifyProblemSolution[];
    testimonials?: PlantzifyTestimonial[];
    gallery?: PlantzifyGalleryImage[];
    blog?: PlantzifyBlogPost[];
    downloadCta?: PlantzifyDownloadCta;
}

// Deep Study AI Content Types
export interface DeepStudyHero {
    title: string;
    subtitle: string;
    appStoreUrl: string;
    playStoreUrl: string;
    heroImage: string;
    logo: string;
}

export interface DeepStudyStat {
    id: string;
    value: string;
    label: string;
    icon: string;
    order: number;
}

export interface DeepStudyFeature {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
}

export interface DeepStudyProcessStep {
    id: string;
    title: string;
    description: string;
    image: string;
    overlayImage?: string;
    buttonText: string;
    order: number;
}

export interface DeepStudyBlogCard {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    order: number;
}

export interface DeepStudyContent {
    hero?: DeepStudyHero;
    stats?: DeepStudyStat[];
    featuresHeader?: { title: string; subtitle: string };
    features?: DeepStudyFeature[];
    processHeader?: { title: string; subtitle: string };
    processSteps?: DeepStudyProcessStep[];
    blogHeader?: { title: string };
    blogCards?: DeepStudyBlogCard[];
}

export interface AppsHero {
    tag: string;
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    heroImage: string;
}

export interface AppsContent {
    hero?: AppsHero;
}

export const PAGE_OPTIONS = [
    { value: 'homepage', label: 'Homepage' },
    { value: 'yoler', label: 'Yoler' },
    { value: 'plantzify', label: 'Plantzify' },
    { value: 'sesign', label: 'SeSign' },
    { value: 'deep-study-ai', label: 'Deep Study AI' },
    { value: 'ztax', label: 'Ztax' },
];

export type TabType = 'dashboard' | 'homepage' | 'faqs' | 'contacts' | 'testimonials' | 'app-links' | 'pages' | 'yoler' | 'plantzify' | 'deep-study-ai' | 'sesign' | 'ztax' | 'apps-page';

/**
 * Seed Script for Dynamic CMS Content
 * 
 * This script seeds the MongoDB database with initial content extracted from
 * the currently hardcoded pages. Run this after setting up the models and APIs.
 * 
 * Usage: node scripts/seed-content.js
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Use fallback to localhost if no env var is set (same as main app)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/deepdevs-app';

console.log('Using MongoDB URI:', MONGODB_URI.replace(/\/\/.*@/, '//***@'));

// Define schemas inline for the seed script
const TestimonialSchema = new mongoose.Schema({
    page: { type: String, required: true },
    customerName: { type: String, required: true },
    location: { type: String, required: true },
    avatar: { type: String, default: '' },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

const AppLinkSchema = new mongoose.Schema({
    appName: { type: String, required: true, unique: true, lowercase: true },
    appDisplayName: { type: String, required: true },
    appStoreUrl: { type: String, default: '#' },
    playStoreUrl: { type: String, default: '#' },
    appIcon: { type: String, default: '' },
    appDescription: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const PageSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true, lowercase: true },
    title: { type: String, required: true },
    content: { type: String, required: true, default: '' },
    metaDescription: { type: String, default: '' },
    metaKeywords: { type: String, default: '' },
    isPublished: { type: Boolean, default: true },
}, { timestamps: true });

const NavigationSchema = new mongoose.Schema({
    position: { type: String, required: true, unique: true },
    items: [{
        id: String,
        label: String,
        href: String,
        isExternal: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
    }],
}, { timestamps: true });

// Get or create models
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
const AppLink = mongoose.models.AppLink || mongoose.model('AppLink', AppLinkSchema);
const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);
const Navigation = mongoose.models.Navigation || mongoose.model('Navigation', NavigationSchema);

// Seed Data
const testimonials = [
    // Yoler testimonials
    {
        page: 'yoler',
        customerName: 'Sarah Johnson',
        location: 'Manchester, UK',
        avatar: '/figma/yoler/testimonial-avatar-1.png',
        content: 'This app made studying for my theory test so easy! The practice questions were exactly like the real exam. Passed on my first attempt!',
        rating: 5,
        order: 0,
    },
    {
        page: 'yoler',
        customerName: 'James Williams',
        location: 'London, UK',
        avatar: '/figma/yoler/testimonial-avatar-2.png',
        content: 'The hazard perception clips are brilliant. They really helped me understand what to look for. Highly recommend!',
        rating: 5,
        order: 1,
    },
    {
        page: 'yoler',
        customerName: 'Emily Brown',
        location: 'Birmingham, UK',
        avatar: '/figma/yoler/testimonial-avatar-3.png',
        content: 'User-friendly interface and comprehensive content. The progress tracking feature kept me motivated throughout my preparation.',
        rating: 5,
        order: 2,
    },
];

const appLinks = [
    {
        appName: 'yoler',
        appDisplayName: 'Yoler - UK Theory Test',
        appStoreUrl: 'https://apps.apple.com/app/yoler',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.deepdevs.yoler',
        appIcon: '/figma/yoler/app-icon.png',
        appDescription: 'The best UK driving theory test preparation app',
    },
    {
        appName: 'plantzify',
        appDisplayName: 'Plantzify - Plant Care',
        appStoreUrl: 'https://apps.apple.com/app/plantzify',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.deepdevs.plantzify',
        appIcon: '/figma/plantzify/app-icon.png',
        appDescription: 'Your personal plant care assistant',
    },
    {
        appName: 'sesign',
        appDisplayName: 'SeSign - Digital Signatures',
        appStoreUrl: 'https://apps.apple.com/app/sesign',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.deepdevs.sesign',
        appIcon: '/figma/sesign/app-icon.png',
        appDescription: 'Sign documents securely from anywhere',
    },
    {
        appName: 'deep-study-ai',
        appDisplayName: 'Deep Study AI',
        appStoreUrl: 'https://apps.apple.com/app/deep-study-ai',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.deepdevs.deepstudyai',
        appIcon: '/figma/deep-study-ai/app-icon.png',
        appDescription: 'AI-powered study companion',
    },
    {
        appName: 'ztax',
        appDisplayName: 'Ztax - Tax Calculator',
        appStoreUrl: 'https://apps.apple.com/app/ztax',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.deepdevs.ztax',
        appIcon: '/figma/ztax/app-icon.png',
        appDescription: 'Simple and accurate tax calculations',
    },
];

const pages = [
    {
        slug: 'about-us',
        title: 'About Us',
        content: `
      <div class="about-content">
        <h1>About DeepDevs</h1>
        <p>We are a passionate team of developers dedicated to creating innovative mobile applications that make a difference in people's lives.</p>
        
        <h2>Know ourselves who we are</h2>
        <p>DeepDevs was founded with a simple mission: to build apps that solve real problems. Our team combines technical expertise with creative thinking to deliver exceptional mobile experiences.</p>
        
        <div class="mission-vision">
          <div class="mission">
            <h3>Our Mission</h3>
            <p>To empower users with intuitive, powerful applications that simplify daily tasks and enhance productivity.</p>
          </div>
          <div class="vision">
            <h3>Our Vision</h3>
            <p>To become the leading mobile app development studio, recognized for innovation, quality, and user-centric design.</p>
          </div>
        </div>
      </div>
    `,
        metaDescription: 'Learn about DeepDevs - a passionate team building innovative mobile applications.',
        isPublished: true,
    },
    {
        slug: 'privacy-policy',
        title: 'Privacy Policy',
        content: `
      <div class="policy-content">
        <h1>Privacy Policy</h1>
        <p>Last updated: January 2025</p>
        
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
        
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect our users.</p>
        
        <h2>3. Information Sharing</h2>
        <p>We do not share your personal information with third parties except as described in this policy or with your consent.</p>
        
        <h2>4. Data Security</h2>
        <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.</p>
        
        <h2>5. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at privacy@deepdevs.io</p>
      </div>
    `,
        metaDescription: 'DeepDevs Privacy Policy - How we collect, use, and protect your data.',
        isPublished: true,
    },
    {
        slug: 'terms-and-conditions',
        title: 'Terms and Conditions',
        content: `
      <div class="terms-content">
        <h1>Terms and Conditions</h1>
        <p>Last updated: January 2025</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using DeepDevs applications, you accept and agree to be bound by these Terms and Conditions.</p>
        
        <h2>2. Use of Services</h2>
        <p>You agree to use our services only for lawful purposes and in accordance with these Terms.</p>
        
        <h2>3. Intellectual Property</h2>
        <p>All content, features, and functionality of our applications are owned by DeepDevs and are protected by copyright and other intellectual property laws.</p>
        
        <h2>4. Limitation of Liability</h2>
        <p>DeepDevs shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.</p>
        
        <h2>5. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of updated terms.</p>
      </div>
    `,
        metaDescription: 'DeepDevs Terms and Conditions - Rules and guidelines for using our applications.',
        isPublished: true,
    },
];

const navigation = [
    {
        position: 'header',
        items: [
            { id: 'home', label: 'Home', href: '/', order: 0, isActive: true, isExternal: false },
            { id: 'apps', label: 'Apps', href: '/apps', order: 1, isActive: true, isExternal: false },
            { id: 'about', label: 'About Us', href: '/about-us', order: 2, isActive: true, isExternal: false },
            { id: 'contact', label: 'Contact', href: '/contact-us', order: 3, isActive: true, isExternal: false },
        ],
    },
    {
        position: 'footer',
        items: [
            { id: 'privacy', label: 'Privacy Policy', href: '/privacy-policy', order: 0, isActive: true, isExternal: false },
            { id: 'terms', label: 'Terms & Conditions', href: '/terms-and-conditions', order: 1, isActive: true, isExternal: false },
            { id: 'contact', label: 'Contact Us', href: '/contact-us', order: 2, isActive: true, isExternal: false },
        ],
    },
];

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Seed Testimonials
        console.log('\nSeeding testimonials...');
        for (const testimonial of testimonials) {
            await Testimonial.findOneAndUpdate(
                { page: testimonial.page, customerName: testimonial.customerName },
                testimonial,
                { upsert: true, new: true }
            );
            console.log(`  ✓ ${testimonial.customerName} (${testimonial.page})`);
        }

        // Seed App Links
        console.log('\nSeeding app links...');
        for (const appLink of appLinks) {
            await AppLink.findOneAndUpdate(
                { appName: appLink.appName },
                appLink,
                { upsert: true, new: true }
            );
            console.log(`  ✓ ${appLink.appDisplayName}`);
        }

        // Seed Pages
        console.log('\nSeeding pages...');
        for (const page of pages) {
            await Page.findOneAndUpdate(
                { slug: page.slug },
                page,
                { upsert: true, new: true }
            );
            console.log(`  ✓ ${page.title}`);
        }

        // Seed Navigation
        console.log('\nSeeding navigation...');
        for (const nav of navigation) {
            await Navigation.findOneAndUpdate(
                { position: nav.position },
                nav,
                { upsert: true, new: true }
            );
            console.log(`  ✓ ${nav.position}`);
        }

        console.log('\n✅ Seeding complete!');
        console.log('\nSummary:');
        console.log(`  - Testimonials: ${testimonials.length}`);
        console.log(`  - App Links: ${appLinks.length}`);
        console.log(`  - Pages: ${pages.length}`);
        console.log(`  - Navigation: ${navigation.length}`);

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

seed();

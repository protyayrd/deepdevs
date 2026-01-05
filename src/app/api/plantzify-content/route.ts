import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PlantzifyContent, { IPlantzifyContent } from '@/models/PlantzifyContent';

// Default content definitions (Mirrors current static site)
const DEFAULT_CONTENT = {
    hero: {
        welcomeText: 'Welcome to ATT Plantzify',
        title: 'Plant Detective Identify & Protect Your Greenery',
        subtitle: 'Your will have everything nearby supermarket, buses, station, the carmen neighborhood, etc',
        appStoreUrl: 'https://www.apple.com/app-store/',
        playStoreUrl: 'https://play.google.com/store/apps',
        heroImage: '/figma/plantzify/plant-image-56586a.png',
        logo: '/figma/plantzify/app-icon-1-56586a.png',
    },
    features: [
        {
            id: 'finder',
            title: 'Plant Finder',
            description: 'Identify plants instantly with just a photo your smart guide to nature\'s world',
            icon: '/figma/plantzify/plant-finder-icon-6528e5.png',
        },
        {
            id: 'water',
            title: 'Water Calculator',
            description: 'From workouts to daily routines, discover how much water you really need',
            icon: '/figma/plantzify/water-calculator-icon-4a66fb.png',
        },
        {
            id: 'light',
            title: 'Light Meter',
            description: 'Measure light levels instantly and accurately — anytime, anywhere',
            icon: '/figma/plantzify/light-meter-icon-6fd182.png',
        },
        {
            id: 'diagnose',
            title: 'Diagnose',
            description: 'Your smart tool for accurate diagnosis and better decision-making',
            icon: '/figma/plantzify/diagnose-icon-69e405.png',
        },
        {
            id: 'checker',
            title: 'Checker',
            description: 'Reliable checking made simple — fast, clear, and effective',
            icon: '/figma/plantzify/checker-icon-6eff61.png',
        },
        {
            id: 'advisor',
            title: 'Plant Advisor',
            description: 'Get expert advice on watering, sunlight, soil, and plant health',
            // Fallback icon since origin was CSS div. Using cleaner icon or checker icon as placeholder.
            icon: '/figma/plantzify/checker-icon-6eff61.png',
        }
    ],
    problemSolution: [
        {
            id: 'identify_problems',
            title: 'Identify Problems, Save Your Plants',
            description: 'you can spot issues early and take action before it\'s too late. Whether it\'s pests, diseases, or improper care, quick identification means healthier, stronger plants that thrive. By understanding what your plants need and responding to their problems in time, you can keep your garden green, vibrant, and full of life.',
            image: '/figma/plantzify/identify-problems-image-5c14ec.png',
            imagePosition: 'left'
        },
        {
            id: 'healthy_gardens',
            title: 'Healthy gardens, happy growers',
            description: 'A thriving garden is more than just plants — it\'s a source of joy, peace, and accomplishment. When your plants grow strong and vibrant, they reward you with beauty, fresh air, and even food. By giving them the right care and attention, you not only nurture nature but also create a healthier, happier space for yourself. After all, when gardens flourish, so do the people who care for them',
            image: '/figma/plantzify/healthy-gardens-image-5c14ec.png',
            imagePosition: 'right'
        }
    ],
    testimonials: [
        {
            text: 'Very happy with flacio; plants arrived in excellent condition, were healthy looking with lots of new growth and are thriving!',
            name: 'Ann Smith',
            avatar: '/figma/plantzify/testimonial-avatar-56586a.png',
            rating: 4.5
        }
    ],
    gallery: [
        { id: '1', imageUrl: '/figma/plantzify/gallery-image-1.png', altText: 'Gallery 1' },
        { id: '2', imageUrl: '/figma/plantzify/gallery-image-2.png', altText: 'Gallery 2' },
        { id: '3', imageUrl: '/figma/plantzify/gallery-image-3.png', altText: 'Gallery 3' },
        { id: '4', imageUrl: '/figma/plantzify/gallery-image-4.png', altText: 'Gallery 4' },
        { id: '5', imageUrl: '/figma/plantzify/gallery-image-5.png', altText: 'Gallery 5' },
        { id: '6', imageUrl: '/figma/plantzify/gallery-image-6.png', altText: 'Gallery 6' },
    ],
    blog: [
        {
            id: 'toxic',
            title: 'Toxic Plants',
            description: 'Stay safe by recognizing and avoiding harmful plants.',
            image: '/figma/plantzify/blog-image-1.png',
            date: '22 Jun',
            readTime: '9 min read'
        },
        {
            id: 'allergenic',
            title: 'Allergenic plants',
            description: 'Identify and address allergy-triggering plants for a healthier space.',
            image: '/figma/plantzify/blog-image-2-31a3cb.png',
            date: '22 Jun',
            readTime: '9 min read'
        },
        {
            id: 'houseplants',
            title: 'Houseplants',
            description: 'Recognize and nurture indoor greenery with ease.',
            image: '/figma/plantzify/blog-image-3.png',
            date: '22 Jun',
            readTime: '9 min read'
        }
    ],
    downloadCta: {
        title: 'Download and unlock nature\'s secrets and enjoy your greener world',
        appStoreUrl: 'https://www.apple.com/app-store/',
        playStoreUrl: 'https://play.google.com/store/apps',
        phoneImage: '/figma/plantzify/download-section-phone.png',
    }
};

export async function GET() {
    try {
        await connectDB();

        const sections = ['hero', 'features', 'problem_solution', 'testimonials', 'gallery', 'blog', 'download_cta'];
        const content: Record<string, any> = {};

        // Parallel fetch for all sections
        const results = await Promise.all(
            sections.map(section => PlantzifyContent.findOne({ section }).lean())
        );

        // Normalize data
        const finalResponse: any = {};

        sections.forEach((key, index) => {
            const doc = results[index];
            // @ts-ignore
            const defaultData = DEFAULT_CONTENT[key];

            if (doc && (doc as any)[key]) {
                // @ts-ignore
                finalResponse[key] = (doc as any)[key];
            } else if (doc) {
                // @ts-ignore
                const { _id, __v, createdAt, updatedAt, section, ...rest } = doc;
                // Sometimes the data is at the root if configured that way, but schema says it's nested
                // e.g. section='hero', content={ hero: {...} }
                // We'll trust schema structure
                // @ts-ignore
                finalResponse[key] = (doc as any)[key] || defaultData;
            } else {
                finalResponse[key] = defaultData;
            }
        });

        return NextResponse.json(finalResponse);
    } catch (error) {
        console.error('Error fetching Plantzify content:', error);
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { section, ...data } = body;

        if (!section) {
            return NextResponse.json({ error: 'Section is required' }, { status: 400 });
        }

        await connectDB();

        const updateData: any = {};
        // If the incoming data is structured like { hero: {...} }, use it directly
        // If it's just { ... }, wrap it in the section key if needed, or simply assume the spread 'data' 
        // matches the schema structure if we are careful in Admin.
        // Best practice: Admin sends { section: 'hero', hero: { title: '...' } }

        if (data[section]) {
            updateData[section] = data[section];
        } else {
            updateData[section] = data;
        }

        const filter = { section };
        const update = { $set: updateData };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const result = await PlantzifyContent.findOneAndUpdate(filter, update, options);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error updating Plantzify content:', error);
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}

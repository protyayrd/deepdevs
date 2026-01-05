import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import YolerContent, { IYolerContent } from '@/models/YolerContent';

// Default content definitions to use as fallback
const DEFAULT_CONTENT = {
    hero: {
        title: 'Pass your Theory Test\nFirst Time',
        appStoreUrl: 'https://www.apple.com/app-store/',
        playStoreUrl: 'https://play.google.com/store/apps',
        heroImage: '/figma/yoler/hero-background.jpg',
        logo: '/figma/yoler/logo.png',
    },
    featureCards: [
        {
            id: 'car',
            title: 'Car',
            description: 'Practice 700+ clips across different environments and road conditions to prepare for your test',
            icon: '/figma/yoler/car-icon.svg',
            order: 1
        },
        {
            id: 'motorcycle',
            title: 'Motorcycle',
            description: 'Practice 700+ clips across different environments and road conditions to prepare for your test',
            icon: '/figma/yoler/motorcycle-icon.svg',
            order: 2
        },
        {
            id: 'lorry',
            title: 'Lorry',
            description: 'Includes comprehensive learning materials covering every aspect of the DVSA syllabus for the CPC test',
            icon: '/figma/yoler/lorry-icon.svg',
            order: 3
        },
        {
            id: 'bus',
            title: 'Bus',
            description: 'Practice 700+ bus clips in different environments and road conditions to prepare for your test',
            icon: '/figma/yoler/bus-icon.svg',
            order: 4
        }
    ],
    featuredBrands: [
        { id: '1', name: 'MakeLess', logoUrl: '/figma/yoler/brand-1.png', order: 1 },
        { id: '2', name: 'coworks', logoUrl: '/figma/yoler/brand-2.png', order: 2 },
        { id: '3', name: 'greener', logoUrl: '/figma/yoler/brand-3.png', order: 3 },
        { id: '4', name: 'SAAS TODAY', logoUrl: '/figma/yoler/brand-4.png', order: 4 },
    ],
    theoryTestApp: {
        title: 'Theory Test App',
        description1: 'Study from a bank of 2500+ DVSA theory test revision questions, up-to-date for 2025. Take full-length tests and track your progress.',
        description2: 'Practice on any of these devices at any time and as much as you like',
        phoneImage: '/figma/yoler/yoler-test-app.png',
    },
    featuresGrid: [
        {
            id: 'gift',
            title: 'What do I get?',
            isList: true,
            listItems: [
                'Full access to all the questions',
                'Unlimited learning sessions with immediate feedback',
                'Mock tests and test-ready indicator'
            ],
            icon: '/figma/yoler/icon-gift.png',
            backgroundColor: '#cdeafc',
            order: 1
        },
        {
            id: 'hazard',
            title: 'Hazard Perception Test',
            isList: false,
            listItems: [],
            icon: '/figma/yoler/icon-hazard.png',
            backgroundColor: '#fcdede',
            order: 2
        },
        {
            id: 'highway',
            title: 'Highway Code',
            isList: false,
            listItems: [],
            icon: '/figma/yoler/icon-highway-code.png',
            backgroundColor: '#e6fcfc',
            order: 3
        },
        {
            id: 'mock',
            title: 'Mock Test',
            isList: false,
            listItems: [],
            icon: '/figma/yoler/icon-mock-test.png',
            backgroundColor: '#cdeafc',
            order: 4
        },
        {
            id: 'practice',
            title: 'Practice',
            isList: false,
            listItems: [],
            icon: '/figma/yoler/icon-practice.png',
            backgroundColor: '#fcdede',
            order: 5
        },
        {
            id: 'roadsign',
            title: 'Road Sign',
            isList: false,
            listItems: [],
            icon: '/figma/yoler/icon-road-sign.png',
            backgroundColor: '#e6fcfc',
            order: 6
        },
    ],
    infoSections: [
        {
            id: 'example_questions',
            title: 'Example Of Questions On The Theory Test',
            description: [
                'What type of questions can one expect on the theory test? A theory test is divided into five categories. To pass the test and become a safe driver you must be knowledgeable in every category',
                'It\'s impossible to say which questions you will get on your specific test, but we can give examples of typical questions from each category'
            ],
            image: '/figma/yoler/example-questions.png',
            imagePosition: 'left'
        },
        {
            id: 'quick_tips',
            title: 'Quick tips to pass your theory test',
            description: [
                'Try to get a good night\'s sleep and have a steady breakfast before your test. It can also be a good idea to bring fruit or some snacks to the test',
                'Don\'t stress and try to stay focused. After all - 50 minutes is a fairly long time. If a question takes too long, mark it and move on - you can always return to the question later on.'
            ],
            image: '/figma/yoler/quick-tips.png',
            imagePosition: 'right'
        }
    ],
    downloadCta: {
        title: 'Download and unlock the road to success',
        appStoreUrl: 'https://www.apple.com/app-store/',
        playStoreUrl: 'https://play.google.com/store/apps',
    }
};

export async function GET() {
    try {
        await connectDB();

        const sectionRequestMap = [
            { section: 'hero', key: 'hero' },
            { section: 'feature_cards', key: 'featureCards' },
            { section: 'featured_brands', key: 'featuredBrands' },
            { section: 'theory_test_app', key: 'theoryTestApp' },
            { section: 'features_grid', key: 'featuresGrid' },
            { section: 'info_sections', key: 'infoSections' },
            { section: 'download_cta', key: 'downloadCta' }
        ];

        // Parallel fetch for all sections
        const results = await Promise.all(
            sectionRequestMap.map(item => YolerContent.findOne({ section: item.section }).lean())
        );

        const finalResponse: any = {};

        results.forEach((result: any, index) => {
            const { key } = sectionRequestMap[index];
            // @ts-ignore
            const defaultData = DEFAULT_CONTENT[key];

            if (result) {
                // If the doc exists, looking for the specific data field (e.g. doc.featureCards)
                // The result is the full document (lean), so it has top level fields like _id, section, AND the data field.
                // e.g. { _id: ..., section: 'feature_cards', featureCards: [...] }

                // We want to return just the data part if possible, or merged with default
                // @ts-ignore
                if (result[key]) {
                    // @ts-ignore
                    finalResponse[key] = result[key];
                } else {
                    // Fallback if data field is missing in doc (shouldn't happen with valid schema)
                    finalResponse[key] = defaultData;
                }
            } else {
                // If no doc in DB, use default content
                finalResponse[key] = defaultData;
            }
        });

        return NextResponse.json(finalResponse);
    } catch (error) {
        console.error('Error fetching Yoler content:', error);
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

        // Update based on section
        // matches schema structure: { section: 'hero', hero: { ...data } }
        const updateData: any = {};
        updateData[section] = data[section] || data; // Support sending { hero: {...} } or just { ... } inside a 'hero' update

        // If the body contains the specific key (e.g. 'hero'), use it. 
        // Otherwise assume the body IS the data for that key.

        const filter = { section };
        const update = { $set: updateData };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const result = await YolerContent.findOneAndUpdate(filter, update, options);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error updating Yoler content:', error);
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}

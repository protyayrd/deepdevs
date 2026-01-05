import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SeSignContent, { ISeSignContent } from '@/models/SeSignContent';

// Default content definitions to use as fallback
const DEFAULT_CONTENT = {
    hero: {
        tag: 'Signature · Document · Share',
        title: 'Simplify Documents, Sign, Collaborate Anywhere',
        subtitle: 'Manage, share, and sign your documents securely in one platform — integrated, automated, and built for teams that move fast and work remotely.',
        leftImage: '/figma/sesign/young-woman-hand-uses-tablet.png',
        rightImage: '/figma/sesign/designer-work-office.png',
        bottomLeftImage: '/figma/sesign/document-verification.png',
        bottomRightImage: '/figma/sesign/terms-use.png',
        happyClientsCount: '25k+',
        happyClientsLabel: 'Happy Clients',
    },
    featuredBrands: [
        { id: '1', name: 'Brand 1', logoUrl: '/figma/sesign/brand_3_1.png', order: 1 },
        { id: '2', name: 'Brand 2', logoUrl: '/figma/sesign/brand_3_2.png', order: 2 },
        { id: '3', name: 'Brand 3', logoUrl: '/figma/sesign/brand_3_3.png', order: 3 },
        { id: '4', name: 'Brand 4', logoUrl: '/figma/sesign/brand_3_4.png', order: 4 },
    ],
    about: {
        tag: 'About Us',
        title: 'Empowering Paperless Progress with Secure Digital Solutions',
        subtitle: 'We empower businesses to go fully paperless by providing secure, smart, and scalable digital solutions that streamline document management, signing, and collaboration',
        cards: [
            { id: '1', value: '15', suffix: '+', label: 'Experience', order: 1 },
            { id: '2', value: '40', suffix: '', label: 'System Uptime', order: 2 },
            { id: '3', value: '15', suffix: 'K', label: 'Signed Monthly', order: 3 },
            { id: '4', value: '3k', suffix: '+', label: 'Clients Worldwide', order: 4 },
        ]
    },
    features: {
        tag: 'Feature',
        title: 'Smarter Features for Faster Safer Signing Workflow',
        subtitle: 'Explore powerful features designed to help you upload, organize, share, and sign documents',
        cards: [
            {
                id: '1',
                title: 'Create document with AI',
                description: 'Create documents effortlessly with AI. From reports and articles to presentations and contracts',
                icon: '/figma/sesign/features/icon-1.svg', // Will use SVG content logic in frontend if needed, but path for now
                order: 1
            },
            {
                id: '2',
                title: 'Create E-Signature',
                description: 'Create e-signatures quickly and securely with AI. Sign documents online, streamline approvals',
                icon: '/figma/sesign/features/icon-2.svg',
                order: 2
            },
            {
                id: '3',
                title: 'Ask with AI',
                description: 'Ask with AI and get instant, intelligent answers to your questions. From research and problem',
                icon: '/figma/sesign/features/icon-3.svg',
                order: 3
            },
            {
                id: '4',
                title: 'Scanner',
                description: 'Scan documents, receipts, and IDs with ease. A digital scanner lets you capture clear, high-quality images',
                icon: '/figma/sesign/features/icon-4.svg',
                order: 4
            },
            {
                id: '5',
                title: 'Photo',
                description: 'Capture, edit, and organize your photos with ease. Turn moments into lasting memories, enhance image quality',
                icon: '/figma/sesign/features/icon-5.svg',
                order: 5
            },
            {
                id: '6',
                title: 'Template',
                description: 'Use ready-made templates to create professional documents in minutes. Customize designs for resumes',
                icon: '/figma/sesign/features/icon-6.svg',
                order: 6
            }
        ]
    },
    workAnywhere: {
        tag: 'Work Anywhere',
        title: 'Simplify\nDocuments, Sign,\nCollaborate\nAnywhere',
        subtitle: 'Manage, share, and sign your documents securely in one platform - integrated, automated, and built for teams that move fast and work remotely.',
        heroImage: '/figma/sesign/work-anywhere-hero.png',
    },
    testimonials: {
        title: 'Experiences Shared by Our Clients',
        subtitle: 'The team at WDK AI ToolKit provided unparalleled support throughout our project. Their expertise and dedication were evident from day one, helping us navigate complex challenges.',
        items: [
            {
                id: '1',
                text: 'The SeSign  offers a smooth, efficient, and secure platform for signing documents digitally.',
                userName: 'Artemisia Udinese',
                userLocation: 'United Kingdom',
                userAvatar: '/figma/sesign/testimonials/avatar-uk.png',
                order: 1
            },
            {
                id: '2',
                text: 'Process of uploading a document, applying signatures, and sending it off is seamless and efficient, saving both time',
                userName: 'Artemisia Udinese',
                userLocation: 'United State',
                userAvatar: '/figma/sesign/testimonials/avatar-us.png',
                order: 2
            },
            {
                id: '3',
                text: 'Overall, if you need a reliable, secure, and easy-to-use e-signature solution, this website offers great value',
                userName: 'Artemisia Udinese',
                userLocation: 'Canada',
                userAvatar: '/figma/sesign/testimonials/avatar-ca.png',
                order: 3
            }
        ]
    },
    integrations: {
        tag: 'Popular Integrations',
        title: 'Connect Seamlessly\nWith Tools You Already\nTrust',
        subtitle: 'Enhance your workflow by integrating with leading platforms your team uses every day.',
        items: [
            { id: '1', name: 'Shield', icon: '/figma/sesign/integrations/icon-shield.png', order: 1 },
            { id: '2', name: 'Excel', icon: '/figma/sesign/integrations/icon-excel.png', order: 2 },
            { id: '3', name: 'Notes', icon: '/figma/sesign/integrations/icon-notes.png', order: 3 },
            { id: '4', name: 'Outlook', icon: '/figma/sesign/integrations/icon-outlook.png', order: 4 },
            { id: '5', name: 'OneDrive', icon: '/figma/sesign/integrations/icon-onedrive.png', order: 5 },
            { id: '6', name: 'eSign', icon: '/figma/sesign/integrations/icon-esign.png', order: 6 },
        ]
    },
    downloadCta: {
        title: 'Secure, Sign, Store - All In One Platform',
        subtitle: 'Join thousands of teams who trust us to simplify their document workflows with secure e-signatures and powerful automation tools.',
        appStoreUrl: 'https://www.apple.com/app-store/',
        playStoreUrl: 'https://play.google.com/store/apps',
    }
};

// Mapping from DB section values (snake_case) to Schema/Frontend keys (camelCase)
const SECTION_MAPPING: Record<string, keyof typeof DEFAULT_CONTENT> = {
    hero: 'hero',
    featured_brands: 'featuredBrands',
    about: 'about',
    features: 'features',
    work_anywhere: 'workAnywhere',
    testimonials: 'testimonials',
    integrations: 'integrations',
    download_cta: 'downloadCta',
};

export async function GET() {
    try {
        await connectDB();

        const sections = Object.keys(SECTION_MAPPING);

        // Parallel fetch for all sections
        const results = await Promise.all(
            sections.map(section => SeSignContent.findOne({ section }).lean())
        );

        // Normalize output
        const finalResponse: any = {};

        sections.forEach((sectionKey, index) => {
            const camelKey = SECTION_MAPPING[sectionKey];
            const doc: any = results[index];
            const defaultData = DEFAULT_CONTENT[camelKey];

            if (doc && doc[camelKey]) {
                finalResponse[camelKey] = doc[camelKey];
            } else {
                finalResponse[camelKey] = defaultData;
            }
        });

        return NextResponse.json(finalResponse);
    } catch (error) {
        console.error('Error fetching SeSign content:', error);
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
        const updateData: any = {};
        updateData[section] = data[section] || data;

        const filter = { section };
        const update = { $set: updateData };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const result = await SeSignContent.findOneAndUpdate(filter, update, options);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error updating SeSign content:', error);
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}

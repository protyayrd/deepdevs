import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ZtaxContent from '@/models/ZtaxContent';

// Default content definitions to use as fallback
const DEFAULT_CONTENT = {
    hero: {
        title: 'Simplify Your Tax Management with Z Tax',
        subtitle: 'Track income, expenses, and invoices all in one place',
        appStoreUrl: 'https://www.apple.com/app-store/',
        playStoreUrl: 'https://play.google.com/store/apps',
        heroImage: '/figma/ztax/Group1000004452.png',
        logo: '/figma/ztax/ztax-logo.png',
    },
    stats: [
        {
            id: '1',
            number: '5',
            text: 'Trusted by users for over 5 years',
            backgroundColor: '#92C9E6',
            icon: '', // Using empty string to trigger default rendering logic if needed, or we can put a placeholder
            order: 1
        },
        {
            id: '2',
            number: '6,000+',
            text: 'Reviewed by 6,000+ Our users',
            backgroundColor: '#21C293',
            icon: '',
            order: 2
        },
        {
            id: '3',
            number: '10k',
            text: 'Installed over 10k times worldwide',
            backgroundColor: '#92C9E6',
            icon: '',
            order: 3
        },
        {
            id: '4',
            number: '12',
            text: '12 languages supported',
            backgroundColor: '#23C294',
            icon: '',
            order: 4
        }
    ],
    features: [
        {
            id: 'income',
            title: 'Income',
            description: 'Track your income and keep it organized for tax filing',
            icon: '/figma/ztax/features/income-icon.png',
            order: 1
        },
        {
            id: 'profit_loss',
            title: 'Profit & Loss',
            description: 'Get real-time insights into your financial performance',
            icon: '/figma/ztax/features/profit-loss-icon.png',
            order: 2
        },
        {
            id: 'expenses',
            title: 'Expenses',
            description: 'Record and categorize your business expenses effortlessly',
            icon: '/figma/ztax/features/expenses-icon.png',
            order: 3
        },
        {
            id: 'tax',
            title: 'Tax',
            description: 'It makes e-commerce operations easier for sellers and buyers',
            icon: '/figma/ztax/features/tax-icon.png',
            order: 4
        },
        {
            id: 'deposit',
            title: 'Deposit',
            description: 'Easily record incoming funds, track deposits, and manage cash flow in real-time.',
            icon: '/figma/ztax/features/deposit-icon.png',
            order: 5
        },
        {
            id: 'invoice',
            title: 'Invoice',
            description: 'Create professional invoices, send them instantly, and keep track of payments',
            icon: '/figma/ztax/features/invoice-icon.png',
            order: 6
        }
    ],
    powerfulFeatures: {
        title: 'Powerful Features to Simplify Your Tax Management',
        subtitle: 'Track your income, manage expenses, generate reports, and file taxes—all from one app',
        phoneImage: '/figma/ztax/phone-mockup.png',
        steps: [
            {
                id: '1',
                title: 'Add Your Transactions',
                description: 'Start by adding your income, expenses, deposits, and other financial transactions into the app',
                order: 1
            },
            {
                id: '2',
                title: 'Organize Expenses and Income',
                description: "Monitor your business's income and expenses in real-time to keep a clear picture of your finances",
                order: 2
            },
            {
                id: '3',
                title: 'Generate Reports',
                description: "Use the data you've entered to generate detailed financial reports with just a few clicks",
                order: 3
            },
            {
                id: '4',
                title: 'File Your Taxes',
                description: "Once your financial data is organized, use the app's tax calculation tools to file your taxes quickly and accurately",
                order: 4
            }
        ]
    },
    testimonials: [
        {
            id: '1',
            quote: "As a small business owner, keeping track of my expenses, income, and taxes was always a headache. But since I started using Z Tax, it's been smooth sailing. The app is super intuitive, and I love how easy it is to generate reports and file taxes I can add transactions in just a few clicks, and the real-time tracking of my cash",
            authorName: 'Artemisia Udinese',
            authorRole: 'Customer',
            avatar: '/figma/ztax/testimonial-image.png',
            order: 1
        }
    ],
    pricing: {
        title: 'Our Range of Service Level Options',
        subtitle: 'Pricing Table',
        description: 'Ideal for individuals and small businesses, our Basic Service Level offers essential support and features at an affordable price. Enjoy reliable access to our core services.',
        plans: [
            {
                id: 'free',
                name: 'Free Plan',
                price: '$0',
                period: '/ month',
                description: 'Access to basic features without any subscription fee.',
                features: [
                    'Limited Features',
                    'Basic Support',
                    'Trial for Premium Features',
                    'Community Access',
                    'No Commitment'
                ],
                isPopular: false,
                order: 1
            },
            {
                id: 'exclusive',
                name: 'Exclusive Plan',
                price: '$20',
                period: '/ month',
                description: 'Access to basic features without any subscription fee.',
                features: [
                    'Premium Features',
                    'Custom Integrations',
                    'Personalised Onboarding',
                    'Dedicated Account Manager',
                    'Higher API Limits'
                ],
                isPopular: true,
                order: 2
            }
        ]
    }
};

export async function GET() {
    try {
        await connectDB();

        const sections = ['hero', 'stats', 'features', 'powerful_features', 'testimonials', 'pricing'];
        const content: Record<string, any> = {};

        const results = await Promise.all(
            sections.map(section => ZtaxContent.findOne({ section }).lean())
        );

        results.forEach((result: any, index) => {
            const sectionName = sections[index];
            if (result) {
                const { _id, __v, createdAt, updatedAt, ...data } = result;
                content[sectionName] = result[sectionName] || data;
            } else {
                // @ts-ignore
                content[sectionName] = DEFAULT_CONTENT[sectionName];
            }
        });

        // Normalize response
        const finalResponse: any = {};
        sections.forEach((key, index) => {
            const doc = results[index];
            // @ts-ignore
            const defaultData = DEFAULT_CONTENT[key];
            // @ts-ignore
            if (doc && doc[key]) {
                // @ts-ignore
                finalResponse[key] = doc[key];
            } else {
                finalResponse[key] = defaultData;
            }
        });

        return NextResponse.json(finalResponse);
    } catch (error) {
        console.error('Error fetching Ztax content:', error);
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
        updateData[section] = data[section] || data;

        const filter = { section };
        const update = { $set: updateData };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const result = await ZtaxContent.findOneAndUpdate(filter, update, options);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error updating Ztax content:', error);
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import DeepStudyContent from '@/models/DeepStudyContent';

// Default content definitions
const DEFAULT_CONTENT = {
    hero: {
        title: 'Your Smart Study Companion',
        subtitle: 'Scan notes, extract text, and get AI-powered help—all in one app.',
        appStoreUrl: 'https://www.apple.com/app-store/',
        playStoreUrl: 'https://play.google.com/store/apps',
        heroImage: '/figma/deep-study-ai/Group-1000004452.png',
    },
    stats: [
        {
            id: 'stat1',
            value: '5',
            label: 'Trusted by users for over 5 years',
            icon: '', // Empty string forcing fallback to default Star SVG
            order: 1
        },
        {
            id: 'stat2',
            value: '4.8',
            label: 'Reviewed by 6,000+ Our users',
            icon: '',
            order: 2
        },
        {
            id: 'stat3',
            value: '10k',
            label: 'Installed over 10k times worldwide',
            icon: '',
            order: 3
        },
        {
            id: 'stat4',
            value: '12',
            label: '12 languages supported',
            icon: '',
            order: 4
        }
    ],
    featuresHeader: {
        title: 'Discover StudyMate App Feature',
        subtitle: 'Your simple way to explore, recognize, and learn about plants in just a few steps'
    },
    features: [
        {
            id: 'feat1',
            title: 'Notes Scan',
            description: 'Instantly turn your handwritten or printed notes into clean',
            icon: '/figma/deep-study-ai/features/note-scanning-icon.png',
            order: 1
        },
        {
            id: 'feat2',
            title: 'PDF → Text',
            description: 'Quickly extract and copy text from any PDF file. quickly and easily.',
            icon: '/figma/deep-study-ai/features/text-extraction-icon.png',
            order: 2
        },
        {
            id: 'feat3',
            title: 'Ask AI',
            description: 'Get instant AI-powered help for your study questions — anytime, anywhere',
            icon: '/figma/deep-study-ai/features/ai-powered-help-icon.png',
            order: 3
        }
    ],
    processHeader: {
        title: 'All-In-One Study Solution',
        subtitle: 'Your simple way to explore, recognize, and learn about plants in just a few steps'
    },
    processSteps: [
        {
            id: 'step1',
            title: 'Converting Your Handwritten Notes into Digital Formats',
            description: 'Capture, Organize, and Store Your Notes Securely – Effortlessly Transform Your Paperwork into a Seamless, Fully Accessible Digital Experience, Ensuring Instant Retrieval, Enhanced Organization, and Long-Term Preservation of Your Ideas, Tasks, and Projects',
            image: '/figma/deep-study-ai/all-in-one/img-5.jpg',
            buttonText: 'Download App',
            order: 1
        },
        {
            id: 'step2',
            title: 'Effortlessly Extract and Convert PDF into Editable Text',
            description: 'Unlock the Full Potential of Your PDFs by Effortlessly Transforming Complex, Non-Editable Documents into Clear, Searchable, and Fully Editable Text with Just a Few Simple Clicks, Enabling Seamless Text Extraction, Enhanced Organization, and Fast Access to Valuable Information for Any Project or Task',
            image: '/figma/deep-study-ai/all-in-one/image-132.jpg',
            buttonText: 'Download App',
            order: 2
        },
        {
            id: 'step3',
            title: 'Ask AI for Your Study: Unlock the Power of Intelligent Learning',
            description: 'Transform Your Study Routine with AI: Instantly Find Answers, Sharpen Your Comprehension, and Elevate Your Academic Performance Through Tailored Guidance and Cutting-Edge Technology.',
            image: '/figma/deep-study-ai/all-in-one/img-5.jpg',
            overlayImage: '/figma/deep-study-ai/all-in-one/image-133.jpg',
            buttonText: 'Download App',
            order: 3
        }
    ],
    blogHeader: {
        title: 'Our Blog'
    },
    blogCards: [
        {
            id: 'blog1',
            title: 'Revolutionize Your Study Routine',
            description: "In today's fast-paced world, staying organized and efficient with your study materials is crucial for academic success...",
            image: '',
            link: '#',
            order: 1
        },
        {
            id: 'blog2',
            title: 'How AI is Changing Study Management',
            description: 'Gone are the days of sifting through piles of notes and textbooks. AI-powered study tools are transforming how students learn...',
            image: '',
            link: '#',
            order: 2
        },
        {
            id: 'blog3',
            title: 'Top Tips for Effective Note Taking',
            description: 'Taking good notes is an essential skill for any student. Here are some top tips to help you take better notes...',
            image: '',
            link: '#',
            order: 3
        }
    ]
};

export async function GET() {
    try {
        await connectDB();

        const sections = ['hero', 'stats', 'features', 'process_steps', 'blog_cards'];
        const content: Record<string, any> = {};

        // Parallel fetch for all sections
        const results = await Promise.all(
            sections.map(section => DeepStudyContent.findOne({ section }).lean())
        );

        const finalResponse: any = {};

        sections.forEach((key, index) => {
            const doc = results[index];
            // @ts-ignore
            const defaultData = DEFAULT_CONTENT[key];

            // Special handling for nested headers which are stored in the same document as the list
            // Actually in our schema, 'features' section has 'featuresHeader' and 'features' array.
            // 'process_steps' section has 'processHeader' and 'processSteps' array.
            // 'blog_cards' section has 'blogHeader' and 'blogCards' array.

            if (doc) {
                // @ts-ignore
                const { _id, __v, createdAt, updatedAt, ...data } = doc;

                // If the doc exists, we want to return the main fields.
                // For 'hero', it's doc.hero
                // For 'stats', it's doc.stats
                // For 'features', it's doc.features AND doc.featuresHeader

                if (key === 'hero') {
                    // @ts-ignore
                    finalResponse[key] = doc.hero || defaultData;
                } else if (key === 'stats') {
                    // @ts-ignore
                    finalResponse[key] = doc.stats || defaultData;
                } else if (key === 'features') {
                    finalResponse['features'] = doc.features || DEFAULT_CONTENT.features;
                    finalResponse['featuresHeader'] = doc.featuresHeader || DEFAULT_CONTENT.featuresHeader;
                } else if (key === 'process_steps') {
                    finalResponse['processSteps'] = doc.processSteps || DEFAULT_CONTENT.processSteps;
                    finalResponse['processHeader'] = doc.processHeader || DEFAULT_CONTENT.processHeader;
                } else if (key === 'blog_cards') {
                    finalResponse['blogCards'] = doc.blogCards || DEFAULT_CONTENT.blogCards;
                    finalResponse['blogHeader'] = doc.blogHeader || DEFAULT_CONTENT.blogHeader;
                }
            } else {
                // No doc found, use defaults
                if (key === 'features') {
                    finalResponse['features'] = DEFAULT_CONTENT.features;
                    finalResponse['featuresHeader'] = DEFAULT_CONTENT.featuresHeader;
                } else if (key === 'process_steps') {
                    finalResponse['processSteps'] = DEFAULT_CONTENT.processSteps;
                    finalResponse['processHeader'] = DEFAULT_CONTENT.processHeader;
                } else if (key === 'blog_cards') {
                    finalResponse['blogCards'] = DEFAULT_CONTENT.blogCards;
                    finalResponse['blogHeader'] = DEFAULT_CONTENT.blogHeader;
                } else {
                    // @ts-ignore
                    finalResponse[key] = DEFAULT_CONTENT[key];
                }
            }
        });

        return NextResponse.json(finalResponse);
    } catch (error) {
        console.error('Error fetching Deep Study content:', error);
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
        // We need to map the incoming data to the schema structure
        // e.g. frontend sends { section: 'features', features: [...], featuresHeader: {...} }
        // schema expects { section: 'features', features: [...], featuresHeader: {...} }

        // The Yoler logic was: updateData[section] = data[section] || data;
        // But here we have mixed fields for some sections.
        // Let's just use the data spread, as the schema will filter out unknown fields? 
        // No, Mongoose might be strict. We should construct the update object properly.

        const updateData: any = {};

        if (section === 'hero') {
            updateData.hero = data.hero || data;
        } else if (section === 'stats') {
            updateData.stats = data.stats || data;
        } else if (section === 'features') {
            if (data.features) updateData.features = data.features;
            if (data.featuresHeader) updateData.featuresHeader = data.featuresHeader;
        } else if (section === 'process_steps') {
            if (data.processSteps) updateData.processSteps = data.processSteps;
            if (data.processHeader) updateData.processHeader = data.processHeader;
        } else if (section === 'blog_cards') {
            if (data.blogCards) updateData.blogCards = data.blogCards;
            if (data.blogHeader) updateData.blogHeader = data.blogHeader;
        }

        const filter = { section };
        const update = { $set: updateData };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const result = await DeepStudyContent.findOneAndUpdate(filter, update, options);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error updating Deep Study content:', error);
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}

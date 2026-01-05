import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export type TabType = 'dashboard' | 'homepage' | 'faqs' | 'contacts' | 'testimonials' | 'app-links' | 'pages' | 'yoler' | 'plantzify' | 'deep-study-ai' | 'sesign' | 'ztax';

export const ADMIN_TABS: { id: TabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'homepage', label: 'Homepage', icon: '🏠' },
    { id: 'faqs', label: 'FAQs', icon: '❓' },
    { id: 'contacts', label: 'Contacts', icon: '📧' },
    { id: 'testimonials', label: 'Testimonials', icon: '💬' },
    { id: 'app-links', label: 'App Links', icon: '📱' },
    { id: 'pages', label: 'Pages', icon: '📄' },
    { id: 'yoler', label: 'Yoler', icon: '🚗' },
    { id: 'plantzify', label: 'Plantzify', icon: '🌿' },
    { id: 'deep-study-ai', label: 'Deep Study AI', icon: '🎓' },
    { id: 'sesign', label: 'SeSign', icon: '✍️' },
    { id: 'ztax', label: 'Ztax', icon: '💰' },
];

interface AdminSidebarProps {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    onLogout: () => void;
}

export default function AdminSidebar({ activeTab, setActiveTab, onLogout }: AdminSidebarProps) {
    return (
        <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 flex flex-col z-10">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center">
                        <Logo />
                    </Link>
                    <span className="font-bold text-gray-900 text-lg">Admin</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {ADMIN_TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.id
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <span className="text-lg">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                    <span>🚪</span>
                    Logout
                </button>
            </div>
        </div>
    );
}

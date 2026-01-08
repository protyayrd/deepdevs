'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';

export const ADMIN_PAGES = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/homepage', label: 'Homepage', icon: '🏠' },
    { path: '/admin/faqs', label: 'FAQs', icon: '❓' },
    { path: '/admin/contacts', label: 'Contacts', icon: '📧' },
    { path: '/admin/testimonials', label: 'Testimonials', icon: '💬' },
    { path: '/admin/apps-page', label: 'Apps Page', icon: '✨' },
    { path: '/admin/app-links', label: 'App Links', icon: '📱' },
    { path: '/admin/pages', label: 'Custom Pages', icon: '📄' },
    { path: '/admin/yoler', label: 'Yoler', icon: '🚗' },
    { path: '/admin/plantzify', label: 'Plantzify', icon: '🌿' },
    { path: '/admin/deep-study-ai', label: 'Deep Study AI', icon: '🎓' },
    { path: '/admin/sesign', label: 'SeSign', icon: '✍️' },
    { path: '/admin/ztax', label: 'Ztax', icon: '💰' },
];

interface AdminSidebarProps {
    currentPath: string;
    onLogout: () => void;
}

export default function AdminSidebar({ currentPath, onLogout }: AdminSidebarProps) {
    return (
        <div className="w-72 bg-white border-r border-gray-100 h-screen fixed left-0 top-0 flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            {/* Header */}
            <div className="p-8">
                <div className="flex items-center gap-3 group px-2">
                    <Link href="/" className="flex items-center transform transition-transform group-hover:scale-110">
                        <Logo />
                    </Link>
                    <div>
                        <span className="font-extrabold text-gray-900 text-xl tracking-tight block leading-none">Admin</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-indigo-500 mt-1 block">Control Center</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
                <div className="text-[10px] uppercase font-bold text-gray-400 px-4 mb-2 tracking-widest">Main Menu</div>
                {ADMIN_PAGES.map((page) => {
                    const isActive = currentPath === page.path || (currentPath === '/admin' && page.path === '/admin/dashboard');
                    return (
                        <Link
                            key={page.path}
                            href={page.path}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 relative group
                                ${isActive
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-indigo-600'
                                }`}
                        >
                            <span className={`text-lg transition-transform duration-300 group-hover:scale-125 ${isActive ? 'scale-110' : ''}`}>
                                {page.icon}
                            </span>
                            <span className="flex-1 text-left">{page.label}</span>
                            {isActive && (
                                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="p-6">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-red-500 bg-red-50/50 rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95 border border-red-100 hover:border-red-500 shadow-sm"
                >
                    <span className="text-lg">🚪</span>
                    Logout
                </button>
            </div>
        </div>
    );
}

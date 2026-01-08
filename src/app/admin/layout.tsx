'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = sessionStorage.getItem('adminAuthenticated');
        if (!auth) {
            router.push('/admin/login');
        } else {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuthenticated');
        router.push('/admin/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-gray-500 font-medium">Loading admin panel...</span>
                </div>
            </div>
        );
    }

    // Allow the login page to render regardless of authentication status
    if (pathname === '/admin/login') {
        return (
            <div className="min-h-screen bg-gray-50">
                <Toaster position="top-right" />
                {children}
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Toaster position="top-right" />

            {/* Sidebar */}
            <AdminSidebar currentPath={pathname} onLogout={handleLogout} />

            {/* Main Content */}
            <div className="flex-1 ml-72 p-8">
                {children}
            </div>
        </div>
    );
}

'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-white/20 shadow-lg">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-[0.9rem] sm:py-[1.2rem]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" aria-label="DeepDevs Home">
                            <Logo priority />
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 text-xs md:text-sm text-gray-700">
                        <Link className="hover:text-gray-900 transition-colors" href="/#plugins">Our Plugins</Link>
                        <Link className="text-indigo-600 font-medium" href="/apps">Our Apps</Link>
                        <Link className="hover:text-gray-900 transition-colors" href="/#support">Support</Link>
                        <Link className="hover:text-gray-900 transition-colors" href="/#contact">Contact Us</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AdminCard from '@/app/admin/components/ui/AdminCard';
import AdminButton from '@/app/admin/components/ui/AdminButton';

interface ContactSubmission {
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber?: string;
    subject: string;
    message?: string;
    submittedAt: string;
}

export default function ContactsPage() {
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch('/api/contacts');
                const data = await res.json();
                setContacts(data);
            } catch {
                toast.error('Failed to load contacts');
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in-up is-visible pb-20">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">📧 Inquiries</h1>
                <p className="text-gray-500 font-medium">Review and manage contact form submissions from your users.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {contacts.length === 0 ? (
                    <div className="py-20 bg-white rounded-3xl border-4 border-dashed border-gray-50 flex flex-col items-center justify-center text-center">
                        <span className="text-6xl mb-4">📭</span>
                        <h3 className="text-xl font-bold text-gray-900">No Inquiries Found</h3>
                        <p className="text-gray-400 max-w-xs mt-2">Your inbox is currently empty. New contact form submissions will appear here.</p>
                    </div>
                ) : (
                    contacts.map(c => (
                        <AdminCard key={c.id} className="bg-white">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-indigo-100 uppercase">
                                            {c.firstName[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-extrabold text-gray-900 text-lg leading-tight uppercase tracking-tight">
                                                {c.firstName} {c.lastName}
                                            </h3>
                                            <p className="text-indigo-600 font-bold text-xs tracking-widest uppercase mt-1">{c.emailAddress}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50/50 rounded-3xl border border-gray-50">
                                        <div>
                                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] block mb-1">Phone Number</span>
                                            <span className="font-bold text-gray-700">{c.phoneNumber || 'Not Provided'}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] block mb-1">Received On</span>
                                            <span className="font-bold text-gray-700">{new Date(c.submittedAt).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] block mb-1">Time</span>
                                            <span className="font-bold text-gray-700">{new Date(c.submittedAt).toLocaleTimeString()}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 rounded-2xl bg-white border border-gray-100">
                                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] block mb-2">Subject Header</span>
                                            <p className="font-extrabold text-gray-900 italic">&ldquo;{c.subject}&rdquo;</p>
                                        </div>
                                        {c.message && (
                                            <div className="p-6 rounded-3xl bg-indigo-50/30 border border-indigo-100/50 relative">
                                                <span className="absolute -top-3 left-6 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-indigo-200">Message Content</span>
                                                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{c.message}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </AdminCard>
                    ))
                )}
            </div>
        </div>
    );
}


import React from 'react';
import { DashboardStats, ContactSubmission, TabType } from '../../types';
import AdminCard from '../ui/AdminCard';
import AdminButton from '../ui/AdminButton';

interface DashboardTabProps {
    stats: DashboardStats;
    setActiveTab: (tab: TabType) => void;
}

const DashboardTab: React.FC<DashboardTabProps> = ({ stats, setActiveTab }) => {
    const statItems = [
        { label: 'Total Contacts', value: stats.counts.contacts, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: '📧' },
        { label: 'Total FAQs', value: stats.counts.faqs, color: 'text-green-600', bg: 'bg-green-50', icon: '❓' },
        { label: 'Active Testimonials', value: stats.counts.testimonials, color: 'text-rose-600', bg: 'bg-rose-50', icon: '💬' },
        { label: 'Published Pages', value: stats.counts.pages, color: 'text-purple-600', bg: 'bg-purple-50', icon: '📄' },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up is-visible">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
                <p className="text-gray-500 font-medium">Welcome back! Here's what's happening with your platform.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statItems.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover-lift transition-all duration-300">
                        <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center text-xl mb-4`}>
                            {item.icon}
                        </div>
                        <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">{item.label}</div>
                        <div className={`text-4xl font-black ${item.color} mt-1 tracking-tighter`}>{item.value}</div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <AdminCard
                title="Recent Contact Submissions"
                description="The latest inquiries from your website visitors."
                actions={
                    <AdminButton
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveTab('contacts')}
                        rightIcon={<span>&rarr;</span>}
                    >
                        View All
                    </AdminButton>
                }
            >
                <div className="space-y-4">
                    {stats.recentContacts.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 italic text-gray-400">
                            No recent submissions to display
                        </div>
                    ) : (
                        stats.recentContacts.map((c: ContactSubmission) => (
                            <div key={c.id} className="p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors flex justify-between items-center group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                                        {c.firstName[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase text-xs tracking-wide">
                                            {c.firstName} {c.lastName}
                                        </div>
                                        <div className="text-sm text-gray-500 leading-none mt-1">{c.emailAddress}</div>
                                        <div className="text-xs font-medium text-gray-400 mt-2 line-clamp-1 italic">&ldquo;{c.subject}&rdquo;</div>
                                    </div>
                                </div>
                                <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest bg-white px-2 py-1 rounded-lg border border-gray-50 shadow-sm">
                                    {new Date(c.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </AdminCard>
        </div>
    );
};

export default DashboardTab;

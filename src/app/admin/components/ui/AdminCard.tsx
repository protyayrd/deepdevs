
import React from 'react';

interface AdminCardProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    className?: string;
    actions?: React.ReactNode;
}

const AdminCard: React.FC<AdminCardProps> = ({ children, title, description, className = '', actions }) => {
    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover-lift transition-all duration-300 ${className}`}>
            {(title || actions) && (
                <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                    <div>
                        {title && <h3 className="text-lg font-bold text-gray-900">{title}</h3>}
                        {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
                    </div>
                    {actions && <div className="flex gap-2">{actions}</div>}
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

export default AdminCard;

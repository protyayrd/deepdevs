
import React from 'react';

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label?: string;
    labelClassName?: string;
    error?: string;
    helperText?: string;
    isTextArea?: boolean;
    rows?: number;
}

const AdminInput: React.FC<AdminInputProps> = ({
    label,
    labelClassName = '',
    error,
    helperText,
    isTextArea = false,
    rows = 3,
    className = '',
    id,
    ...props
}) => {
    const inputStyles = `
        w-full px-4 py-2.5 rounded-xl border transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
        ${error ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}
        text-gray-900 placeholder:text-gray-400 text-sm
    `;

    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label htmlFor={id} className={`block text-sm font-semibold text-gray-700 ml-1 ${labelClassName}`}>
                    {label}
                </label>
            )}

            {isTextArea ? (
                <textarea
                    id={id}
                    rows={rows}
                    className={`${inputStyles} resize-none`}
                    {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                />
            ) : (
                <input
                    id={id}
                    className={inputStyles}
                    {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                />
            )}

            {error ? (
                <p className="text-xs font-medium text-red-500 ml-1">{error}</p>
            ) : helperText ? (
                <p className="text-xs text-gray-400 ml-1">{helperText}</p>
            ) : null}
        </div>
    );
};

export default AdminInput;

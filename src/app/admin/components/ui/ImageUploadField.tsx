
import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import AdminInput from './AdminInput';

interface ImageUploadFieldProps {
    label?: string;
    value: string;
    onChange: (url: string) => void;
    placeholder?: string;
    previewSize?: 'sm' | 'md' | 'lg';
    className?: string;
}

const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
};

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
    label,
    value,
    onChange,
    placeholder,
    previewSize = 'md',
    className = ''
}) => {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();

            if (data.url) {
                onChange(data.url);
                toast.success('Image uploaded!');
            } else {
                toast.error(data.error || 'Upload failed');
            }
        } catch {
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={`space-y-3 ${className}`}>
            {label && (
                <label className="block text-sm font-semibold text-gray-700 ml-1">{label}</label>
            )}

            <div className="flex gap-4 items-start">
                {/* Image Preview */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`
                        relative ${sizeClasses[previewSize]} rounded-2xl border-2 border-dashed cursor-pointer
                        transition-all hover:border-indigo-400 hover:bg-indigo-50/50 group overflow-hidden flex-shrink-0
                        ${value ? 'border-gray-200 bg-gray-50' : 'border-gray-300 bg-gray-50'}
                    `}
                >
                    {value ? (
                        <>
                            <img src={value} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-xs font-bold uppercase tracking-widest">Change</span>
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 group-hover:text-indigo-500 transition-colors">
                            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Upload</span>
                        </div>
                    )}

                    {uploading && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                </div>

                {/* URL Input */}
                <div className="flex-1 space-y-2">
                    <AdminInput
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder || 'Enter image URL or upload'}
                    />
                    <p className="text-xs text-gray-400 ml-1">Click the preview to upload, or paste a URL.</p>
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                    e.target.value = ''; // Reset to allow re-uploading same file
                }}
            />
        </div>
    );
};

export default ImageUploadField;

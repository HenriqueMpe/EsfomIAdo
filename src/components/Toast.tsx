'use client';

import { CheckCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-4 fade-in">
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">{message}</span>
                <button onClick={onClose} className="ml-2 hover:bg-green-600 p-1 rounded">
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

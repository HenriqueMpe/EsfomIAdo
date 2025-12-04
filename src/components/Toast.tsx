'use client';

import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

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
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className="bg-white border-2 border-sage-200 rounded-2xl shadow-soft-lg p-4 flex items-center gap-3 min-w-[300px]">
                <div className="w-10 h-10 bg-sage-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <p className="text-charcoal-800 font-medium flex-1">{message}</p>
            </div>
        </div>
    );
}

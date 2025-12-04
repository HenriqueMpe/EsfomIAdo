'use client';

import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-soft-lg max-w-2xl w-full max-h-[90vh] overflow-hidden border-2 border-charcoal-100 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b-2 border-charcoal-100 bg-gradient-to-r from-sage-50 to-cream-50">
                    <h2 className="text-2xl font-heading font-bold text-charcoal-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl hover:bg-charcoal-100 flex items-center justify-center transition-colors duration-200"
                    >
                        <X className="w-5 h-5 text-charcoal-600" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
                    {children}
                </div>
            </div>
        </div>
    );
}

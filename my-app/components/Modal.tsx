import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                </div>
                <div className="mt-2 flex flex-col gap-3">
                    <button 
                        onClick={onClose} 
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
                    >
                        No
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
}
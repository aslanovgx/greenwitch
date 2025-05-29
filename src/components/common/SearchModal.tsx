"use client";
import React from "react";
import { Product } from "@/types/Product";
import Image from "next/image";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    results: Product[];
}

export default function SearchModal({ isOpen, onClose, results }: SearchModalProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay with blur */}
            <div
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="bg-white max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-lg shadow-lg p-6 relative">
                    <button
                        onClick={onClose}
                        className="cursor-pointer absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                    >
                        ✕
                    </button>
                    <h2 className="text-xl font-bold mb-4">Axtarış nəticələri ({results.length})</h2>

                    {results.length === 0 ? (
                        <p className="text-gray-500">Nəticə tapılmadı.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {results.map((item) => (
                                <div
                                    key={item.id}
                                    className="border rounded-lg p-3 flex items-center gap-4 hover:shadow transition"
                                >
                                    <div className="relative w-20 h-20 flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold !uppercase">{item.title}</p>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                        <p className="text-red-600 font-bold">{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

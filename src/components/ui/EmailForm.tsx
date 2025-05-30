'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface EmailFormProps {
    className?: string;
}

export default function EmailForm({ className = '' }: EmailFormProps) {
    const [email, setEmail] = useState('');

    const isValidEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email.trim());
    };

    const handleSubmit = () => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            toast.error("Zəhmət olmasa e-poçt ünvanınızı daxil edin.");
            return;
        }

        if (!isValidEmail(trimmedEmail)) {
            toast.warning("Düzgün e-poçt formatı daxil edin. Məsələn: test@example.com");
            return;
        }

        toast.success("Mesaj uğurla göndərildi ✅");
        setEmail('');
    };

    return (
        <div className={`flex h-[66px] justify-center ${className}`}>
            <input
                type="email"
                placeholder="Email daxil et"
                className={` placeholder-white outline-none`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                // onClick={() => alert("Mesaj göndərildi ✅")}
                onClick={handleSubmit}
                className='hover:bg-gray-950 transition cursor-pointer'>
                Göndər
            </button>
        </div>
    );
}

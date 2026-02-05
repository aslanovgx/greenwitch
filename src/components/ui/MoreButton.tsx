// components/ui/MoreButton.tsx
import React from 'react';
import styles from './MoreButton.module.css';

interface MoreButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function MoreButton({ children, onClick, className = "" }: MoreButtonProps) {
    return (
        <div className={`${styles.moreButton} w-full mx-auto text-center ${className}`}>
            <button onClick={onClick}
                className=" bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:font-semibold transition-all duration-300">
                {children}
            </button>
        </div>
    );
}

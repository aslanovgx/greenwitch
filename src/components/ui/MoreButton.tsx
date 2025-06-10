// components/ui/MoreButton.tsx
import React from 'react';
import styles from './MoreButton.module.css';

interface MoreButtonProps {
    children?: React.ReactNode;
}

export default function MoreButton({ children }: MoreButtonProps) {
    return (
        <div className={`${styles.moreButton} w-full mx-auto text-center`}>
            <button className=" bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:font-semibold transition-all duration-300">
                {children}
            </button>
        </div>
    );
}

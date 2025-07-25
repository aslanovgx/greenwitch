"use client";
import { useEffect, useState } from "react";
import styles from './ScrollToTop.module.css';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {isVisible && (
                <span onClick={scrollToTop} className={styles.scrollToTop}>
                    ↑
                </span>

            )}
        </>
    );
}

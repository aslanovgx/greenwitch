// utils/navbarUtils.ts
import { toast } from "react-toastify";

export const handleProfileClick = () => {
    toast.info("Bu funksiya tezliklə aktiv olacaq.");
};

export const handleScroll = (
    row1Ref: React.RefObject<HTMLDivElement | null>,
    setFixed: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (!row1Ref.current) return;

    const row1Bottom = row1Ref.current.getBoundingClientRect().bottom;
    setFixed(row1Bottom <= 0);
};

export const lockBodyScroll = () => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
};

export const unlockBodyScroll = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
};
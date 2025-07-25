// components/icons/ArrowIcon.tsx
import Image from "next/image";

type ArrowIconProps = {
    isOpen: boolean;
};

export default function ArrowIcon({ isOpen }: ArrowIconProps) {
    return (
        <Image
            src="/assets/icons/upArrow.svg"
            alt="arrow-icon"
            width={16}
            height={16}
            className={`object-contain transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`}
        />
    );
}

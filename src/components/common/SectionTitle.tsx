// components/common/SectionTitle.tsx
interface SectionTitleProps {
    children: React.ReactNode;
    className?: string;
}

export default function SectionTitle({ children, className = '' }: SectionTitleProps) {
    return (
        <h2 className={`text-[32px] text-center mb-[44px] ${className}`}>
            {children}
        </h2>
    );
}

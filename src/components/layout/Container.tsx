// components/layout/Container.tsx

type ContainerProps = {
    children: React.ReactNode;
    className?: string;
};

export default function Container({ children, className = "" }: ContainerProps) {
    return (
        <div
            className={`
        w-full
        px-4
        mx-auto
        max-w-[375px]          // base - mobil
        sm:max-w-[640px]       // iPhone+, kiçik tablet
        md:max-w-[768px]       // orta tablet
        lg:max-w-[1024px]      // laptop
        xl:max-w-[1280px]      // desktop
        2xl:max-w-[1440px]     // geniş ekran
        ${className}
      `}
        >
            {children}
        </div>
    );
}

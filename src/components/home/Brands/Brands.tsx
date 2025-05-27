// "use client";
// import Image from 'next/image'
import styles from './Brands.module.css';
import '@/components/home/Brands/Brands.css'
import AutoSwiper from '@/components/common/AutoSwiper';


const logos = [
    { image: '/assets/home/brands/frederique.png', alt: 'Logo 1' },
    { image: '/assets/home/brands/armani.png', alt: 'Logo 2' },
    { image: '/assets/home/brands/calvin.png', alt: 'Logo 3' },
    { image: '/assets/home/brands/michael.png', alt: 'Logo 4' },
    { image: '/assets/home/brands/hilfiger.png', alt: 'Logo 5' },

];

export default function Brands() {

    return (
        <>
            <div className={`${styles.brands} pb-10`}>
                <h2 className="text-center">Brendlər</h2>
                <AutoSwiper slides={logos} />
            </div>
        </>
    );
}
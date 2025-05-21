import Image from 'next/image'
import styles from './Banner.module.css';

export default function Banner() {
    return (
        <>
            <div className={styles.row_3}>
                <ul className='flex justify-center items-center'>
                    <li>Kişi</li>
                    <li>Qadın</li>
                    <li>Uşaq</li>
                    <li>Aksesuar</li>
                    <li>Saatlar</li>
                    <li>Mağazalar</li>
                </ul>
            </div>

            <div className={`${styles.row_4} flex justify-center items-center`}>
                <Image
                    src={'/assets/navbar/banner-1.jpg'}
                    alt='banner-1'
                    width={302}
                    height={302}
                    className={`${styles.banner_1} object-cover`}
                />
                <Image
                    src={'/assets/navbar/banner-2.jpg'}
                    alt='banner-2'
                    width={658}
                    height={302}
                    className={`${styles.banner_2} object-cover`}
                />
                <Image
                    src={'/assets/navbar/banner-3.jpg'}
                    alt='banner-3'
                    width={284}
                    height={302}
                    className={`${styles.banner_3} object-cover`}
                />
            </div>
        </>
    );
}
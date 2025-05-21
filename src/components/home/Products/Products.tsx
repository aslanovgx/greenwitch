// import Image from 'next/image'
import styles from './Products.module.css';
export default function Products() {
    return (
        <>
            <div className={styles.row_1}>
                <ul className='flex justify-center items-center'>
                    <li>Yeni Gələnlər</li>
                    <li>Məhsullar</li>
                    <li>Endirimdə olanlar</li>
                </ul>
            </div>

            <div className={`${styles.row_2} flex justify-center items-center`}>
                <p>İlk siz kəşf edin – ən son saat trendləri bu bölmədə</p>
            </div>
        </>
    );
}
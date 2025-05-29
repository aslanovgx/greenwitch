import styles from './Footer.module.css';

import Phone from './../../../public/assets/footer/phone.svg'
import Location from './../../../public/assets/footer/location.svg'
import Facebook from './../../../public/assets/footer/facebook.svg'
import Twitter from './../../../public/assets/footer/twitter.svg'
import Instagram from './../../../public/assets/footer/instagram.svg'
import Copyright from './../../../public/assets/footer/bx-copyright.svg.svg'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.footerBox} columns flex justify-evenly items-center`}>
                <ul className='flex flex-col justify-center items-start gap-2'>
                    <li>Əlaqə</li>
                    <li><span><Phone /></span>+9942002020</li>
                    <li className='relative'><span><Location /></span>Nizami küçəsi 96C, AF Mall, 3-cü mərtəbə, Bakı, Azərbaycan -cü mərtəbə, Bakı, Azərbaycan</li>
                </ul>
                <ul className='flex flex-col justify-center items-start gap-2'>
                    <li>Haqqımızda</li>
                    <li>Missiyamız</li>
                    <li>Dəyərlərimiz</li>
                    <li>Brendlərimiz</li>
                    <li>Niyə Biz?</li>
                </ul>
                <ul className='flex flex-col justify-center items-start gap-2'>
                    <li>Məhsullar</li>
                    <li>Yeni gələnlər</li>
                    <li>Ən çox satanlar</li>
                    <li>Qadın</li>
                    <li>Kişi</li>
                    <li>Uşaq</li>
                </ul>
                <ul className='flex flex-col justify-center items-start gap-2'>
                    <li>Social</li>
                    <li>
                        <span><Facebook /></span>
                        <span><Twitter /></span>
                        <span><Instagram /></span>
                    </li>
                </ul>
            </div>
            {/* <div className="w-full h-[1px] bg-gradient-to-r from-white via-black to-white" /> */}
            <div className={`${styles.footerGradientLine} mx-auto`}></div>
            <div className={`${styles.greenwich2025} flex justify-center gap-1 items-center`}>
                <span><Copyright  width={14} height={14} /></span>
                <span>Greenwich 2025</span>
            </div>
        </footer>
    );
}
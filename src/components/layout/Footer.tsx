import Image from 'next/image';
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
            <div className={`${styles.footerBox} columns flex flex-wrap items-center`}>
                <ul className={`${styles.footerLists}`}>
                    <li>
                        <span>Əlaqə</span>
                        <span className={`${styles.plusIcon}`}>
                            <Image
                                src={"/assets/icons/plus.svg"}
                                alt="plus-icon"
                                width={21}
                                height={21}
                                className="object-contain"
                            />
                        </span>
                    </li>
                    <li><span><Phone /></span>+9942002020</li>
                    <li className='relative'><span><Location /></span>Nizami küçəsi 96C, AF Mall, 3-cü mərtəbə, Bakı, Azərbaycan</li>

                </ul>
                <ul className={`${styles.footerLists}`}>
                    <li>
                        <span>Haqqımızda</span>
                        <span className={`${styles.plusIcon}`}>
                            <Image
                                src={"/assets/icons/plus.svg"}
                                alt="plus-icon"
                                width={21}
                                height={21}
                                className="object-contain"
                            />
                        </span>
                    </li>
                    <li>Missiyamız</li>
                    <li>Dəyərlərimiz</li>
                    <li>Brendlərimiz</li>
                    <li>Niyə Biz?</li>
                </ul>
                <ul className={`${styles.footerLists}`}>
                    <li>
                        <span>Məhsullar</span>
                        <span className={`${styles.plusIcon}`}>
                            <Image
                                src={"/assets/icons/plus.svg"}
                                alt="plus-icon"
                                width={21}
                                height={21}
                                className="object-contain"
                            />
                        </span>
                    </li>
                    <li>Yeni gələnlər</li>
                    <li>Ən çox satanlar</li>
                    <li>Qadın</li>
                    <li>Kişi</li>
                    <li>Uşaq</li>
                </ul>
                <ul className={`${styles.socialContainer}`}>
                    <li>Social</li>
                    <li>
                        <span><Facebook /></span>
                        <span><Twitter /></span>
                        <span><Instagram /></span>
                    </li>
                </ul>
            </div>
            <div className={`${styles.footerGradientLine} mx-auto`}>
            </div>
            <div className={`${styles.greenwich2025} flex justify-center gap-1 items-center`}>
                <span><Copyright width={14} height={14} /></span>
                <span>Greenwich 2025</span>
            </div>
        </footer>
    );
}
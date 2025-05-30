    "use client";
    import Image from 'next/image'
    import styles from './Olivia.module.css';

    import EyeIcon from '/public/assets/home/olivia/eye-icon.svg';
    // import { Heart } from "lucide-react";




    export default function Products() {

        return (
            <>
                <div className={`${styles.oliviaGroup} flex justify-between items-center`}>
                    <div className={`${styles.oliviaLeft} relative`}>
                        <Image
                            src={'/assets/home/olivia/olivia-background.png'}
                            alt='olivia-background'
                            width={447}
                            height={204}
                            // fill
                            className={`object-cover`}
                        />
                        <div className={`${styles.oliviaWatches} `}>
                            <Image
                                src={'/assets/home/olivia/olivia-burton.png'}
                                alt='olivia-burton'
                                width={150}
                                height={150}
                                // fill
                                className={`object-cover absolute`}
                            />
                            <Image
                                src={'/assets/home/olivia/hilfiger.png'}
                                alt='hilfiger'
                                width={106}
                                height={141}
                                // fill
                                className={`object-cover absolute scale-x-[-1]`}
                            />
                            <Image
                                src={'/assets/home/olivia/michael.png'}
                                alt='michael'
                                width={150}
                                height={150}
                                // fill
                                className={`object-cover absolute`}
                            />
                        </div>
                        <div className={`${styles.oliviaWatchesDesc} `}>
                            <div className='flex items-center'>
                                <p>OLIVIA BURTON</p>
                                <span>
                                    <EyeIcon />
                                </span>
                            </div>
                            <div className='flex items-center'>
                                <p>HILFIGER</p>
                                <span>
                                    <EyeIcon />
                                </span>
                            </div>
                            <div className='flex items-center'>
                                <p>MICHAEL KORS</p>
                                <span>
                                    <EyeIcon />
                                </span>
                            </div>

                        </div>


                    </div>
                    <div className={`${styles.oliviaRight} flex relative`}>
                        <div className={`${styles.desc} `}>
                            <p>100% orijinal saatlar üçün <b>hədiyyə kartı</b> ilə ətrafınızı sevindirin.</p>
                            <button className='cursor-pointer'>SİFARİŞ ET</button>
                        </div>

                        <div className={`${styles.handImage} relative`}>
                            <Image
                                src={'/assets/home/olivia/hand.png'}
                                alt='hand'
                                width={388}
                                height={447}
                                // fill
                                className={`object-cover`}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './Olivia.module.css';
import EyeIcon from '/public/assets/home/olivia/eye-icon.svg';

const watches = [
  {
    name: "OLIVIA BURTON",
    src: "/assets/home/olivia/olivia-burton.png",
    width: 150,
    height: 150,
    className: styles.oliviaBurton,
    descClass: styles.descOliviaBurton,
  },
  {
    name: "HILFIGER",
    src: "/assets/home/olivia/hilfigerGold.png",
    width: 106,
    height: 141,
    className: styles.hilfigerGold,
     descClass: styles.descHilfigerGold,
  },
  {
    name: "MICHAEL KORS",
    src: "/assets/home/olivia/michael.png",
    width: 150,
    height: 150,
    className: styles.michael,
    descClass: styles.descMichael,
  },
  {
    name: "OLIVIA BURTON",
    src: "/assets/home/olivia/olivia-green.png",
    width: 120,
    height: 150,
    className: styles.oliviaGreen,
    descClass: styles.descOliviaGreen,
  },
  {
    name: "TOMMY HILFIGER",
    src: "/assets/home/olivia/tommy-hilfiger.png",
    width: 106,
    height: 141,
    className: styles.tommyHilfiger,
     descClass: styles.descTommyHilfiger,
  },
  {
    name: "FOSSIL",
    src: "/assets/home/olivia/fossil.png",
    width: 150,
    height: 150,
    className: styles.fossil,
    descClass: styles.descFossil,
  },
];


export default function Products() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 2); // 0 -> 1 -> 0 loop (6 image / 3 per page)
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentWatches = watches.slice(index * 3, index * 3 + 3);

  return (
    <div className={`${styles.oliviaGroup} flex items-center`}>
      <div className={`${styles.oliviaLeft} relative`}>
        <Image
          src={'/assets/home/olivia/olivia-background.png'}
          alt='olivia-background'
          width={447}
          height={204}
          className={`object-cover`}
        />
        <div className={styles.oliviaWatches}>
          {currentWatches.map((watch, i) => (
            <Image
              key={i}
              src={watch.src}
              alt={watch.name}
              width={watch.width}
              height={watch.height}
              className={`object-cover absolute ${watch.className}`}
            />
          ))}
        </div>
        <div className={`${styles.oliviaWatchesDesc}`}>
          {currentWatches.map((watch, i) => (
           <div key={i} className={`flex items-center ${watch.descClass}`}>
              <p>{watch.name}</p>
              <span className='cursor-pointer'><EyeIcon /></span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.oliviaRight} flex relative`}>
        <div className={styles.desc}>
          <p>100% orijinal saatlar üçün <b>hədiyyə kartı</b> ilə ətrafınızı sevindirin.</p>
          <button className='cursor-pointer'>SİFARİŞ ET</button>
        </div>

        <div className={`${styles.handImage} relative`}>
          <Image
            src={'/assets/home/olivia/hand.png'}
            alt='hand'
            width={388}
            height={447}
            className={`object-cover`}
          />
        </div>
      </div>
    </div>
  );
}

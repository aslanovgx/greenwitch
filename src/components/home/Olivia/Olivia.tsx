"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './Olivia.module.css';
import EyeIcon from '/public/assets/home/olivia/eye-icon.svg';
import Link from 'next/link';

const watches = [
  {
    name: "OLIVIA BURTON",
    src: "/assets/home/olivia/olivia-burton.png",
    width: 150,
    height: 150,
    className: styles.oliviaBurton,
    descClass: styles.descOliviaBurton,
    brandId: 7,
  },
  {
    name: "TOMMY HILFIGER",
    src: "/assets/home/olivia/hilfigerGold.png",
    width: 106,
    height: 141,
    className: styles.hilfigerGold,
    descClass: styles.descHilfigerGold,
    brandId: 9,
  },
  {
    name: "MICHAEL KORS",
    src: "/assets/home/olivia/michael.png",
    width: 150,
    height: 150,
    className: styles.michael,
    descClass: styles.descMichael,
    brandId: 1,
  },
  {
    name: "FOSSIL",
    src: "/assets/home/olivia/fossil.png",
    width: 155,
    height: 150,
    className: styles.fossil,
    descClass: styles.descFossil,
    brandId: 3,
  },
  {
    name: "LACOSTE",
    src: "/assets/home/olivia/lacoste.png",
    width: 86,
    height: 141,
    className: styles.lacoste,
    descClass: styles.descLacoste,
    brandId: 4,
  },
  {
    name: "FREDERIQUE CONSTANT",
    src: "/assets/home/olivia/olivia-green.png",
    width: 110,
    height: 150,
    className: styles.frederiqueConstant,
    descClass: styles.descFrederiqueConstant,
    brandId: 8,
  },
  {
    name: "CALVIN KLEIN",
    src: "/assets/home/olivia/calvin-klein.png",
    width: 90,
    height: 150,
    className: styles.calvinKlein,
    descClass: styles.descCalvinKlein,
    brandId: 6,
  },
  {
    name: "CASIO",
    src: "/assets/home/olivia/casio.png",
    width: 80,
    height: 100,
    className: styles.casio,
    descClass: styles.descCasio,
    brandId: 2,
  },
  {
    name: "EMPORIO ARMANI",
    src: "/assets/home/olivia/emporio-armani.png",
    width: 160,
    height: 150,
    className: styles.emporioArmani,
    descClass: styles.descEmporioArmani,
    brandId: 5,
  },
];

export default function Products() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    watches.forEach(w => {
      const img = new window.Image();
      img.src = w.src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 3); // 0 → 1 → 2 → 0
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
          {currentWatches.map((watch) => (
            <div
              key={watch.brandId ?? watch.name}
              className={`absolute ${watch.className}`} 
            >
              <Image
                src={watch.src}
                alt={watch.name}
                width={watch.width}       // <-- width/height saxla
                height={watch.height}
                style={{ display: 'block' }}  // <-- vizual sabitlik
              // objectFit lazım deyil, çünki ölçü konkret verilmişdir
              />
            </div>
          ))}
        </div>

        <div className={`${styles.oliviaWatchesDesc}`}>
          {currentWatches.map((watch) => (
            <div
              key={watch.brandId ?? watch.name} // ✅ stabil key
              className={`flex items-center ${watch.descClass}`}
            >
              <p>{watch.name}</p>
              <Link href={`/products?brandId=${watch.brandId}`}>
                <span className='cursor-pointer'>
                  <EyeIcon />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.oliviaRight} flex relative`}>
        <div className={styles.desc}>
          <p>
            100% orijinal saatlar üçün <b>hədiyyə kartı</b> ilə ətrafınızı sevindirin.
          </p>
          <Link href="/gift-card">
            <button className='cursor-pointer'>SİFARİŞ ET</button>
          </Link>
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

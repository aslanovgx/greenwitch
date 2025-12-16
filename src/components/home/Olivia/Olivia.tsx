"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./Olivia.module.css";
import EyeIcon from "/public/assets/home/olivia/eye-icon.svg";
import Link from "next/link";

const watches = [
  {
    name: "OLIVIA BURTON",
    src: "/assets/home/olivia/olivia-burton.webp",
    width: 150,
    height: 150,
    className: styles.oliviaBurton,
    descClass: styles.descOliviaBurton,
    brandId: 7,
  },
  {
    name: "TOMMY HILFIGER",
    src: "/assets/home/olivia/hilfigerGold.webp",
    width: 106,
    height: 141,
    className: styles.hilfigerGold,
    descClass: styles.descHilfigerGold,
    brandId: 9,
  },
  {
    name: "MICHAEL KORS",
    src: "/assets/home/olivia/michael.webp",
    width: 150,
    height: 150,
    className: styles.michael,
    descClass: styles.descMichael,
    brandId: 1,
  },
  {
    name: "FOSSIL",
    src: "/assets/home/olivia/fossil.webp",
    width: 155,
    height: 150,
    className: styles.fossil,
    descClass: styles.descFossil,
    brandId: 3,
  },
  {
    name: "LACOSTE",
    src: "/assets/home/olivia/lacoste.webp",
    width: 86,
    height: 141,
    className: styles.lacoste,
    descClass: styles.descLacoste,
    brandId: 4,
  },
  {
    name: "FREDERIQUE CONSTANT",
    src: "/assets/home/olivia/olivia-green.webp",
    width: 110,
    height: 150,
    className: styles.frederiqueConstant,
    descClass: styles.descFrederiqueConstant,
    brandId: 8,
  },
  {
    name: "CALVIN KLEIN",
    src: "/assets/home/olivia/calvin-klein.webp",
    width: 90,
    height: 150,
    className: styles.calvinKlein,
    descClass: styles.descCalvinKlein,
    brandId: 6,
  },
  {
    name: "CASIO",
    src: "/assets/home/olivia/casio.webp",
    width: 80,
    height: 100,
    className: styles.casio,
    descClass: styles.descCasio,
    brandId: 2,
  },
  {
    name: "EMPORIO ARMANI",
    src: "/assets/home/olivia/emporio-armani.webp",
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
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 3); // 0 → 1 → 2 → 0
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Aktiv 3-lük (brandId-lər)
  const activeIds = useMemo(() => {
    const chunk = watches.slice(index * 3, index * 3 + 3);
    return new Set(chunk.map((w) => w.brandId));
  }, [index]);

  return (
    <div className={`${styles.oliviaGroup} flex items-center`}>
      <div className={`${styles.oliviaLeft} relative`}>
        {/* Tövsiyə: bunu da .webp et */}
        <Image
          src={"/assets/home/olivia/olivia-background.webp"}
          alt="olivia-background"
          width={447}
          height={204}
          className="object-cover"
          unoptimized
          priority
        />

        {/* WATCHES (hamısı DOM-da qalır) */}
        <div className={styles.oliviaWatches}>
          {watches.map((watch) => {
            const active = activeIds.has(watch.brandId);

            return (
              <div
                key={watch.brandId}
                className={`absolute ${watch.className}`}
                style={{
                  opacity: active ? 1 : 0,
                  pointerEvents: active ? "auto" : "none",
                  transition: "opacity 250ms",
                }}
              >
                <Image
                  src={watch.src}
                  alt={watch.name}
                  width={watch.width}
                  height={watch.height}
                  unoptimized
                  style={{ display: "block" }}
                />
              </div>
            );
          })}
        </div>

        {/* DESCS (hamısı DOM-da qalır) */}
        <div className={styles.oliviaWatchesDesc}>
          {watches.map((watch) => {
            const active = activeIds.has(watch.brandId);

            return (
              <div
                key={watch.brandId}
                className={`flex items-center ${watch.descClass}`}
                style={{
                  opacity: active ? 1 : 0,
                  pointerEvents: active ? "auto" : "none",
                  transition: "opacity 250ms",
                }}
              >
                <p>{watch.name}</p>
                <Link href={`/products?brandId=${watch.brandId}`}>
                  <span className="cursor-pointer">
                    <EyeIcon />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${styles.oliviaRight} flex relative`}>
        <div className={styles.desc}>
          <p>
            100% orijinal saatlar üçün <b>hədiyyə kartı</b> ilə ətrafınızı sevindirin.
          </p>
          <Link href="/gift-card">
            <button className="cursor-pointer">SİFARİŞ ET</button>
          </Link>
        </div>

        <div className={`${styles.handImage} relative`}>
          {/* Tövsiyə: bunu da .webp et */}
          <Image
            src={"/assets/home/olivia/hand.webp"}
            alt="hand"
            width={388}
            height={447}
            className="object-cover"
            unoptimized
            priority
          />
        </div>
      </div>
    </div>
  );
}

"use client"; // Bu vacibdir, çünki useState istifadə olunur

import Image from 'next/image';
import styles from './MapView.module.css';
import { stores, Store } from '@/data/stores';
import { useState } from 'react';

export default function MapView() {
    const [activeStore, setActiveStore] = useState<Store>(stores[0]);
    const [activeCategory, setActiveCategory] = useState("Bakı üzrə");

    return (
        <div className={styles.mapContainer}>
            {/* Sidebar */}
            <ul className={styles.sideBar}>
                <h1>Mağazalarımız</h1>

                <ul className={styles.areaList}>
                    {["Bakı üzrə", "Bölgələr üzrə", "Servis Mərkəzi"].map((area) => (
                        <li
                            key={area}
                            onClick={() => setActiveCategory(area)}
                            className={activeCategory === area ? styles.active : ""}
                        >
                            {area}
                        </li>
                    ))}
                </ul>

                <ul className={`${styles.storePlaces} ${activeCategory !== "Bakı üzrə" ? styles.hideOverflow : ""
                    }`}>
                    {activeCategory === "Bakı üzrə" ? (
                        stores.map((store, idx) => (
                            <li
                                key={idx}
                                onClick={() => setActiveStore(store)}
                                className={store.name === activeStore.name ? styles.active : ""}
                            >
                                <span>{store.name}</span>
                                <span>{store.address}</span>
                                <span>{store.hours}</span>
                                <button
                                    className={styles.storeActionBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(`https://maps.google.com/?q=${store.name}`, "_blank");
                                    }}
                                >
                                    <Image
                                        src={"/assets/icons/arrow-redo.svg"}
                                        alt="arrow-redo-icon"
                                        width={21}
                                        height={21}
                                        className="object-contain"
                                    />
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className={styles.noStoreMessage}>Hazırda mağazamız mövcud deyil.</li>
                    )}
                </ul>
            </ul>

            {/* Google Map */}
            <div className={`${styles.map}`}>
                <iframe
                    className="rounded border"
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${activeStore.location.lat},${activeStore.location.lng}&z=15&output=embed`}
                ></iframe>
            </div>
        </div>
    );
}

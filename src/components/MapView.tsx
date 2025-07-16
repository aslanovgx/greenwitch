"use client"; // Bu vacibdir, çünki useState istifadə olunur

import styles from './MapView.module.css';
import { stores, Store } from '@/data/stores';
import { useState } from 'react';

export default function MapView() {
    const [activeStore, setActiveStore] = useState<Store>(stores[0]);

    return (
        <div className={styles.mapContainer}>
            {/* Sidebar */}
            <ul className={styles.sideBar}>
                <h1>Mağazalarımız</h1>

                <ul className={styles.areaList}>
                    <li>Bakı üzrə</li>
                    <li>Bölgələr üzrə</li>
                    <li>Servis Mərkəzi</li>
                </ul>

                <ul className={styles.storePlaces}>
                    {stores.map((store, idx) => (
                        <li
                            key={idx}
                            onClick={() => setActiveStore(store)}
                            className={store.name === activeStore.name ? styles.active : ""}
                        >
                            <span>{store.name}</span>
                            <span>{store.address}</span>
                            <span>{store.hours}</span>
                        </li>
                    ))}
                </ul>
            </ul>

            {/* Google Map */}
            <div className={`${styles.map}`}>
                <iframe
                    width="100%"
                    height="630px"
                    className="rounded border"
                    loading="eager"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${activeStore.location.lat},${activeStore.location.lng}&z=15&output=embed`}
                ></iframe>
            </div>
        </div>
    );
}

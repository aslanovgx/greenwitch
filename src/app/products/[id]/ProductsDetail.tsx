"use client";
import { useState } from 'react';
// import Zoom from 'react-medium-image-zoom';
import styles from './ProductsDetail.module.css';
import 'react-medium-image-zoom/dist/styles.css';
import { Product } from '@/types/Product';
import Image from "next/image";
import ImageMagnifier from '@/components/ImageMagnifier';
type Props = {
    product: Product;
};

export default function ProductsDetail({ product }: Props) {
    const [activeImage, setActiveImage] = useState<string | null>(
        product.image && product.image.trim() !== '' ? product.image.trim() : null
    );


    const [qty, setQty] = useState(1);

    const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const number = Number(value);
        if (value === '') {
            setQty(1);
        } else if (number >= 1) {
            setQty(number);
        }
    };

    return (
        <div className={styles.products_detail}>
            <div className={styles.leftSide}>
                {/* Thumbnail list */}
                <div className={styles.thumbnails}>
                    {product.thumbnails?.map((thumb, i) => (
                        thumb?.trim() ? (
                            <Image
                                key={i}
                                src={thumb}
                                alt={`thumb-${i}`}
                                width={95}
                                height={127}
                                className={styles.thumbnailImage}
                                onClick={() => setActiveImage(thumb)}
                                style={{
                                    cursor: 'pointer',
                                    border: activeImage === thumb ? '2px solid black' : '1px solid #ccc',
                                }}
                            />
                        ) : null
                    ))}


                </div>

                {/* Zoomed main image */}
                {activeImage && activeImage.trim() !== '' && (
                    <div style={{ maxWidth: 380 }}>
                        <ImageMagnifier
                            src={activeImage}
                            width={380}
                            height={400}
                            zoom={2} // İstəyə görə 2x, 2.5x, 3x və s. artıra bilərsən
                        />
                    </div>
                )}


            </div>

            <div className={styles.rightSide}>
                <h2 className={styles.title}>{product.title}</h2>
                <p className={styles.desc}>{product.desc}</p>
                <p className={styles.price}>{product.price}</p>


                <div className={styles.colorRow}>
                    <span>
                        Rəng: {product.colors.map(clr => clr.name).join(', ')}
                    </span>
                    <div className={styles.colorList}>
                        {product.colors.map((clr, idx) => (
                            <div
                                key={idx}
                                // style={{ background: clr.hex }}
                                style={{
                                    background: clr.hex,
                                    display: 'flex',
                                    gap: '10px',
                                    alignSelf: 'start'
                                }}
                                className={styles.colorDot}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.buyRow}>
                    <input
                        type="number"
                        min="1"
                        className={styles.qtyInput}
                        value={qty}
                        onChange={handleQtyChange}
                    />
                    <button className={styles.buyButton}>İndi Al</button>
                </div>

                <div className={styles.note}>
                    <p>Məhsul detalları və çatdırılma</p>
                </div>
            </div>
        </div>
    );
}

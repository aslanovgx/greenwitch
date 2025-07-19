// components/home/SpecialOffer/SpecialOfferPage.tsx
import Image from "next/image";
import styles from "./SpecialOfferPage.module.css"; // Assuming you have a CSS module for styles
import SpecialOffer from "@/components/home/SpecialOffer/SpecialOffer";
import { Offer, Section } from "@/data/specialOffers"; // Importing the Offer type

export default function SpecialOfferPage({ offer, id }: { offer: Offer; id?: number }) {
    return (
        <div className={styles.specialOfferDetail}>
            <h1 className={`font-bold ${styles.pageTitle}`}>{offer.title}</h1>

            <div className={styles.imageContainer}>
                {offer.images.map((src: string, i: number) => (
                    <div
                        key={i}
                        className={`${styles.imageItem} relative w-full h-[200px] md:h-[180px] rounded overflow-hidden`}
                    >
                        <Image
                            src={src}
                            alt={`image-${i}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            <div className={styles.content}>
                {offer.sections.map((section: Section, i: number) => (
                    <div
                        key={i}
                        className="flex flex-col md:flex-row sm:flex-row gap-6 items-start"
                    >
                        <div className={`${styles.textContent} ${section.image ? styles.textLimited : ""}`}>
                            <h2>{section.heading}</h2>
                            {Array.isArray(section.text) ? (
                                section.heading === "Məhsul çeşidimiz" ? (
                                    <>
                                        <p className={styles.specialLi}>{section.text[0]}</p> {/* birinci element sadəcə p */}
                                        <ul className={styles.textList}>
                                            {section.text.slice(1).map((item, idx) => (
                                                <li key={idx}>
                                                    <p>{item}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <ul className={styles.textList}>
                                        {section.text.map((item, idx) => (
                                            <li key={idx}>
                                                <p>{item}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )
                            ) : (
                                <p>{section.text}</p>
                            )}
                        </div>

                        {section.image && (
                            <div className={`${styles.imageContainer2} relative`}>
                                <Image
                                    src={section.image}
                                    alt={`section-image-${i}`}
                                    fill
                                    className="object-cover"
                                    style={offer.title === "Kredit" ? { objectPosition: "bottom" } : {}}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>



            {id !== undefined && (
                <SpecialOffer hiddenId={id}>
                    Digər
                </SpecialOffer>
            )}
        </div>
    );
}

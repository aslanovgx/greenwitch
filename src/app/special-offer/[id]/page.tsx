import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import SpecialOffer from "@/components/home/SpecialOffer/SpecialOffer";

// ----------------------
// TYPES
// ----------------------

type Section = {
    heading: string;
    text: string;
    image?: string;
};

type Offer = {
    title: string;
    images: string[];
    sections: Section[];
};

// ----------------------
// DYNAMIC DATA
// ----------------------

const specialOffers: Record<string, Offer> = {
    "1": {
        title: "Korporativ Satış",
        images: [
            "/assets/special-offer/image11.jpg",
            "/assets/special-offer/image12.jpg",
            "/assets/special-offer/image13.jpg",
            "/assets/special-offer/image14.jpg"
        ],
        sections: [
            {
                heading: "Korporativ müştərilər üçün eksklüziv təkliflər",
                text: "Mağazalarımızda korporativ müştərilər üçün xüsusi endirimlər, fərdi yanaşma və şəhərdaxili çatdırılma imkanı təklif olunur...",
            },
            {
                heading: "Böyük sifarişlərə sərfəli şərtlər",
                text: "Böyük sifarişlər üçün sərfəli şərtlərlə alış-veriş edə bilərsiniz...",
                image: "/assets/special-offer/image11.jpg",
            },
        ],
    },
    "2": {
        title: "Kredit",
        images: [
            "/assets/special-offer/image21.png",
            "/assets/special-offer/image22.jpg",
            "/assets/special-offer/image23.jpg",
            "/assets/special-offer/image24.jpg"
        ],
        sections: [
            {
                heading: "Faizsiz Taksit və Kredit İmkanları",
                text: "Birkart, Tamkart və Ferrum Kapital ilə 3-6 ay müddətində faizsiz kredit imkanı mövcuddur.",
            },
            {
                heading: "Sadə Sənədləşmə və İlkin Ödənişsiz Proses",
                text: "Ferrum Kapital vasitəsilə yalnız şəxsiyyət vəsiqəsi təqdim etməklə kredit əldə edə bilərsiniz.",
                image: "/assets/special-offer/image2e.jpg",
            }
        ],
    },
    "3": {
        title: "Servis",
        images: [
            "/assets/special-offer/image31.jpg",
            "/assets/special-offer/image32.jpg",
            "/assets/special-offer/image33.jpg",
            "/assets/special-offer/image34.jpg"
        ],
        sections: [
            {
                heading: "Rəsmi Zəmanət İmkanı",
                text: "Mağazalarımızdan aldığınız bütün məhsullar üçün rəsmi və orijinal zəmanət təqdim olunur.",
            },
            {
                heading: "Peşəkar Servis və Satış Sonrası Dəstək",
                text: "Texniki xidmət yalnız rəsmi servis mərkəzlərimizdə, peşəkar heyət tərəfindən həyata keçirilir.",
                image: "/assets/special-offer/image3e.jpg",
            }
        ],
    },
};

// ----------------------
// PAGE COMPONENT
// ----------------------

export default async function SpecialOfferDetail({
    params,
}: {
    params: { id: string };
}) {
    const offer = specialOffers[params.id];
    if (!offer) return notFound();

    return (
        <>
            <div className={styles.specialOfferDetail}>
                <h1 className={`font-bold ${styles.pageTitle}`}>{offer.title}</h1>

                <div className={styles.imageContainer}>
                    {offer.images.map((src, i) => (
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
                    {offer.sections.map((section, i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-6 items-start">
                            <div
                                className={`${styles.textContent} ${section.image ? styles.textLimited : ''}`}
                            >
                                <h2>{section.heading}</h2>
                                <p>{section.text}</p>
                            </div>

                            {section.image && (
                                <div className={`${styles.imageContainer2} relative`}>
                                    <Image
                                        src={section.image}
                                        alt={`section-image-${i}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <SpecialOffer hiddenId={parseInt(params.id)}>
                Digər
            </SpecialOffer>
        </>
    );
}

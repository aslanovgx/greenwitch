import styles from './SpecialOffer.module.css';
import SectionTitle from '@/components/common/SectionTitle';
import Image from "next/image";
import Eye from './../../../../public/assets/icons/eye-special.svg'
export default function SpecialOffer() {
    const cards = [
        { id: 1, title: "KORPORATİV" },
        { id: 2, title: "KREDİT" },
        { id: 3, title: "SERVİS" },
    ];
    return (

        <>
            <div className={`${styles.brands} py-10`}>
                <SectionTitle>Xüsusi İmkanlar</SectionTitle>
                <div className={`${styles.cards_container} mx-auto flex justify-center`}>
                    {cards.map((card) => (
                        <div key={card.id} className="group relative w-[460px] h-[367px] overflow-hidden">
                            <Image
                                src={`/assets/home/specialOffer/image${card.id}.jpg`}
                                alt={`Image ${card.id}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className={`${styles.desc} flex items-center justify-between w-full h-[96px] absolute bottom-0 left-0 px-4 bg-white/80 backdrop-blur-sm`}>
                                <p className="text-black font-medium">{card.title}</p>
                                <span className="relative flex items-center gap-2 overflow-hidden">
                                    <span className="text-[16px] text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                        Ətraflı
                                    </span>
                                    <span className="relative w-[42px] h-[42px] bg-[#EBEBEB] rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
                                        <Eye />
                                        <span className="absolute top-3 w-[6px] h-[6px] opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black rounded-full"></span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
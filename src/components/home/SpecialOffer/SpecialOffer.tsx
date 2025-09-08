"use client";

import styles from './SpecialOffer.module.css';
import SectionTitle from '@/components/common/SectionTitle';
import Image from "next/image";
// import Eye from './../../../../public/assets/icons/eye-special.svg'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from "next/navigation";

type Props = {
    hiddenId?: number;
    children?: React.ReactNode;
};

export default function SpecialOffer({ hiddenId, children }: Props) {
    const cards = [
        { id: 1, title: "KORPORATİV" },
        { id: 2, title: "KREDİT" },
        { id: 3, title: "SERVİS" },
    ];

    const filteredCards = hiddenId
        ? cards.filter((card) => card.id !== hiddenId)
        : cards;

    const router = useRouter();
    return (

        <>
            <div className={`${styles.specialOffer} py-10`}>
                <SectionTitle>{children || "Xüsusi İmkanlar"}</SectionTitle>
                <div className={`${styles.cards_container} ${filteredCards.length === 2 ? styles.twoCards : ''} mx-auto flex justify-center`}>
                    {filteredCards.map((card) => (
                        <div key={card.id} className={`${styles.specialOfferCard} group relative overflow-hidden`}>
                            <Image
                                src={`/assets/home/specialOffer/image${card.id}.jpg`}
                                alt={`Image ${card.id}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                style={card.id === 2 ? { objectPosition: 'bottom' } : {}}
                            />
                            <div className={`${styles.desc} flex items-center justify-between w-full absolute bottom-0 left-0 px-4 bg-white/80 backdrop-blur-sm`}>
                                <p className="text-black font-medium">{card.title}</p>
                                <span className="relative flex items-center gap-2 overflow-hidden">
                                    <span
                                        onClick={() => router.push(`/special-offer/${card.id}`)}
                                        className={`${styles.etrafliSpan} text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0`}
                                    >
                                        Ətraflı
                                    </span>
                                    <span className={`${styles.generalEyeSpan} relative bg-[#EBEBEB] rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-180`}>
                                        <Image
                                            src={"/assets/icons/eye-special.svg"}
                                            alt="account-icon"
                                            width={30}
                                            height={30}
                                            className="object-contain"
                                        />
                                        <span className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black rounded-full"></span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Mobil (max-w-640px) üçün Swiper */}
                <div className={`${styles.mobileSpecialOffer} w-full`}>
                    <Swiper
                        slidesPerView={1.2}
                        centeredSlides={true}
                        spaceBetween={16}
                        pagination={{ el: '.custom-pagination', clickable: true }} // external pagination əlavə
                        modules={[Pagination]}
                        className={`${styles.specialOfferSwiper} w-full h-[300px]`}
                    >
                        {cards.map(card => (
                            <SwiperSlide key={card.id} className='!overflow-visible'>
                                <div className={`${styles.specialOfferCard} group relative overflow-hidden h-[300px]`}>
                                    <Image
                                        src={`/assets/home/specialOffer/image${card.id}.jpg`}
                                        alt={`Image ${card.id}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className={`${styles.desc} flex items-center justify-between w-full absolute bottom-0 left-0 px-4 bg-white/80 backdrop-blur-sm`}>
                                        <p className="text-black font-medium">{card.title}</p>
                                        <span className="relative flex items-center gap-2 overflow-hidden">
                                            <span className="relative flex items-center gap-2 overflow-hidden">
  <span
    onClick={() => router.push(`/special-offer/${card.id}`)}
    className={`${styles.etrafliSpan} text-white cursor-pointer opacity-100 translate-x-0 transition-all duration-300`}
  >
    Ətraflı
  </span>
  <span className={`${styles.generalEyeSpan} relative bg-[#EBEBEB] rounded-full flex items-center justify-center transition-transform duration-500 rotate-180`}>
    <Image
      src={"/assets/icons/eye-special.svg"}
      alt="account-icon"
      width={30}
      height={30}
      className="object-contain"
    />
    <span className="absolute opacity-100 transition-all duration-300 bg-black rounded-full"></span>
  </span>
</span>

                                        </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* Swiper-in altına external pagination div */}
                    <div className="custom-pagination mt-5 flex justify-center"></div>
                </div>
            </div>
        </>
    );
}
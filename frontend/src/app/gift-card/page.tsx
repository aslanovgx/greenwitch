import SpecialOfferPage from "@/components/home/SpecialOffer/SpecialOfferPage";
import { Offer } from "@/data/specialOffers";

const giftCardContent: Offer = {
    title: "Hədiyyə Kartı",
    images: [
        "/assets/gift-card/image1.jpg",
        "/assets/gift-card/image2.jpg",
        "/assets/gift-card/image3.jpg",
        "/assets/gift-card/image4.png",
    ],
    sections: [
        {
            heading: "Tək Kart, Sonsuz Seçim",
            text: "İstənilən məbləğdə tərtib edilə bilən hədiyyə kartları, sevdiklərinizə mağazalarımızda sərbəst şəkildə alış-veriş etmək imkanı təqdim edən, həm praktiki, həm də zövqlü bir hədiyyə seçimidir. Hər münasibət və büdcəyə uyğun bu kartlarla, həm siz, həm də yaxınlarınız istədiklərini rahatlıqla seçə bilərsiniz."
        },
        {
            heading: "Klassik Hədiyyə Kartı ",
            text: "İstənilən məbləğdə tərtib edilə bilən hədiyyə kartları, sevdiklərinizə mağazalarımızda sərbəst şəkildə alış-veriş etmək imkanı təqdim edən, həm praktiki, həm də zövqlü bir hədiyyə seçimidir. Hər münasibət və büdcəyə uyğun bu kartlarla, həm siz, həm də yaxınlarınız istədiklərini rahatlıqla seçə bilərsiniz.",
            image: "/assets/gift-card/classic-gift-card.png"
        },
         {
            heading: "Premium Hədiyyə Kartı ",
            text: "Xüsusi qablaşdırma və əlavə üstünlüklərlə təqdim olunur, fərqli və yadda qalan",
            image: "/assets/gift-card/premium-gift-card.png"
        },
    ]
};

export default function GiftCardPage() {
    return <SpecialOfferPage offer={giftCardContent}/>;
}

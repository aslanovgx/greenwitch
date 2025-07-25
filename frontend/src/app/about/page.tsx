import SpecialOfferPage from "@/components/home/SpecialOffer/SpecialOfferPage";
import { Offer } from "@/data/specialOffers";

const aboutContent: Offer = {
    title: "Haqqımızda",
    images: [
        "/assets/about/image1.jpg",
        "/assets/about/image2.png",
        "/assets/about/image3.jpg",
        "/assets/about/image4.jpg"
    ],
    sections: [
        {
            heading: "Brendimiz haqqında",
            text: "Greenwich Saatları, zamanın dəqiqliyini və zərif zövqü birləşdirən prestijli bir saat markasıdır. Azərbaycanda orijinallığa və keyfiyyətə önəm verən müştərilər üçün seçilmiş dünya brendlərini təqdim edirik. Hər bir saat, zamanla yarışan, dəb və funksionallığı eyni anda yaşamaq istəyənlər üçün xüsusi seçimdir."
        },
        {
            heading: "Missiyamız",
            text: "Məqsədimiz — müştərilərimizə sadəcə bir saat deyil, zamanı dəyərə çevirən bir həyat tərzi təqdim etməkdir. Biz, hər kəsin şəxsi tərzinə və ehtiyacına uyğun saat tapa bilməsi üçün çalışırıq.",
            image: "/assets/about/image11.jpg"
        },
        {
            heading: "Dəyərlərimiz",
            text: [
                "Orijinallıq və zəmanət: Satışa çıxardığımız bütün saatlar rəsmi distribütorlardan alınır və orijinal zəmanətlə təqdim olunur.",
                "Müştəri məmnuniyyəti: Bizim üçün hər bir müştəri özəldir. Satış öncəsi və sonrası xidmətlərlə daim yanınızdayıq.",
                "Keyfiyyətli xidmət: Peşəkar komandamızla sizə doğru məhsulu seçməkdə və qulluqda dəstək oluruq."
            ]
        },
        {
            heading: "Məhsul çeşidimiz",
            text: [
                "Greenwich-də siz həm klassik, həm də müasir dizayna sahib kişi və qadın saatlarını tapa bilərsiniz. Seçimlərimiz arasında:",
                "Avtomatik və kvars mexanizmlər",
                "Suya davamlı modellər",
                "Lüks və gündəlik istifadə üçün uyğun alternativlər mövcuddur."
            ]
        },
        {
            heading: "Haradayıq?",
            text: "Bizi Azərbaycanın aparıcı ticarət mərkəzlərində və rəsmi vebsaytımızda tapa bilərsiniz. Online və fiziki satışlarımızla ölkənin hər yerinə çatdırılma imkanı təqdim edirik."
        },
    ]
};

export default function AboutPage() {
    return <SpecialOfferPage offer={aboutContent} />;
}

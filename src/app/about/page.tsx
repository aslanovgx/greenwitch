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
            text: "BayGroup şirkəti olaraq Azərbaycanda orijinallığa və keyfiyyətə önəm verən müştərilər üçün dünyaca tanınmış, seçilmiş markaları təqdim edirik. Şirkəmiz Fossil, Emporio Armani, Michael Kors, Armani Exchange, Diesel, Lacoste, Tommy Hilfiger, Calvin Klein, Anne Klein, DKNY, Swiss Military Hanova və digər markaların Azərbaycanda rəsmi distributorudur. Bay Group şirkəti qol saatlarının Azərbaycanda pərakəndə, korporativ və topdan satışını həyata keçirir. Bizim təqdim etdiyimiz hər bir saat sadəcə bir aksessuar deyil, həyat tərzinizi tamamlayan dəyərli bir seçimdir."
        },
        {
            heading: "Missiyamız",
            text: "Məqsədimiz — müştərilərimizə sadəcə bir saat deyil, zamanı dəyərə çevirən bir həyat tərzi təqdim etməkdir. Biz, hər kəsin şəxsi tərzinə və ehtiyacına uyğun saat tapa bilməsi üçün çalışırıq.",
            image: "/assets/about/image11.jpg"
        },
        {
            heading: "Dəyərlərimiz",
            text: [
                "Orijinallıq və zəmanət: Bütün təqdim etdiyimiz məhsullar orijinaldır və beynəlxalq zəmanət təqdim edilir.",
                "Müştəri məmnuniyyəti: Hər bir müştərimiz bizim üçün dəyərlidir. Satış prosesinin hər mərhələsində fərdi yanaşma və etibarlı dəstək ilə hər zaman sizinləyik.",
                "Peşəkar xidmət: Komandamız məhsul seçimi, qulluq və texniki dəstək mərhələlərində sizə tam peşəkarlıqla xidmət göstərir."
            ]
        },
        {
            heading: "Məhsul çeşidimiz",
            text: [
                "Greenwich saat mağazaları şəbəkəsində hər zövqə və həyat tərzinə uyğun qadın və kişi modelləri mövcuddur:",
                "Klassik və müasir dizaynlar",
                "Avtomatik və kvars mexanizmlər",
                "Suya davamlı modellər",
                "Lüks və gündəlik istifadə üçün fərqli üslublar"
            ]
        },
        {
            heading: "Haradayıq?",
            text: "Greenwich saat mağazaları şəbəkəsi olaraq təqdim etdiyimiz brendlərin saatlarını Azərbaycanın aparıcı ticarət mərkəzlərində, həmçinin rəsmi onlayn saytımızdan əldə edə bilərsiniz. Onlayn sifarişlə ölkənin istənilən bölgəsinə sürətli və təhlükəsiz çatdırılma həyata keçiririk."
        },
    ]
};

export default function AboutPage() {
    return <SpecialOfferPage offer={aboutContent} />;
}

export type Section = {
    heading: string;
    text: string | string[]; // həm sətir, həm də siyahı kimi işləsin
    image?: string;
};


export type Offer = {
  title: string;
  images: string[];
  sections: Section[];
};

export const specialOffers: Record<string, Offer> = {
  "1": {
    title: "Korporativ Satış",
    images: [
      "/assets/special-offer/image11.jpg",
      "/assets/special-offer/image12.jpg",
      "/assets/special-offer/image13.jpg",
      "/assets/special-offer/image14.jpg",
    ],
    sections: [
      {
        heading: "Korporativ müştərilər üçün eksklüziv təkliflər",
        text: "Mağazalarımızda korporativ müştərilər üçün xüsusi endirimlər, fərdi yanaşma və şəhərdaxili çatdırılma imkanı təklif olunur. Hər bir şirkətin ehtiyacına uyğun olaraq, seçimlərdə məsləhət dəstəyi və əlavə üstünlüklər təqdim edirik. Müştərilərinizə və əməkdaşlarınıza dəyər qatmaq üçün etibarlı və zövqlü saat seçimlərimizlə xidmətinizdəyik.",
      },
      {
        heading: "Böyük sifarişlərə sərfəli şərtlər",
        text: "Böyük sifarişlər üçün sərfəli şərtlərlə alış-veriş edə bilərsiniz. Topdan alımlarda əlavə güzəştlər, qısa müddətdə çatdırılma və satış sonrası dəstək imkanları sizi gözləyir. Satınalma prosesini daha asan və sürətli etmək üçün xüsusi komandamızla daim yanınızdayıq.",
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
      "/assets/special-offer/image24.jpg",
    ],
    sections: [
      {
        heading: "Faizsiz Taksit və Kredit İmkanları",
        text: "Birkart, Tamkart və Ferrum Kapital ilə 3-6 ay müddətində faizsiz kredit imkanı mövcuddur. Birkart və Tamkart istifadəçiləri üçün faizsiz taksitlə alış-veriş etmək daha rahat və sərfəlidir. Hər ay eyni məbləği ödəməklə alış-verişinizi büdcənizə uyğun şəkildə bölüşdürə bilərsiniz. Bu imkanlardan həm onlayn, həm də satış nöqtələrimizdə faydalana bilərsiniz.",
      },
      {
        heading: "Sadə Sənədləşmə və İlkin Ödənişsiz Proses",
        text: "Ferrum Kapital vasitəsilə yalnız şəxsiyyət vəsiqəsi təqdim etməklə kredit əldə edə bilərsiniz — əlavə sənəd və ya qarışıq prosedurlar olmadan.İlkin ödəniş tələb olunmur, bu da məhsulunuzu daha çevik və sürətli şəkildə əldə etməyə imkan yaradır. Rəsmi sənədləşmə qısa zamanda, minimum vaxt itkisi ilə həyata keçirilir. Alış-veriş prosesi boyu müştəri rahatlığı və sadəlik əsas prioritetimizdir.",
        image: "/assets/special-offer/image2e.jpg",
      },
    ],
  },
  "3": {
    title: "Servis",
    images: [
      "/assets/special-offer/image31.jpg",
      "/assets/special-offer/image32.jpg",
      "/assets/special-offer/image33.jpg",
      "/assets/special-offer/image34.jpg",
    ],
    sections: [
      {
        heading: "Rəsmi Zəmanət İmkanı",
        text: "Mağazalarımızdan aldığınız bütün məhsullar üçün rəsmi və orijinal zəmanət təqdim olunur. İstehsalçı tərəfindən tanınan bu zəmanət məhsulun keyfiyyətini qoruyur və sizə əlavə güvən verir. Zəmanət müddətində yaranacaq texniki nasazlıqlar müvafiq qaydada qeydə alınaraq servis prosesinə yönləndirilir.",
      },
      {
        heading: "Peşəkar Servis və Satış Sonrası Dəstək",
        text: "Texniki xidmət yalnız rəsmi servis mərkəzlərimizdə, peşəkar heyət tərəfindən həyata keçirilir. Təmir zamanı orijinal ehtiyat hissələrindən istifadə olunur və bütün proses standartlara uyğun şəkildə aparılır. Satış sonrası təqdim edilən bu xidmətlər məhsulunuzu uzun müddət istifadə etməyə və təhlükəsiz saxlamağa imkan verir.",
        image: "/assets/special-offer/image3e.jpg",
      },
    ],
  },
};

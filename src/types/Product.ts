export interface Product {
    id: number;
    title: string;
    desc?: string; // optional etmək daha uyğundur
    price: number | string;
    image: string;
    hoverImage?: string; // optional etmək daha uyğundur
    originalPrice?: number;
    // coupon?: number;
    coupon: number;
    isNew?: boolean;
    colors: { name: string; hex: string }[]; // <== Əsas budur
    thumbnails?: string[]; // ✅ Burada "required" olaraq saxla
}
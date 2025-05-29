export interface Product {
    id: number;
    title: string;
    desc?: string; // optional etmək daha uyğundur
    price: number | string;
    image: string;
    hoverImage?: string; // optional etmək daha uyğundur
    originalPrice?: number;
    coupon?: number;
    isNew?: boolean;
}
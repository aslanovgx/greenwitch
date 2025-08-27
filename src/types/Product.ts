// src/types/Product.ts

// Backend-dən gələn məhsul strukturu
export type Product = {
  id: number;
  name: string;
  description: string;
  bestSeller: boolean;
  isNew: boolean;
  price: number;
  discountPrice: number | null;
  brandName: string;
  images: string[];        // UI-də artıq absolute URL-lər olacaq (buildImageUrl ilə)
  image?: string | null;
  thumbnails?: string[];
  title?: string;
  desc?: string;
};

// Bəzən admin/BE başqa sahələr də əlavə edə bilər — optional saxlayırıq:
export type RawProduct = {
  id: number;
  name: string;
  description?: string | null;
  bestSeller?: boolean | null;
  isNew?: boolean | null;
  price: number;
  discountPrice?: number | null;
  brandName?: string | null;
  images?: string[] | null;
  colorNames?: string[] | null;
};

// `ProductCard` komponentinin propu üçün
export type ProductCardProps = {
  item: Product;
  activeCardId: number | null;
  setActiveCardId: (id: number | null) => void;
};

// src/types/Product.ts

// UI-də istifadə olunan adaptasiya olunmuş məhsul
export type Product = {
  id: number;
  name: string;
  description: string;
  bestSeller: boolean;
  isNew: boolean;
  price: number;
  discountPrice: number | null;

  brandName: string;
  brandId?: number;          // ✅ list/detail bəzən lazım olur

  images: string[];          // absolute URL-lər
  image?: string | null;     // bəzən tək cover kimi gəlir
  thumbnails?: string[];     // ✅ detail-də var, bəzən listdə də gələ bilər
  colorNames?: string[];     // badge/filter üçün yararlı

  // (opsional) başqa adlar istifadə edirsənsə
  title?: string;
  desc?: string;
};

// Backend-dən xam gələn məhsul (mümkün sahələri opsional saxlayırıq)
export type RawProduct = {
  id: number;

  name?: string | null;
  description?: string | null;

  price?: number | null;
  discountPrice?: number | null;

  bestSeller?: boolean | null;
  isNew?: boolean | null;

  brandId?: number | null;       // ✅ TS error-un əsas səbəbi
  brandName?: string | null;

  images?: string[] | null;
  image?: string | null;
  thumbnails?: string[] | null;  // ✅ detail uyğunluğu

  colorNames?: string[] | null;

  // Aşağıdakılar əsasən detail-də olur; opsional saxlamaq ziyan etmir
  genderName?: string | null;
  shapeName?: string | null;
  categoryName?: string | null;

  stock?: number | null;
  mechanismName?: string | null;
  waterResistanceAtm?: number | null;
  caseSizeMm?: number | null;
  materialName?: string | null;
  siferblatMaterialName?: string | null;
};

// ProductCard propu
export type ProductCardProps = {
  item: Product;
  activeCardId: number | null;
  setActiveCardId: (id: number | null) => void;
};

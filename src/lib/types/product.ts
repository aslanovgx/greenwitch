// Filter paramları
export type ProductFilter = {
  Gender?: number;
  brandId?: number;
  shapeId?: number;
  categoryId?: number;
  colorId?: number;
  page?: number;
  size?: number;
  search?: string;
  sort?: "price_asc" | "price_desc";
};

// Pagination meta
export type PaginationMeta = {
  total?: number;
  page?: number;
  size?: number;
};

// List item tipi (product listində lazım olan minimal sahələr)
export type ProductListItem = {
  id: number;
  name: string;
  price: number;
  discountPrice?: number | null;
  brandName?: string;
  thumbnails?: string[];
};

// Product detail tipi
export type ProductDetail = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  bestSeller: boolean;
  isNew: boolean;

  brandName: string;
  genderName?: string;
  shapeName?: string;
  categoryName?: string;
  thumbnails: string[];
  colorNames?: string[];

  stock?: number;
  mechanismName?: string;
  waterResistanceAtm?: number;
  caseSizeMm?: number;
  materialName?: string;
  siferblatMaterialName?: string;
};

// Cavab forması iki cür ola bilər: array və ya { products, total, page, size }
export type ProductListResponse =
  | ProductListItem[]
  | { products: ProductListItem[]; total?: number; page?: number; size?: number };

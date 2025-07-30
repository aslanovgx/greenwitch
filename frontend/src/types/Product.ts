export type Product = {
  id: number;
  genderId: number;
  categoryId: number;
  brandId: number;
  shapeId: number | null;
  name: string;
  description: string;
  bestSeller: boolean;
  price: number;
  discountPrice: number | null;
  stock: number;
  genderName: string;
  categoryName: string;
  brandName: string;
  shapeName: string | null;
  colorNames: string[];
  images: string[];
};

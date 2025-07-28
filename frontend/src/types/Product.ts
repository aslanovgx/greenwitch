export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  bestSeller: boolean;
  genderId: number;
  categoryId: number;
  brandId: number;
  shapeId: number | null;
  colorNames: string[];
  genderName: string;
  categoryName: string;
  brandName: string;
  shapeName: string | null;
  images: string[];
};

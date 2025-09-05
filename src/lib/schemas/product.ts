// lib/schemas/product.ts
import { z } from "zod";

export const ProductListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  discountPrice: z.number().nullable().optional(),
  brandName: z.string().optional(),
  thumbnails: z.array(z.string()).optional(),
});

export const ProductDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().default(""),
  price: z.number(),
  discountPrice: z.number().nullable(),
  bestSeller: z.boolean(),
  isNew: z.boolean(),
  brandName: z.string(),
  genderName: z.string().optional(),
  shapeName: z.string().optional(),
  categoryName: z.string().optional(),
  thumbnails: z.array(z.string()).default([]),
  colorNames: z.array(z.string()).optional(),

  stock: z.number().optional(),
  mechanismName: z.string().optional(),
  waterResistanceAtm: z.number().optional(),
  caseSizeMm: z.number().optional(),
  materialName: z.string().optional(),
  siferblatMaterialName: z.string().optional(),
});

// List cavabı iki cür ola bilər:
export const ProductListResponseSchema = z.union([
  z.array(ProductListItemSchema),
  z.object({
    products: z.array(ProductListItemSchema),
    total: z.number().optional(),
    page: z.number().optional(),
    size: z.number().optional(),
  }),
]);

export type ProductListItemParsed = z.infer<typeof ProductListItemSchema>;
export type ProductDetailParsed = z.infer<typeof ProductDetailSchema>;

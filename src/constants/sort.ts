export const SORT_LABEL_TO_CODE = {
  "Yeni Gələnlər": "new",
  "Endirimli Məhsullar": "discount",
  "Ən Çox Satılanlar": "best",
  "Qiymət (Aşağıdan Yuxarıya)": "price_asc",
  "Qiymət (Yuxarıdan Aşağıya)": "price_desc",
} as const;

export type SortCode = typeof SORT_LABEL_TO_CODE[keyof typeof SORT_LABEL_TO_CODE];

export const SORT_CODE_TO_LABEL: Record<SortCode, string> = Object.fromEntries(
  Object.entries(SORT_LABEL_TO_CODE).map(([label, code]) => [code, label])
) as Record<SortCode, string>;

export const SORT_LABELS = Object.keys(SORT_LABEL_TO_CODE) as Array<keyof typeof SORT_LABEL_TO_CODE>;

export const isValidSort = (v: string | null): v is SortCode =>
  v !== null && Object.values(SORT_LABEL_TO_CODE).includes(v as SortCode);

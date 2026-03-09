import { apiGet } from "./fetcher";

export type VisualSectionImage = {
  id: number;
  imagePath: string;
};

export type VisualSection = {
  id: number;
  status?: boolean;
  images?: VisualSectionImage[];
};

export async function getVisualSections(): Promise<VisualSection[]> {
  const raw = await apiGet("/VisualSection");

  const list = Array.isArray(raw?.visualSections)
    ? raw.visualSections
    : Array.isArray(raw)
    ? raw
    : [];

  return list as VisualSection[];
}
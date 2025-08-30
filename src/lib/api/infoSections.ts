// lib/api/infoSections.ts
import { apiGet } from "./fetcher";

export type InfoSectionImage = { id: number; imagePath: string };
export type InfoSection = {
  id: number;
  title: string;
  url?: string | null;
  status?: boolean;
  images?: InfoSectionImage[];
};

export async function getInfoSections(): Promise<InfoSection[]> {
  const raw = await apiGet("/InfoSections");
  const list = Array.isArray(raw?.infoSections) ? raw.infoSections
            : Array.isArray(raw) ? raw : [];
  return list as InfoSection[];
}

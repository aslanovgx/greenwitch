import { apiGet } from "./fetcher";
import type { Offer } from "@/data/specialOffers";

interface AboutTopImage {
  id: number;
  imageUrl: string;
  order: number;
}

interface AboutSectionApi {
  id: number;
  title: string;
  description: string;
  order: number;
  filePath: string | null;
}

interface AboutPageResponse {
  topImages: AboutTopImage[];
  sections: AboutSectionApi[];
}

const API_BASE = process.env.API_SAAT_BASE_URL ?? "https://api.saat.az/api";

function buildImageUrl(path?: string | null) {
  if (!path) return undefined;

  if (path.startsWith("http")) return path;

  const clean = API_BASE.replace(/\/api$/, "");
  return `${clean}/${path}`;
}

function splitDescription(description: string): string[] {
  return description
    .split(/\s{2,}|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function getAboutPage(): Promise<Offer> {
  const raw: AboutPageResponse = await apiGet("/About/page");

  const images = raw.topImages.map((img) => buildImageUrl(img.imageUrl)!).filter(Boolean);

  const sections = raw.sections
    .sort((a, b) => a.order - b.order)
    .map((section) => {
      let text: string | string[] = section.description;

      if (
        section.title === "Dəyərlərimiz" ||
        section.title === "Məhsul çeşidimiz"
      ) {
        text = splitDescription(section.description);
      }

      return {
        heading: section.title,
        text,
        image: buildImageUrl(section.filePath),
      };
    });

  return {
    title: "Haqqımızda",
    images,
    sections,
  };
}
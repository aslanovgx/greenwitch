// lib/api/labelSettings.ts
import { apiGet } from "./fetcher";

export type LabelSetting = {
  id: number;
  color: string;   // "#RRGGBB"
  type: 0 | 1 | 2 | 3; // 0-none, 1-BEST, 2-NEW, 3-DISCOUNT
  isActive: boolean;
};

export async function getLabelSettings(): Promise<LabelSetting[]> {
  const raw = await apiGet("/LabelSettings"); // <-- səndə hansı endpointdirsə
  const list = Array.isArray(raw?.labelSettings) ? raw.labelSettings
            : Array.isArray(raw) ? raw : [];
  return list as LabelSetting[];
}

/** Aktiv rəngləri xəritələyir */
export type BadgeType = 1 | 2 | 3;
export type BadgeColorMap = Partial<Record<BadgeType, string>>;

export function toActiveColorMap(items: LabelSetting[]): BadgeColorMap {
  const map: BadgeColorMap = {};
  for (const it of items) {
    if (it.isActive && (it.type === 1 || it.type === 2 || it.type === 3)) {
      map[it.type] = it.color;
    }
  }
  return map;
}

import { FEATURES, THEME, OFFER_URL } from "./config";

export type ThemeKey = "apple" | "shein" | "amazon" | "walmart" | "cashapp";
export type Features = typeof FEATURES;

export interface AdminConfig {
  features: Features;
  theme: ThemeKey;
  offerUrl: string;
}

const STORAGE_KEY = "lander_admin";

export function loadAdminConfig(): AdminConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AdminConfig>;
      return {
        features: { ...FEATURES, ...(parsed.features ?? {}) },
        theme: (parsed.theme as ThemeKey) ?? (THEME as ThemeKey),
        offerUrl: parsed.offerUrl ?? OFFER_URL,
      };
    }
  } catch {}
  return { features: { ...FEATURES }, theme: THEME as ThemeKey, offerUrl: OFFER_URL };
}

export function saveAdminConfig(cfg: AdminConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
}

export function resetAdminConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}

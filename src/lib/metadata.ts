import type { Metadata } from "next";
import { languages, localized, type Language } from "@/data/locale";

export const origin = new URL(process.env.VIP_BOAT_SITE_URL || "https://vip-boat.ru");

export function pageMetadata(language: Language, path: string, title: string, description: string, multilingual = true): Metadata {
  const canonical = localized(language, path);
  return {
    title, description,
    alternates: {
      canonical,
      ...(multilingual && { languages: {
        ...Object.fromEntries(languages.map(locale => [locale === "zh" ? "zh-Hans" : locale, localized(locale, path)])),
        "x-default": path,
      } }),
    },
    openGraph: {
      title, description, url: canonical, type: "website", siteName: "Vip Boat",
      locale: { ru: "ru_RU", en: "en_GB", zh: "zh_CN" }[language],
      images: [{ url: "/media/hero-1200.webp", width: 1200, height: 800, alt: "Vip Boat" }],
    },
  };
}

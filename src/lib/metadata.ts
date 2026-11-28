import type { Metadata } from "next";
import { languages, localized, type Language } from "@/data/locale";
import { responsivePhoto } from "./media";

export const origin = new URL(process.env.VIP_BOAT_SITE_URL || "https://vip-boat.ru");

type PageOptions = { multilingual?: boolean; draft?: boolean; image?: { asset: string; alt: string } };

export function pageMetadata(language: Language, path: string, title: string, description: string, options: PageOptions = {}): Metadata {
  const { multilingual = true, draft = false, image } = options;
  const canonical = localized(language, path);
  const photo = image && responsivePhoto(image.asset, "100vw");
  return {
    title, description,
    ...(draft && { robots: { index: false, follow: true } }),
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
      images: [photo && image
        ? { url: photo.src, width: photo.width, height: photo.height, alt: image.alt }
        : { url: "/media/hero-1200.webp", width: 1200, height: 800, alt: "Vip Boat" }],
    },
  };
}

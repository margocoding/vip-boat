import type { MetadataRoute } from "next";
import { languages, localized } from "@/data/locale";
import { allVessels, fleetSections } from "@/data/rental";
import { editorial } from "@/data/editorial";
import { origin } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/", "/contacts",
    ...Object.keys(fleetSections).map(section => `/${section}`),
    ...allVessels.map(vessel => vessel.href),
    ...Object.entries(editorial).flatMap(([section, collection]) => [
      `/${section}`, ...collection.items.map(({ slug }) => `/${section}/${slug}`),
    ]),
  ];
  return [
    ...paths.flatMap(path => languages.map(language => ({ url: new URL(localized(language, path), origin).toString() }))),
    ...["/prodazha-yacht", "/fotosessiya-na-yachte"].map(path => ({ url: new URL(path, origin).toString() })),
  ];
}

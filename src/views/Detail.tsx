import { notFound } from "next/navigation";
import { BoatDetail } from "@/components/rental/BoatDetail";
import { EditorialPage } from "@/components/rental/EditorialPage";
import { editorial, isEditorialSection } from "@/data/editorial";
import { allVessels, fleet, isFleetSection, vesselDescription } from "@/data/rental";
import type { Language } from "@/data/locale";
import { pageMetadata } from "@/lib/metadata";

export type DetailProps = { params: Promise<{ section: string; slug: string }> };

export function generateStaticParams() {
  return [
    ...allVessels.map(({ section, slug }) => ({ section, slug })),
    ...Object.entries(editorial).flatMap(([section, collection]) => collection.items.map(({ slug }) => ({ section, slug }))),
  ];
}

export async function detailMetadata(language: Language, params: DetailProps["params"]) {
  const { section, slug } = await params;
  const path = `/${section}/${slug}`;
  if (isFleetSection(section)) {
    const boat = fleet[section].find(item => item.slug === slug);
    if (boat) {
      const description = language === "ru" ? boat.seo?.description || vesselDescription(boat) :
        language === "en" ? `${boat.name}. Private charter in St Petersburg for up to ${boat.capacity} guests.` :
          `${boat.name}，圣彼得堡私人包船，最多可容纳 ${boat.capacity} 位客人。`;
      return pageMetadata(language, path, (language === "ru" && boat.seo?.title) || `${boat.name} | Vip Boat`, description);
    }
  }
  if (isEditorialSection(section)) {
    const item = editorial[section].items.find(entry => entry.slug === slug);
    if (item) return pageMetadata(language, path, `${item.name[language]} | Vip Boat`, item.description[language]);
  }
  return {};
}

export default async function Detail({ language, params }: DetailProps & { language: Language }) {
  const { section, slug } = await params;
  if (isFleetSection(section)) {
    const vessel = fleet[section].find(item => item.slug === slug);
    if (vessel) return <BoatDetail vessel={vessel} language={language} />;
  }
  if (isEditorialSection(section) && editorial[section].items.some(item => item.slug === slug)) {
    return <EditorialPage section={section} language={language} slug={slug} />;
  }
  notFound();
}

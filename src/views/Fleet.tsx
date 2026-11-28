import { FleetCatalog, type CatalogQuery } from "@/components/rental/FleetCatalog";
import type { Language } from "@/data/locale";
import { fleetSectionCopy, type FleetSection } from "@/data/rental";
import { pageMetadata } from "@/lib/metadata";

// Keep query-driven catalogs on named routes so unknown sections reach the global 404.
export function fleetPage(language: Language, section: FleetSection) {
  const { title, description } = fleetSectionCopy(section, language);
  const metadata = pageMetadata(language, `/${section}`, `${title} | Vip Boat`, description);

  async function Page({ searchParams }: { searchParams: Promise<CatalogQuery> }) {
    return <FleetCatalog section={section} query={await searchParams} language={language} />;
  }

  return { metadata, Page };
}

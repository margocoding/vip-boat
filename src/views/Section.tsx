import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { editorial, documents, isEditorialSection } from "@/data/editorial";
import { fleetSections, isFleetSection } from "@/data/rental";
import { interfaceText, localized, type Language } from "@/data/locale";
import { pageMetadata } from "@/lib/metadata";
import { FleetCatalog, type CatalogQuery } from "@/components/rental/FleetCatalog";
import { EditorialPage } from "@/components/rental/EditorialPage";
import { InteriorHeading } from "@/components/rental/InteriorHeading";
import { EnquireButton } from "@/components/EnquireButton";
import { SaleSection } from "@/components/SaleSection";
import { Photo } from "@/components/Photo";

export type SectionProps = { params: Promise<{ section: string }>; searchParams: Promise<CatalogQuery> };

const supplementary = {
  "prodazha-yacht": { title: "Продажа яхт", description: "Подбор яхты, организация осмотра и сопровождение сделки." },
  "fotosessiya-na-yachte": { title: "Фотосессия на яхте", description: "Прогулка с фотографом по Неве и каналам или выход в Финский залив." },
  news: { title: "Новости", description: "Новости навигации, события на воде и рекомендации для прогулок." },
};

function isSupplementary(value: string): value is keyof typeof supplementary {
  return Object.hasOwn(supplementary, value);
}

export async function sectionMetadata(language: Language, params: SectionProps["params"]) {
  const { section } = await params;
  const copy = interfaceText[language];
  let title: string;
  let description: string;
  if (isFleetSection(section)) {
    const names = { "arenda-yachty": copy.yachts, "arenda-catera": copy.boats, "arenda-teplohoda": copy.ships };
    title = language === "ru" ? fleetSections[section].title : names[section];
    description = language === "ru" ? fleetSections[section].description : `${title} · Vip Boat · St Petersburg`;
  } else if (isEditorialSection(section)) {
    title = editorial[section].title[language];
    description = editorial[section].description[language];
  } else if (section === "contacts") {
    title = copy.contact;
    description = `Vip Boat · ${site.phone}`;
  } else if (language === "ru" && isSupplementary(section)) {
    ({ title, description } = supplementary[section]);
  } else if (language === "ru" && Object.hasOwn(documents, section)) {
    return { ...pageMetadata(language, `/${section}`, documents[section], "Документы Vip Boat", false), robots: { index: false, follow: true } };
  } else return {};
  return pageMetadata(language, `/${section}`, `${title} | Vip Boat`, description, !isSupplementary(section));
}

export default async function Section({ language, params, searchParams }: SectionProps & { language: Language }) {
  const { section } = await params;
  if (isFleetSection(section)) return <FleetCatalog section={section} query={await searchParams} language={language} />;
  if (isEditorialSection(section)) return <EditorialPage section={section} language={language} />;
  const copy = interfaceText[language];
  const home = { href: localized(language), label: copy.home };
  if (section === "contacts") return (
    <>
      <InteriorHeading home={home} title={copy.contact} />
      <div className="interior-content contact-page">
        <a href={site.phoneHref}>{site.phone}</a>
        <p>{site.legal.owner}</p>
        <div className="editorial-actions">{site.socials.slice(0, 2).map(item => <a key={item.label} className="link-arrow" href={item.href}>{item.label} ↗</a>)}</div>
      </div>
    </>
  );
  if (language !== "ru") notFound();
  if (Object.hasOwn(documents, section)) return (
    <>
      <InteriorHeading title={documents[section]} />
      <div className="interior-content document-page">
        <p>Место для согласованного текста документа. Сейчас на сайте представлена демонстрационная форма заявки.</p>
        {section === "privacy-policy" && <a className="plain-link" href="https://vip-boat.ru/privacy-policy">Политика действующего сайта ↗</a>}
      </div>
    </>
  );
  if (!isSupplementary(section)) notFound();
  const page = supplementary[section];
  return (
    <>
      <InteriorHeading title={page.title} subtitle={page.description} />
      {section === "prodazha-yacht" ? <SaleSection /> : section === "news" ? (
        <div className="interior-content"><a className="link-arrow" href="https://vip-boat.ru/news">Читать новости Vip Boat ↗</a></div>
      ) : (
        <div className="interior-content">
          <article className="editorial-feature">
            <Photo src="events" sizes="(max-width: 860px) 94vw, 50vw" priority />
            <div className="editorial-feature__body">
              <h2>Фотографии на воде</h2>
              <p>Согласуйте время, маршрут и подходящее судно. В калькуляторе аренды можно добавить фотографа.</p>
              <div className="editorial-actions"><EnquireButton note={page.title}>{copy.enquiry}</EnquireButton><Link href="/arenda-yachty" className="link-arrow">Выбрать яхту →</Link></div>
            </div>
          </article>
        </div>
      )}
    </>
  );
}

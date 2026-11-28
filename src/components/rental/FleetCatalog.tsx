import Link from "next/link";
import { fleet, fleetSectionCopy, fleetSections, type FleetSection } from "@/data/rental";
import { interfaceText, localized, type Language } from "@/data/locale";
import { BoatCard } from "./BoatCard";
import { InteriorHeading } from "./InteriorHeading";

export type CatalogQuery = Record<string, string | string[] | undefined>;
const text = {
  ru: {
    guests: "Сколько гостей?", example: "Например, 50", deck: "Палубы", sort: "Сортировка", any: "Все",
    oneDeck: "Однопалубные", twoDecks: "Двухпалубные", premium: "Премиум", recommended: "Рекомендуемые",
    lower: "Сначала дешевле", higher: "Сначала дороже", apply: "Показать", reset: "Сбросить", more: "Ещё фильтры",
    results: "Найдено судов", empty: "Подходящих судов нет", retry: "Измените число гостей или сбросьте фильтры.",
    layout: "Планировка и рассадка показаны для примера.",
  },
  en: {
    guests: "Guests in your group", example: "For example, 50", deck: "Decks", sort: "Sort by", any: "Any",
    oneDeck: "Single deck", twoDecks: "Two decks", premium: "Premium", recommended: "Recommended",
    lower: "Lowest price first", higher: "Highest price first", apply: "Show results", reset: "Reset", more: "More filters",
    results: "Matching vessels", empty: "No vessels match", retry: "Change the number of guests or clear the filters.",
    layout: "Decks and seating are shown for illustration.",
  },
  zh: {
    guests: "同行宾客人数", example: "例如，50", deck: "甲板", sort: "排序", any: "不限",
    oneDeck: "单层甲板", twoDecks: "双层甲板", premium: "高端", recommended: "推荐",
    lower: "价格从低到高", higher: "价格从高到低", apply: "查看结果", reset: "重置", more: "更多筛选",
    results: "匹配的船只", empty: "暂无符合条件的船只", retry: "请调整宾客人数或清除筛选条件。",
    layout: "甲板与座位布局为演示示例。",
  },
} as const;

export function FleetCatalog({ section, query, language }: { section: FleetSection; query: CatalogQuery; language: Language }) {
  const nav = interfaceText[language];
  const labels = text[language];
  const sections = Object.keys(fleetSections) as FleetSection[];
  const copy = fleetSectionCopy(section, language);
  const ships = section === "arenda-teplohoda";
  const guestParam = query.guests ?? query.capacity;
  const partySize = typeof guestParam === "string" ? Number(guestParam) : 0;
  const guests = Number.isSafeInteger(partySize) && partySize > 0 ? partySize : undefined;
  const deck = ships && (query.deck === "1" || query.deck === "2") ? Number(query.deck) : undefined;
  const premium = ships && query.premium === "1";
  const sort = query.sort === "price-asc" || query.sort === "price-desc" ? query.sort : "";
  const items = fleet[section].filter(vessel =>
    (guests === undefined || vessel.capacity >= guests) &&
    (!deck || vessel.configuration?.decks === deck) &&
    (!premium || vessel.configuration?.premium),
  );
  if (sort) items.sort((a, b) => sort === "price-asc" ? a.price - b.price : b.price - a.price);
  const path = localized(language, `/${section}`);
  const advanced = Boolean(deck || premium || sort);
  return (
    <>
      <InteriorHeading
        compact
        title={copy.title}
        subtitle={copy.description}
        home={{ href: localized(language), label: nav.home }}
      />
      <section className="interior-content fleet-content" aria-label={nav.fleet}>
        <nav className="fleet-nav" aria-label={nav.fleet}>
          {sections.map((item) => (
            <Link key={item} href={localized(language, `/${item}`)} aria-current={item === section ? "page" : undefined} prefetch={false}>
              {fleetSectionCopy(item, language).name}
            </Link>
          ))}
        </nav>
        <form className="fleet-filters" action={path} method="get">
          <div className="fleet-filters__quick">
            <label>{labels.guests}
              <input name="guests" type="number" inputMode="numeric" min="1" defaultValue={guests}
                placeholder={labels.example} />
            </label>
            <button className="btn btn--solid btn--sm" type="submit">{labels.apply}</button>
          </div>
          <details className="fleet-filters__more" open={advanced}>
            <summary>{labels.more}</summary>
            <div className="fleet-filters__advanced">
              {ships && <>
                <label>{labels.deck}
                  <select name="deck" defaultValue={deck || ""}>
                    <option value="">{labels.any}</option>
                    <option value="1">{labels.oneDeck}</option>
                    <option value="2">{labels.twoDecks}</option>
                  </select>
                </label>
                <label className="fleet-premium"><input name="premium" type="checkbox" value="1" defaultChecked={premium} />{labels.premium}</label>
              </>}
              <label>{labels.sort}
                <select name="sort" defaultValue={sort}>
                  <option value="">{labels.recommended}</option>
                  <option value="price-asc">{labels.lower}</option>
                  <option value="price-desc">{labels.higher}</option>
                </select>
              </label>
            </div>
          </details>
        </form>
        <div className="fleet-summary">
          <p>{labels.results} · <strong>{items.length}</strong></p>
          {(guests || advanced) && items.length > 0 && <Link href={path} className="plain-link" prefetch={false}>{labels.reset}</Link>}
          {ships && items.length > 0 && <small>{labels.layout}</small>}
        </div>
        {items.length ? (
          <ul className="cards cards--3 fleet-grid">
            {items.map((vessel, index) => (
              <li key={vessel.slug}><BoatCard vessel={vessel} language={language} heading="h2" priority={index === 0} /></li>
            ))}
          </ul>
        ) : (
          <div className="fleet-empty"><h2>{labels.empty}</h2><p>{labels.retry}</p><Link href={path} className="link-arrow" prefetch={false}>{labels.reset} →</Link></div>
        )}
      </section>
    </>
  );
}

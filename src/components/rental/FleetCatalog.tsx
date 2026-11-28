import Link from "next/link";
import { fleet, fleetSections, type FleetSection } from "@/data/rental";
import { interfaceText, localized, type Language } from "@/data/locale";
import { BoatCard } from "./BoatCard";
import { InteriorHeading } from "./InteriorHeading";

export type CatalogQuery = Record<string, string | string[] | undefined>;
const capacities = [10, 30, 50, 100, 150];
const text = {
  ru: {
    descriptions: ["Моторные яхты с капитаном для прогулок по Неве и Финскому заливу.", "Катера для небольших компаний и прогулок по рекам и каналам Петербурга.", "Теплоходы для свадеб, корпоративов и других событий на воде."],
    labels: ["Вместимость", "Палубы", "Сортировка", "Все", "До", "гостей", "Однопалубные", "Двухпалубные", "Премиум", "Рекомендуемые", "Сначала дешевле", "Сначала дороже", "Показать", "Сбросить", "Найдено", "По этим параметрам судов нет", "Попробуйте изменить вместимость или убрать фильтр.", "Планировка и рассадка показаны для примера."],
  },
  en: {
    descriptions: ["Yachts with a skipper for the Neva River and the Gulf of Finland.", "Motorboats for small groups exploring St Petersburg’s rivers and canals.", "Event boats for weddings, private celebrations and corporate receptions."],
    labels: ["Capacity", "Decks", "Sort by", "Any", "Up to", "guests", "Single deck", "Two decks", "Premium", "Recommended", "Price: low to high", "Price: high to low", "Apply", "Reset", "Results", "No vessels match", "Try a different capacity or clear the filters.", "Decks and seating are shown for illustration."],
  },
  zh: {
    descriptions: ["乘坐配备船长的游艇，畅游涅瓦河与芬兰湾。", "适合小团体的快艇之旅，探索圣彼得堡的河流与运河。", "适合婚礼、私人庆典及企业活动的宴会船。"],
    labels: ["载客量", "甲板", "排序", "不限", "最多", "人", "单层甲板", "双层甲板", "高端", "推荐", "价格从低到高", "价格从高到低", "筛选", "重置", "结果", "暂无符合条件的船只", "请调整载客量或清除筛选条件。", "甲板与座位布局为演示示例。"],
  },
} as const;

export function FleetCatalog({ section, query, language }: { section: FleetSection; query: CatalogQuery; language: Language }) {
  const nav = interfaceText[language];
  const labels = text[language].labels;
  const sections = Object.keys(fleetSections) as FleetSection[];
  const sectionNames = [nav.yachts, nav.boats, nav.ships];
  const current = sections.indexOf(section);
  const ships = section === "arenda-teplohoda";
  const capacity = capacities.find(value => String(value) === query.capacity);
  const deck = ships && (query.deck === "1" || query.deck === "2") ? Number(query.deck) : undefined;
  const premium = ships && query.premium === "1";
  const sort = query.sort === "price-asc" || query.sort === "price-desc" ? query.sort : "";
  const items = fleet[section].filter(vessel =>
    (!capacity || vessel.capacity <= capacity) &&
    (!deck || vessel.configuration?.decks === deck) &&
    (!premium || vessel.configuration?.premium),
  );
  if (sort) items.sort((a, b) => sort === "price-asc" ? a.price - b.price : b.price - a.price);
  const path = localized(language, `/${section}`);
  return (
    <>
      <InteriorHeading
        title={language === "ru" ? fleetSections[section].title : sectionNames[current]}
        subtitle={text[language].descriptions[current]}
        home={{ href: localized(language), label: nav.home }}
      />
      <section className="interior-content fleet-content" aria-label={nav.fleet}>
        <nav className="fleet-nav" aria-label={nav.fleet}>
          {sections.map((item, index) => (
            <Link key={item} href={localized(language, `/${item}`)} aria-current={item === section ? "page" : undefined}>
              {sectionNames[index]}
            </Link>
          ))}
        </nav>
        <form className="fleet-filters" action={path} method="get">
          <label>{labels[0]}
            <select name="capacity" defaultValue={capacity || ""}>
              <option value="">{labels[3]}</option>
              {capacities.map(value => <option key={value} value={value}>{labels[4]} {value} {labels[5]}</option>)}
            </select>
          </label>
          {ships && <>
            <label>{labels[1]}
              <select name="deck" defaultValue={deck || ""}>
                <option value="">{labels[3]}</option>
                <option value="1">{labels[6]}</option>
                <option value="2">{labels[7]}</option>
              </select>
            </label>
            <label className="fleet-premium"><input name="premium" type="checkbox" value="1" defaultChecked={premium} />{labels[8]}</label>
          </>}
          <label>{labels[2]}
            <select name="sort" defaultValue={sort}>
              <option value="">{labels[9]}</option>
              <option value="price-asc">{labels[10]}</option>
              <option value="price-desc">{labels[11]}</option>
            </select>
          </label>
          <button className="btn btn--solid btn--sm" type="submit">{labels[12]}</button>
          {(capacity || deck || premium || sort) && <Link href={path} className="plain-link">{labels[13]}</Link>}
        </form>
        <div className="fleet-summary">
          <p>{labels[14]} · {items.length}</p>
          {ships && <small>{labels[17]}</small>}
        </div>
        {items.length ? (
          <ul className="cards cards--3 fleet-grid">
            {items.map(vessel => <li key={vessel.slug}><BoatCard vessel={vessel} language={language} heading="h2" /></li>)}
          </ul>
        ) : (
          <div className="fleet-empty"><h2>{labels[15]}</h2><p>{labels[16]}</p><Link href={path} className="link-arrow">{labels[13]} →</Link></div>
        )}
      </section>
    </>
  );
}

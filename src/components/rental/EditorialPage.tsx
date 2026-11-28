import Link from "next/link";
import { editorial, type EditorialSection } from "@/data/editorial";
import { interfaceText, localized, type Language } from "@/data/locale";
import { EnquireButton } from "../EnquireButton";
import { Photo } from "../Photo";
import { InteriorHeading } from "./InteriorHeading";

const copy = {
  ru: { details: "Подробнее", menu: "Скачать пример меню", choose: "Подобрать судно", format: "Обсудить формат" },
  en: { details: "View details", menu: "Download sample menu (RU)", choose: "Explore the fleet", format: "Discuss the event" },
  zh: { details: "查看详情", menu: "下载菜单样本（俄语）", choose: "选择船只", format: "咨询活动安排" },
};

export function EditorialPage({ section, language, slug }: { section: EditorialSection; language: Language; slug?: string }) {
  const collection = editorial[section];
  const labels = copy[language];
  const nav = interfaceText[language];
  const selected = collection.items.find(item => item.slug === slug);
  const path = localized(language, `/${section}`);
  const fleet = localized(language, section === "catering" || section === "events" ? "/arenda-teplohoda" : "/arenda-yachty");
  return (
    <>
      <InteriorHeading
        title={selected?.name[language] ?? collection.title[language]}
        subtitle={selected ? undefined : collection.description[language]}
        parent={selected ? { href: path, label: collection.title[language] } : undefined}
        home={{ href: localized(language), label: nav.home }}
      />
      <div className="interior-content editorial">
        {selected ? (
          <article className="editorial-feature">
            <Photo src={selected.image} label={selected.name[language]} sizes="(max-width: 860px) 94vw, 60vw" priority />
            <div className="editorial-feature__body">
              {selected.duration && <p className="kicker">{selected.duration[language]}</p>}
              <p>{selected.description[language]}</p>
              <div className="editorial-actions">
                {selected.menu && <a className="plain-link" href={selected.menu} download>{labels.menu} ↓</a>}
                <EnquireButton note={selected.name[language]}>{labels.format}</EnquireButton>
                <Link href={fleet} className="link-arrow">{labels.choose} →</Link>
              </div>
            </div>
          </article>
        ) : (
          <ul className="editorial-list">
            {collection.items.map(item => (
              <li key={item.slug}>
                <article className="editorial-feature">
                  <Link href={`${path}/${item.slug}`} aria-label={item.name[language]}>
                    <Photo src={item.image} sizes="(max-width: 860px) 94vw, 58vw" />
                  </Link>
                  <div className="editorial-feature__body">
                    {item.duration && <p className="kicker">{item.duration[language]}</p>}
                    <h2>{item.name[language]}</h2>
                    <p>{item.description[language]}</p>
                    <div className="editorial-actions">
                      <Link href={`${path}/${item.slug}`} className="link-arrow">{labels.details} →</Link>
                      {item.menu && <a className="plain-link" href={item.menu} download>{labels.menu} ↓</a>}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

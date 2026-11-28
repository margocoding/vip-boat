import Link from "next/link";
import { categories, extraNav, site, topNav } from "@/data/site";
import { documents } from "@/data/editorial";
import { interfaceText, languages, localized, type Language } from "@/data/locale";
import { EnquireForm } from "./EnquireForm";

export function Footer({ language }: { language: Language }) {
  const copy = interfaceText[language];
  const catalogue = language === "ru" ? categories : [
    { label: copy.yachts, href: localized(language, "/arenda-yachty") },
    { label: copy.boats, href: localized(language, "/arenda-catera") },
    { label: copy.ships, href: localized(language, "/arenda-teplohoda") },
  ];
  const pages = language === "ru" ? [...topNav, ...extraNav] : [
    { label: copy.routes, href: localized(language, "/routes") },
    { label: copy.catering, href: localized(language, "/catering") },
    { label: copy.contact, href: localized(language, "/contacts") },
  ];
  return (
    <footer className="footer" id="contacts">
      <div className="footer__top">
        <div className="footer__form">
          <h2 className="h2">{copy.enquiry}</h2>
          <EnquireForm language={language} />
        </div>

        <div className="footer__contacts">
          <h3>{copy.contact}</h3>
          <a href={site.phoneHref} className="footer__phone">
            {site.phone}
          </a>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          <ul className="footer__socials">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__dir">
        <div>
          <h3>{copy.fleet}</h3>
          {catalogue.map((c) => (
            <Link key={c.href} href={c.href}>
              {c.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>{copy.menu}</h3>
          {pages.map((c) => (
            <Link key={c.href} href={c.href}>
              {c.label}
            </Link>
          ))}
        </div>
        {language === "ru" && <div>
          <h3>Документы</h3>
          {Object.entries(documents).filter(([slug]) => slug !== "ai-content-agreement").map(([slug, title]) => (
            <Link key={slug} href={`/${slug}`}>{title}</Link>
          ))}
        </div>}
      </div>

      <div className="footer__legal">
        <p>© {site.name}, {new Date().getFullYear()}.</p>
        {language === "ru" && <p>{site.legal.owner} (ИНН {site.legal.inn}, ОГРНИП {site.legal.ogrnip})</p>}
        {language === "ru" && <p><Link href="/ai-content-agreement">Информация об использовании ИИ</Link></p>}
        <nav className="locale-switch" aria-label="Language">
          {languages.map(item => <a key={item} href={localized(item)} hrefLang={item} lang={item} aria-current={item === language ? "true" : undefined}>{item.toUpperCase()}</a>)}
        </nav>
      </div>
    </footer>
  );
}

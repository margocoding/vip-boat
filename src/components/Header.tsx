"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, extraNav, site, topNav } from "@/data/site";
import { interfaceText, languages, localized, type Language } from "@/data/locale";
import { useEnquire } from "./EnquireProvider";

export function Header({ language }: { language: Language }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { open } = useEnquire();
  const copy = interfaceText[language];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    document.body.style.overflow = menu ? "hidden" : "";
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenu(false); };
    document.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", escape);
    };
  }, [menu]);

  const mainThree = categories.slice(0, 3).map((item, index) => ({
    href: localized(language, item.href),
    label: [copy.yachts, copy.boats, copy.ships][index],
  }));
  const secondary = language === "ru" ? topNav : [
    { label: copy.routes, href: localized(language, "/routes") },
    { label: copy.catering, href: localized(language, "/catering") },
  ];

  return (
    <>
      <header className={`header ${scrolled || menu ? "header--solid" : ""}`}>
        <div className="header__inner">
          <button
            className={`burger ${menu ? "burger--open" : ""}`}
            onClick={() => setMenu((v) => !v)}
            aria-label={copy.menu}
            aria-expanded={menu}
            aria-controls="site-menu"
          >
            <span />
            <span />
          </button>

          <nav className="header__nav" aria-label={copy.fleet}>
            {mainThree.map((i) => (
              <Link key={i.href} href={i.href}>
                {i.label}
              </Link>
            ))}
          </nav>

          <Link href={localized(language)} className="logo" onClick={() => setMenu(false)}>
            {site.name}
          </Link>

          <div className="header__right">
            {secondary.map((i) => (
              <Link key={i.href} href={i.href} className="header__top">
                {i.label}
              </Link>
            ))}
            <a className="header__phone" href={site.phoneHref}>
              {site.phone}
            </a>
            <button className="btn btn--ghost btn--sm header__enquire" aria-label={copy.callback} onClick={() => { setMenu(false); open(); }}>
              <span className="header__enquire-full">{copy.callback}</span>
              <span className="header__enquire-short">{language === "ru" ? "Звонок" : language === "en" ? "Call" : "回电"}</span>
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" className={`menu ${menu ? "menu--open" : ""}`} inert={!menu} aria-hidden={!menu}>
        <div className="menu__inner">
          <div className="menu__col">
            <h4>{copy.fleet}</h4>
            {mainThree.map((c) => <Link key={c.href} href={c.href} className="menu__big" onClick={() => setMenu(false)}>{c.label}</Link>)}
          </div>
          <div className="menu__col">
            <h4>{copy.menu}</h4>
            {(language === "ru" ? [...categories.slice(3), ...topNav, ...extraNav] : secondary).map((c) => (
              <Link key={c.href} href={c.href} onClick={() => setMenu(false)}>
                {c.label}
              </Link>
            ))}
          </div>
          <div className="menu__col">
            <h4>{copy.contact}</h4>
            <a href={site.phoneHref}>{site.phone}</a>
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
            <div className="locale-switch">
              {languages.map((item) => <a key={item} href={localized(item)} hrefLang={item} lang={item} aria-current={item === language ? "true" : undefined}>{item.toUpperCase()}</a>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

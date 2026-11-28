"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories, extraNav, site, topNav } from "@/data/site";
import { interfaceText, localized, type Language } from "@/data/locale";
import { LanguageSwitch } from "./LanguageSwitch";
import { useEnquire } from "./EnquireProvider";

export function Header({ language }: { language: Language }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuDialog = useRef<HTMLDialogElement>(null);
  const { open } = useEnquire();
  const copy = interfaceText[language];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openMenu() {
    menuDialog.current?.showModal();
    setMenu(true);
  }

  function closeMenu() {
    menuDialog.current?.close();
  }

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
            type="button"
            onClick={openMenu}
            aria-label={copy.menu}
            aria-expanded={menu}
            aria-controls="site-menu"
          >
            <span />
            <span />
          </button>

          <nav className="header__nav" aria-label={copy.fleet}>
            {mainThree.map((i) => (
              <Link key={i.href} href={i.href} prefetch={false}>
                {i.label}
              </Link>
            ))}
          </nav>

          <Link href={localized(language)} className="logo" prefetch={false}>
            {site.name}
          </Link>

          <div className="header__right">
            {secondary.map((i) => (
              <Link key={i.href} href={i.href} className="header__top" prefetch={false}>
                {i.label}
              </Link>
            ))}
            <a className="header__phone" href={site.phoneHref}>
              {site.phone}
            </a>
            <button className="btn btn--ghost btn--sm header__enquire" type="button" aria-label={copy.callback} onClick={() => open()}>
              <span className="header__enquire-full">{copy.callback}</span>
              <span className="header__enquire-short">{language === "ru" ? "Звонок" : language === "en" ? "Call" : "回电"}</span>
            </button>
          </div>
        </div>
      </header>

      <dialog id="site-menu" className="menu" ref={menuDialog} aria-labelledby="site-menu-title" onClose={() => setMenu(false)}>
        <h2 className="visually-hidden" id="site-menu-title">{copy.menu}</h2>
        <button className="menu__close btn btn--ghost" type="button" onClick={closeMenu}>{copy.close}</button>
        <div className="menu__inner">
          <div className="menu__col">
            <h3>{copy.fleet}</h3>
            {mainThree.map((c) => <Link key={c.href} href={c.href} className="menu__big" onClick={closeMenu} prefetch={false}>{c.label}</Link>)}
          </div>
          <div className="menu__col">
            <h3>{copy.menu}</h3>
            {(language === "ru" ? [...categories.slice(3), ...topNav, ...extraNav] : secondary).map((c) => (
              <Link key={c.href} href={c.href} onClick={closeMenu} prefetch={false}>
                {c.label}
              </Link>
            ))}
          </div>
          <div className="menu__col">
            <h3>{copy.contact}</h3>
            <a href={site.phoneHref}>{site.phone}</a>
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
            <LanguageSwitch language={language} />
          </div>
        </div>
      </dialog>
    </>
  );
}

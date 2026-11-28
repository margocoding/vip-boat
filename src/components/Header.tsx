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
  const contactDialog = useRef<HTMLDialogElement>(null);
  const contactTrigger = useRef<HTMLButtonElement>(null);
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
            <button className="btn btn--ghost btn--sm header__contact" ref={contactTrigger} type="button"
              aria-haspopup="dialog" aria-controls="site-contact" onClick={event => {
                event.currentTarget.focus({ preventScroll: true });
                contactDialog.current?.showModal();
              }}>
              {copy.getInTouch}
            </button>
          </div>
        </div>
      </header>

      <dialog id="site-contact" className="contact-dialog" ref={contactDialog} aria-labelledby="site-contact-title">
        <button className="modal__close" type="button" onClick={() => contactDialog.current?.close()} aria-label={copy.close}>×</button>
        <h2 className="modal__title" id="site-contact-title">{copy.contact}</h2>
        <a className="contact-dialog__phone" href={site.phoneHref}>{site.phone}</a>
        <div className="contact-dialog__messengers">
          {site.socials.filter(({ label }) => label === "Telegram" || label === "Max").map(({ label, href }) => (
            <a className="btn btn--ghost" key={href} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          ))}
        </div>
        <button className="link-arrow contact-dialog__callback" type="button" onClick={() => {
          contactDialog.current?.close();
          open(undefined, contactTrigger.current);
        }}>{copy.callback}</button>
      </dialog>

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

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, extraNav, site, topNav } from "@/data/site";
import { useEnquire } from "./EnquireProvider";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { open } = useEnquire();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const mainThree = categories.slice(0, 3);

  return (
    <>
      <header className={`header ${scrolled || menu ? "header--solid" : ""}`}>
        <div className="header__inner">
          <button
            className={`burger ${menu ? "burger--open" : ""}`}
            onClick={() => setMenu((v) => !v)}
            aria-label="Меню"
            aria-expanded={menu}
          >
            <span />
            <span />
          </button>

          <nav className="header__nav" aria-label="Основная навигация">
            {mainThree.map((i) => (
              <Link key={i.href} href={i.href}>
                {i.label.replace(" в СПб", "")}
              </Link>
            ))}
          </nav>

          <Link href="/" className="logo" onClick={() => setMenu(false)}>
            {site.name}
          </Link>

          <div className="header__right">
            {topNav.map((i) => (
              <Link key={i.href} href={i.href} className="header__top">
                {i.label}
              </Link>
            ))}
            <a className="header__phone" href={site.phoneHref}>
              {site.phone}
            </a>
            <button className="btn btn--ghost btn--sm" onClick={open}>
              Заказать звонок
            </button>
          </div>
        </div>
      </header>

      <div className={`menu ${menu ? "menu--open" : ""}`} aria-hidden={!menu}>
        <div className="menu__inner">
          <div className="menu__col">
            <h4>Категории</h4>
            {categories.map((c) => (
              <Link key={c.href} href={c.href} className="menu__big" onClick={() => setMenu(false)}>
                {c.label}
                {c.count ? <em>{c.count}</em> : null}
              </Link>
            ))}
          </div>
          <div className="menu__col">
            <h4>Популярный выбор</h4>
            {[...topNav, ...extraNav].map((c) => (
              <Link key={c.href} href={c.href} onClick={() => setMenu(false)}>
                {c.label}
              </Link>
            ))}
          </div>
          <div className="menu__col">
            <h4>Связаться</h4>
            <a href={site.phoneHref}>{site.phone}</a>
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

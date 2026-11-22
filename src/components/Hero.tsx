"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useEnquire } from "./EnquireProvider";

export function Hero() {
  const { open } = useEnquire();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (site.heroSlides.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % site.heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero">
      <div className="hero__media">
        {site.heroSlides.map((src, idx) => (
          <div
            key={src}
            className={`hero__slide ${idx === i ? "is-on" : ""}`}
            style={{ backgroundImage: `url("${src}")` }}
          />
        ))}
        <div className="hero__shade" />
      </div>

      <div className="hero__content">
        <p className="kicker">{site.city}</p>
        <h1 className="hero__title">
          <span className="hero__title-small">{site.heroTitle[0]}</span>
          <span>{site.heroTitle[1]}</span>
        </h1>
        <p className="hero__sub">{site.heroText}</p>
        <div className="hero__cta">
          <button className="btn btn--solid" onClick={open}>
            Заказать звонок
          </button>
          <a className="btn btn--ghost" href={site.phoneHref}>
            {site.phone}
          </a>
        </div>
      </div>

      <a className="hero__scroll" href="#intro" aria-label="Прокрутить вниз">
        <span />
      </a>
    </section>
  );
}

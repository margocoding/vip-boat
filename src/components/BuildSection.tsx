"use client";

import Link from "next/link";
import { shipyards } from "@/data/site";
import { Reveal } from "./Reveal";
import { useEnquire } from "./EnquireProvider";

export function BuildSection() {
  const { open } = useEnquire();
  return (
    <section id="build" className="build">
      <Reveal>
        <h2 className="build__title">
          построить
          <br />
          яхту
        </h2>
      </Reveal>
      <Reveal delay={120} className="build__body">
        <p>
          При покупке яхты и особенно при строительстве новой профессиональный брокер незаменим. Глубокое знание
          рынка и опыт работы с ведущими европейскими верфями помогают воплотить яхту вашей мечты.
        </p>
        <ul className="chips">
          {shipyards.map((s) => (
            <li key={s.href}>
              <Link href={s.href}>{s.label}</Link>
            </li>
          ))}
        </ul>
        <div className="build__cta">
          <Link className="btn btn--ghost" href="/builders">
            Все верфи
          </Link>
          <button className="btn btn--solid" onClick={open}>
            Открыть новые горизонты
          </button>
        </div>
      </Reveal>
    </section>
  );
}

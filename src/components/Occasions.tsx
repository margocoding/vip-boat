"use client";

import Link from "next/link";
import { extraNav, occasions } from "@/data/site";
import { Reveal } from "./Reveal";
import { useEnquire } from "./EnquireProvider";

/** «Для любого повода» + быстрые ссылки на события, круизы и кейтеринг */
export function Occasions() {
  const { open } = useEnquire();
  return (
    <section id="events" className="build">
      <Reveal>
        <h2 className="build__title">
          для любого
          <br />
          повода
        </h2>
      </Reveal>
      <Reveal delay={120} className="build__body">
        <p>
          Прогулка по рекам и каналам, романтический вечер вдвоём, день рождения на воде, корпоратив, свадьба,
          рыбалка в заливе или выход на закате — под каждый случай найдётся подходящее судно.
        </p>
        <ul className="chips">
          {occasions.map((o) => (
            <li key={o}>
              <a href="#catalog">{o}</a>
            </li>
          ))}
        </ul>
        <ul className="chips chips--links">
          <li>
            <Link href="/events">Мероприятия</Link>
          </li>
          <li>
            <Link href="/cruises">Круизы</Link>
          </li>
          <li>
            <Link href="/catering">Кейтеринг</Link>
          </li>
          {extraNav.slice(0, 1).map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="build__cta">
          <button className="btn btn--solid" onClick={open}>
            Подобрать судно
          </button>
        </div>
      </Reveal>
    </section>
  );
}

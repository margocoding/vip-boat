"use client";

import Link from "next/link";
import { useState } from "react";
import { featured } from "@/data/site";
import { Photo } from "./Photo";

export function FeaturedBuilds() {
  const [active, setActive] = useState(0);
  const boat = featured[active];

  return (
    <section className="featured">
      <div className="featured__head">
        <p className="kicker">Подборка VIP Boat</p>
        <h2 className="h2">Избранные новинки</h2>
      </div>

      <div className="featured__body">
        <ul className="featured__tabs" role="tablist" aria-label="Размер яхты">
          {featured.map((b, i) => (
            <li key={b.href}>
              <button
                role="tab"
                aria-selected={i === active}
                className={i === active ? "is-active" : ""}
                onClick={() => setActive(i)}
              >
                <b>{b.size}</b>
                <span>метров</span>
              </button>
            </li>
          ))}
        </ul>

        <article className="featured__card" key={boat.href}>
          <Link href={boat.href} className="featured__photo">
            <Photo src={boat.image} seed={active} />
          </Link>
          <div className="featured__info">
            <h3>{boat.name}</h3>
            <p className="featured__meta">
              {boat.meta} / {boat.price}
            </p>
            <p className="featured__desc">{boat.description}</p>
            <Link className="link-arrow" href={boat.href}>
              Подробнее о {boat.name} →
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

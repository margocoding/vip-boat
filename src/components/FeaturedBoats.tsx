"use client";

import Link from "next/link";
import { useState } from "react";
import { boats } from "@/data/boats";
import { rub, vimg } from "@/lib/img";
import { Photo } from "./Photo";

/** «Популярный выбор»: вкладки по длине яхты, большая карточка справа */
export function FeaturedBoats() {
  const list = [...boats].sort((a, b) => parseFloat(a.length.replace(",", ".")) - parseFloat(b.length.replace(",", ".")));
  const [active, setActive] = useState(list.length - 1);
  const boat = list[active];

  return (
    <section className="featured">
      <div className="featured__head">
        <p className="kicker">Популярный выбор</p>
        <h2 className="h2">Яхты по размеру</h2>
      </div>

      <div className="featured__body">
        <ul className="featured__tabs" role="tablist" aria-label="Длина яхты">
          {list.map((b, i) => (
            <li key={b.slug}>
              <button
                role="tab"
                aria-selected={i === active}
                className={i === active ? "is-active" : ""}
                onClick={() => setActive(i)}
              >
                <b>{b.length}</b>
                <span>м</span>
              </button>
            </li>
          ))}
        </ul>

        <article className="featured__card" key={boat.slug}>
          <Link href={boat.href} className="featured__photo">
            <Photo src={vimg(boat.images[0])} seed={active} label={boat.name} />
          </Link>
          <div className="featured__info">
            <h3>{boat.name}</h3>
            <p className="featured__meta">
              {boat.length} м · до {boat.capacity} человек
            </p>
            <p className="featured__price">
              {boat.priceOld && <s>{rub(boat.priceOld)}</s>}
              от {rub(boat.price)} / час
            </p>
            <ul className="tags">
              {boat.amenities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <Link className="link-arrow" href={boat.href}>
              Подробнее о яхте →
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

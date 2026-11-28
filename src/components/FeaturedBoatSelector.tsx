"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

type FeaturedBoat = {
  slug: string;
  name: string;
  href: string;
  length: string;
  capacity: number;
  price: string;
  priceOld: string | null;
  amenities: string[];
  photo: ReactNode;
};

export function FeaturedBoatSelector({ options }: { options: FeaturedBoat[] }) {
  const [active, setActive] = useState(0);
  const boat = options[active];
  if (!boat) return null;

  return (
    <div className="featured__body">
      <ul className="featured__tabs" aria-label="Длина яхты">
        {options.map(({ slug, name, length }, index) => (
          <li key={slug}>
            <button
              type="button"
              aria-label={`${name} · ${length} м`}
              aria-pressed={index === active}
              aria-controls="featured-boat"
              className={index === active ? "is-active" : ""}
              onClick={() => setActive(index)}
            >
              <b>{length}</b>
              <span>м</span>
            </button>
          </li>
        ))}
      </ul>

      <article className="featured__card" id="featured-boat" key={boat.slug}>
        <Link href={boat.href} className="featured__photo" prefetch={false}>{boat.photo}</Link>
        <div className="featured__info">
          <h3>{boat.name}</h3>
          <p className="featured__meta">{boat.length} м · до {boat.capacity} человек</p>
          <p className="featured__price">
            {boat.priceOld && <s>{boat.priceOld}</s>}от {boat.price} / час
          </p>
          <ul className="tags">
            {boat.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}
          </ul>
          <Link className="link-arrow" href={boat.href} prefetch={false}>Подробнее о яхте →</Link>
        </div>
      </article>
    </div>
  );
}

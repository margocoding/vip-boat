import Link from "next/link";
import type { Listing } from "@/data/site";
import { Reveal } from "./Reveal";
import { Photo } from "./Photo";

type Props = {
  id: string;
  kicker: string;
  title: [string, string];
  count: string;
  countLabel: string;
  text: string;
  items: Listing[];
  allHref: string;
  allLabel: string;
  dark?: boolean;
};

export function ListingSection({
  id,
  kicker,
  title,
  count,
  countLabel,
  text,
  items,
  allHref,
  allLabel,
  dark,
}: Props) {
  return (
    <section id={id} className={`listing ${dark ? "listing--dark" : ""}`}>
      <div className="listing__head">
        <Reveal>
          <p className="kicker">{kicker}</p>
          <h2 className="listing__title">
            {title[0]}
            <br />
            {title[1]}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="listing__text">{text}</p>
          <div className="listing__count">
            <b>{count}</b>
            <span>{countLabel}</span>
          </div>
          <Link className="btn btn--ghost" href={allHref}>
            {allLabel}
          </Link>
        </Reveal>
      </div>

      <ul className="cards">
        {items.map((it, i) => (
          <li key={it.href}>
            <Link href={it.href} className="card">
              <Photo src={it.image} seed={i} className="card__photo" />
              <div className="card__body">
                <h3>{it.name}</h3>
                <p>{it.meta}</p>
                <p className="card__price">{it.price}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

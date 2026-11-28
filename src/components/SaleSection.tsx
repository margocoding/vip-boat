import Link from "next/link";
import { sale, saleListings } from "@/data/site";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { EnquireButton } from "./EnquireButton";

/** «Продажа яхт» — раздел-аналог BUY у nauyachts.com */
export function SaleSection() {
  return (
    <section id="sale" className="sale">
      <div className="sale__grid">
        <Reveal className="sale__media">
          <Photo src={sale.image} sizes="(max-width: 860px) 90vw, 45vw" label="Яхта на воде" />
        </Reveal>
        <Reveal delay={120} className="sale__body">
          <p className="kicker">{sale.kicker}</p>
          <h2 className="sale__title">
            {sale.title[0]}
            <br />
            {sale.title[1]}
          </h2>
          <p className="sale__text">{sale.text}</p>
          <ol className="sale__steps">
            {sale.steps.map((s, i) => (
              <li key={s.title}>
                <span>0{i + 1}</span>
                <div>
                  <b>{s.title}</b>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="sale__cta">
            <EnquireButton>Получить подборку</EnquireButton>
          </div>
        </Reveal>
      </div>

      {saleListings.length > 0 && (
        <ul className="cards cards--3 sale__cards">
          {saleListings.map((it) => (
            <li key={it.href}>
              <Link href={it.href} className="card">
                <div className="card__media">
                  <Photo src={it.image} className="card__photo" label={it.name} />
                </div>
                <div className="card__body">
                  <h3>{it.name}</h3>
                  <p>{it.meta}</p>
                  <p className="card__price">{it.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

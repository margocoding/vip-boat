import Link from "next/link";
import { fleet } from "@/data/rental";
import { BoatCard } from "./rental/BoatCard";
import { Reveal } from "./Reveal";

export function BoatsCatalog() {
  const yachts = fleet["arenda-yachty"];
  return (
    <section className="listing listing--dark" id="yachts">
      <div className="listing__head">
        <Reveal>
          <p className="kicker">Яхты в аренду</p>
          <h2 className="listing__title">
            арендовать
            <br />
            яхту
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="listing__text">
            В стоимость аренды входит топливо. На яхтах с вами работают капитан и команда. Остаётся собраться с
            гостями, подняться на борт и провести время так, как вы запланировали.
          </p>
          <div className="listing__count">
            <b>{yachts.length}</b>
            <span>Яхты в каталоге</span>
          </div>
          <Link className="btn btn--ghost" href="/arenda-yachty">
            Все яхты
          </Link>
        </Reveal>
      </div>

      <ul className="cards cards--3">
        {yachts.map((vessel) => <li key={vessel.slug}><BoatCard vessel={vessel} /></li>)}
      </ul>
    </section>
  );
}

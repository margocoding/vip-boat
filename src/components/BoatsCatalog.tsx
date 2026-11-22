import Link from "next/link";
import { boats } from "@/data/boats";
import { rub, vimg } from "@/lib/img";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

export function BoatsCatalog() {
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
            <b>28</b>
            <span>яхт в каталоге</span>
          </div>
          <Link className="btn btn--ghost" href="/arenda-yachty">
            Все яхты
          </Link>
        </Reveal>
      </div>

      <ul className="cards cards--3">
        {boats.map((b, i) => (
          <li key={b.slug}>
            <Link href={b.href} className="card">
              <div className="card__media">
                <Photo src={vimg(b.images[0])} seed={i} className="card__photo" label={b.name} />
                {b.priceOld && <span className="badge">скидка</span>}
              </div>
              <div className="card__body">
                <h3>{b.name}</h3>
                <p>
                  {b.length} м · до {b.capacity} чел.
                </p>
                <p className="card__price">
                  {b.priceOld && <s>{rub(b.priceOld)}</s>}от {rub(b.price)} / час
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

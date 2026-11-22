import { reviews } from "@/data/site";
import { Reveal } from "./Reveal";

export function Reviews() {
  return (
    <section className="reviews">
      <Reveal>
        <p className="kicker">Отзывы о нас</p>
        <h2 className="h2">Говорят гости</h2>
      </Reveal>
      <ul className="reviews__grid">
        {reviews.map((r, i) => (
          <li key={r.name}>
            <Reveal delay={i * 120} className="review">
              <div className="review__stars" aria-label="5 из 5">
                ★★★★★
              </div>
              <p>{r.text}</p>
              <b>{r.name}</b>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

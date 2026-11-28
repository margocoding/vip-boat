import { reasons } from "@/data/site";
import { Reveal } from "./Reveal";
import { Photo } from "./Photo";

export function Reasons() {
  return (
    <section className="reasons">
      {reasons.map((r, i) => (
        <article key={r.title.join("")} className={`reason ${i % 2 ? "reason--flip" : ""}`}>
          <Reveal className="reason__media">
            <Photo src={r.image} sizes="(max-width: 860px) 100vw, 50vw" />
          </Reveal>
          <Reveal className="reason__body" delay={120}>
            <p className="kicker">{r.kicker}</p>
            <h3 className="reason__title">
              {r.title[0]}
              <br />
              {r.title[1]}
            </h3>
            <p className="reason__text">{r.text}</p>
          </Reveal>
        </article>
      ))}
    </section>
  );
}

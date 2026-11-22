import { manifesto, stats } from "@/data/site";
import { Reveal } from "./Reveal";

export function Manifesto() {
  return (
    <section className="manifesto" id="intro">
      <Reveal>
        <h2 className="manifesto__title">
          {manifesto.title[0]}
          <br />
          {manifesto.title[1]}
        </h2>
      </Reveal>
      <div className="manifesto__row">
        <Reveal delay={100}>
          <p className="manifesto__text">{manifesto.text}</p>
        </Reveal>
        <ul className="stats">
          {stats.map((s, i) => (
            <li key={s.label}>
              <Reveal delay={150 + i * 100}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

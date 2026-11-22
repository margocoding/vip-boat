import Link from "next/link";
import { vessels } from "@/data/site";
import { Reveal } from "./Reveal";

/** «Три типа судов — любой повод на воде» */
export function Vessels() {
  return (
    <section className="vessels">
      <Reveal>
        <p className="kicker">Три типа судов</p>
        <h2 className="h2">Любой повод на воде</h2>
      </Reveal>
      <ul className="vessels__grid">
        {vessels.map((v, i) => (
          <li key={v.title}>
            <Reveal delay={i * 100} className="vessel">
              <span className="vessel__n">0{i + 1}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
              <Link className="link-arrow" href={v.href}>
                Смотреть каталог →
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

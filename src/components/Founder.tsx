import { founder } from "@/data/site";
import { Reveal } from "./Reveal";
import { Photo } from "./Photo";

export function Founder() {
  return (
    <section className="founder">
      <Reveal className="founder__media">
        <Photo src={founder.image} seed={2} />
      </Reveal>
      <Reveal className="founder__body" delay={120}>
        <p className="kicker">
          {founder.name} · {founder.role}
        </p>
        <h2 className="founder__motto">{founder.motto}</h2>
        <p>{founder.text}</p>
      </Reveal>
    </section>
  );
}

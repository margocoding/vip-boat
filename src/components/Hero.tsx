import { site } from "@/data/site";
import { Photo } from "./Photo";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__media">
        <Photo src="hero" sizes="100vw" priority />
        <div className="hero__shade" />
      </div>
      <div className="hero__content">
        <p className="kicker">{site.city}</p>
        <h1 className="hero__title">
          <span className="hero__title-small">{site.heroTitle[0]}</span>
          <span>{site.heroTitle[1]}</span>
        </h1>
        <p className="hero__sub">{site.heroText}</p>
        <div className="hero__cta">
          <a className="btn btn--solid" href="#catalog">Выбрать судно</a>
        </div>
      </div>
    </section>
  );
}

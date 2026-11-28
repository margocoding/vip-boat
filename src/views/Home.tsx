import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CategoryStrip } from "@/components/CategoryStrip";
import { Manifesto } from "@/components/Manifesto";
import { Reasons } from "@/components/Reasons";
import { FeaturedBoats } from "@/components/FeaturedBoats";
import { Vessels } from "@/components/Vessels";
import { CategoryTiles } from "@/components/CategoryTiles";
import { BoatsCatalog } from "@/components/BoatsCatalog";
import { Occasions } from "@/components/Occasions";
import { Reviews } from "@/components/Reviews";
import { Photo } from "@/components/Photo";
import { BoatCard } from "@/components/rental/BoatCard";
import { fleet } from "@/data/rental";
import { interfaceText, localized, type Language } from "@/data/locale";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

const content = {
  ru: { title: site.fullName, description: site.description },
  en: { title: "Yacht and boat hire in St Petersburg | Vip Boat", description: "Choose a yacht, motorboat or event boat for a private charter in St Petersburg." },
  zh: { title: "圣彼得堡游艇与船只租赁 | Vip Boat", description: "在圣彼得堡租赁游艇、快艇或宴会船，开启专属水上之旅。" },
};

export function homeMetadata(language: Language) {
  return pageMetadata(language, "/", content[language].title, content[language].description);
}

export default function Home({ language }: { language: Language }) {
  if (language === "en" || language === "zh") {
    const copy = interfaceText[language];
    const fleets = [
      { section: "/arenda-yachty", title: copy.yachts, vessel: fleet["arenda-yachty"][5] },
      { section: "/arenda-catera", title: copy.boats, vessel: fleet["arenda-catera"][0] },
      { section: "/arenda-teplohoda", title: copy.ships, vessel: fleet["arenda-teplohoda"][1] },
    ];
    return (
      <>
        <section className="hero">
          <div className="hero__media"><Photo src="hero" sizes="100vw" priority /><div className="hero__shade" /></div>
          <div className="hero__content">
            <p className="kicker">{language === "en" ? "St Petersburg" : "圣彼得堡"}</p>
            <h1 className="hero__title">{language === "en" ? "Yacht and boat hire" : "游艇与船只租赁"}</h1>
            <p className="hero__sub">{content[language].description}</p>
            <a href="#fleet" className="btn btn--solid">{copy.fleet} ↓</a>
          </div>
        </section>
        <section className="interior-content" id="fleet">
          <h2 className="h2">{copy.fleet}</h2>
          <div className="cards cards--3 localized-home">
            {fleets.map(({ section, vessel, title }) => (
              <div key={section}><Link className="link-arrow" href={localized(language, section)}>{title} →</Link><BoatCard vessel={vessel} language={language} /></div>
            ))}
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <Hero />
      <CategoryStrip />
      <Manifesto />
      <Reasons />
      <FeaturedBoats />
      <Vessels />
      <CategoryTiles />
      <BoatsCatalog />
      <Occasions />
      <Reviews />
    </>
  );
}

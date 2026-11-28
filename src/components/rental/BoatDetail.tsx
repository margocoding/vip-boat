import { fleet, fleetSectionCopy, vesselDescription, type RentalVessel } from "@/data/rental";
import { interfaceText, localized, type Language } from "@/data/locale";
import { rub } from "@/lib/img";
import { Photo } from "../Photo";
import { BoatCard } from "./BoatCard";
import { InteriorHeading } from "./InteriorHeading";
import { RentalEstimate } from "./RentalEstimate";
import { VirtualTour } from "./VirtualTour";

export function BoatDetail({ vessel, language }: { vessel: RentalVessel; language: Language }) {
  const { name, section, images, length, capacity, price, amenities, configuration } = vessel;
  const nav = interfaceText[language];
  const sectionName = fleetSectionCopy(section, language).name;
  const labels = {
    ru: { gallery: "Фото судна", exterior: "Общий вид", interior: "На борту", length: "Длина", cost: "Аренда от", unit: "час", capacity: (count: number) => `До ${count} гостей`, banquet: (count: number) => `Банкет до ${count}`, about: "На борту", estimate: "Рассчитать аренду", similar: "Другие суда", specs: ["Фуршет", "Столы", "Стулья"] },
    en: { gallery: "Vessel photos", exterior: "Exterior", interior: "On board", length: "Length", cost: "Charter from", unit: "hour", capacity: (count: number) => `Up to ${count} guests`, banquet: (count: number) => `Banquet for up to ${count}`, about: "On board", estimate: "Calculate a quote", similar: "Other vessels", specs: ["Reception", "Tables", "Chairs"] },
    zh: { gallery: "船只照片", exterior: "船体外观", interior: "船上空间", length: "长度", cost: "租价起", unit: "小时", capacity: (count: number) => `最多 ${count} 位客人`, banquet: (count: number) => `宴会最多 ${count} 位`, about: "船上设施", estimate: "计算租船费用", similar: "其他船只", specs: ["酒会", "桌", "椅"] },
  }[language];
  const descriptions = {
    ru: vesselDescription(vessel),
    en: "A private charter with a skipper in St Petersburg.",
    zh: "配备船长的圣彼得堡私人包船。",
  };
  const specs = [configuration?.buffet, configuration?.tables, configuration?.chairs];
  return (
    <>
      <InteriorHeading compact title={name} parent={{ href: localized(language, `/${section}`), label: sectionName }}
        home={{ href: localized(language), label: nav.home }} />
      <div className="interior-content">
        <div className="vessel-overview">
          <fieldset className="vessel-gallery">
            <legend className="visually-hidden">{labels.gallery}</legend>
            <input className="visually-hidden" type="radio" name="vessel-photo" id="view-exterior" defaultChecked />
            <input className="visually-hidden" type="radio" name="vessel-photo" id="view-interior" />
            <div className="vessel-gallery__image">
              <Photo src={images[0]} label={`${name} · ${labels.exterior}`} sizes="(max-width: 860px) 94vw, 62vw" className="vessel-gallery__exterior" priority />
              <Photo src={images[1]} label={`${name} · ${labels.interior}`} sizes="(max-width: 860px) 94vw, 62vw" className="vessel-gallery__interior" />
            </div>
            <div className="vessel-gallery__switch">
              <label htmlFor="view-exterior">{labels.exterior}</label>
              <label htmlFor="view-interior">{labels.interior}</label>
            </div>
          </fieldset>
          <div className="vessel-facts">
            <div className="vessel-offer">
              <p className="vessel-offer__rate">{labels.cost} <strong>{rub(price)}</strong> / {labels.unit}</p>
              <p className="vessel-offer__capacity">{labels.capacity(capacity)}{configuration?.banquet ? ` · ${labels.banquet(configuration.banquet)}` : ""}</p>
              <a className="btn btn--solid" href="#estimate">{labels.estimate} ↓</a>
            </div>
            <p>{descriptions[language]}</p>
            {(length || specs.some(Boolean)) && (
              <dl>
                {length && <div><dt>{labels.length}</dt><dd>{length} {language === "ru" ? "м" : language === "zh" ? "米" : "m"}</dd></div>}
                {specs.map((value, index) =>
                  value ? <div key={labels.specs[index]}><dt>{labels.specs[index]}</dt><dd>{value}</dd></div> : null,
                )}
              </dl>
            )}
            {language === "ru" && amenities.length > 0 && <ul className="tags" aria-label={labels.about}>{amenities.map(item => <li key={item}>{item}</li>)}</ul>}
          </div>
        </div>
        <RentalEstimate vessel={{ name, price, capacity, configuration }} language={language} />
        {vessel.tourUrl && <VirtualTour url={vessel.tourUrl} name={name} language={language} />}
        <section className="related-vessels">
          <h2 className="h2">{labels.similar}</h2>
          <ul className="cards cards--3">
            {fleet[section].filter(item => item.slug !== vessel.slug).slice(0, 3).map(item => <li key={item.slug}><BoatCard vessel={item} language={language} /></li>)}
          </ul>
        </section>
      </div>
    </>
  );
}

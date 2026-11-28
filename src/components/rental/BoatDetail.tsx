import { fleet, fleetSections, vesselDescription, type RentalVessel } from "@/data/rental";
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
  const sectionNames = { "arenda-yachty": nav.yachts, "arenda-catera": nav.boats, "arenda-teplohoda": nav.ships };
  const labels = {
    ru: { gallery: "Фото судна", exterior: "Общий вид", interior: "На борту", capacity: "Вместимость", length: "Длина", cost: "Аренда от", unit: "час", guests: "гостей", about: "На борту", estimate: "Рассчитать аренду", similar: "Другие суда", specs: ["Фуршет", "Банкет", "Столы", "Стулья"] },
    en: { gallery: "Vessel photos", exterior: "Exterior", interior: "On board", capacity: "Capacity", length: "Length", cost: "Charter from", unit: "hour", guests: "guests", about: "On board", estimate: "Calculate a quote", similar: "Other vessels", specs: ["Reception", "Banquet", "Tables", "Chairs"] },
    zh: { gallery: "船只照片", exterior: "船体外观", interior: "船上空间", capacity: "载客量", length: "长度", cost: "租价起", unit: "小时", guests: "位客人", about: "船上设施", estimate: "计算租船费用", similar: "其他船只", specs: ["酒会", "宴会", "桌", "椅"] },
  }[language];
  const descriptions = {
    ru: vesselDescription(vessel),
    en: `A private charter with a skipper in St Petersburg. Accommodates up to ${capacity} guests.`,
    zh: `配备船长的圣彼得堡私人包船，最多可容纳 ${capacity} 位客人。`,
  };
  return (
    <>
      <InteriorHeading title={name} parent={{ href: localized(language, `/${section}`), label: language === "ru" ? fleetSections[section].name : sectionNames[section] }}
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
            <p>{descriptions[language]}</p>
            <dl>
              <div><dt>{labels.capacity}</dt><dd>{capacity} {labels.guests}</dd></div>
              {length && <div><dt>{labels.length}</dt><dd>{length} {language === "ru" ? "м" : language === "zh" ? "米" : "m"}</dd></div>}
              {configuration && [configuration.buffet, configuration.banquet, configuration.tables, configuration.chairs].map((value, index) =>
                value ? <div key={labels.specs[index]}><dt>{labels.specs[index]}</dt><dd>{value}</dd></div> : null,
              )}
              <div><dt>{labels.cost}</dt><dd>{rub(price)} / {labels.unit}</dd></div>
            </dl>
            {language === "ru" && amenities.length > 0 && <ul className="tags" aria-label={labels.about}>{amenities.map(item => <li key={item}>{item}</li>)}</ul>}
            <a className="btn btn--solid" href="#estimate">{labels.estimate} ↓</a>
          </div>
        </div>
        <RentalEstimate vessel={{ name, price, capacity }} language={language} />
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

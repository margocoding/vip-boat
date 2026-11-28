import Link from "next/link";
import type { RentalVessel } from "@/data/rental";
import { rub } from "@/lib/img";
import { Photo } from "../Photo";

export function BoatCard({ vessel, language = "ru", heading: Heading = "h3" }: {
  vessel: RentalVessel;
  language?: "ru" | "en" | "zh";
  heading?: "h2" | "h3";
}) {
  const { capacity, configuration, href, images, length, name, price, priceOld } = vessel;
  const copy = {
    ru: { from: "от", hour: "час", guests: "гостей", buffet: "Фуршет", banquet: "Банкет", tables: "Столы", chairs: "Стулья" },
    en: { from: "from", hour: "hour", guests: "guests", buffet: "Reception", banquet: "Banquet", tables: "Tables", chairs: "Chairs" },
    zh: { from: "起价", hour: "小时", guests: "位客人", buffet: "酒会", banquet: "宴会", tables: "桌", chairs: "椅" },
  }[language];
  return (
    <Link href={language === "ru" ? href : `/${language}${href}`} prefetch={false} className="card fleet-card">
      <div className="card__media">
        <Photo src={images[0]} className="fleet-card__exterior" />
        {images[1] && <Photo src={images[1]} className="fleet-card__interior" />}
      </div>
      <div className="card__body">
        <Heading>{name}</Heading>
        <p>{length && `${length} ${language === "ru" ? "м" : language === "zh" ? "米" : "m"} · `}{capacity} {copy.guests}</p>
        {configuration && (
          <dl className="fleet-card__specs">
            {configuration.buffet && <div><dt>{copy.buffet}</dt><dd>{configuration.buffet}</dd></div>}
            {configuration.banquet && <div><dt>{copy.banquet}</dt><dd>{configuration.banquet}</dd></div>}
            {configuration.tables && <div><dt>{copy.tables}</dt><dd>{configuration.tables}</dd></div>}
            {configuration.chairs && <div><dt>{copy.chairs}</dt><dd>{configuration.chairs}</dd></div>}
          </dl>
        )}
        <p className="card__price">
          {priceOld && <s>{rub(priceOld)}</s>}{copy.from} {rub(price)} / {copy.hour}
        </p>
      </div>
    </Link>
  );
}

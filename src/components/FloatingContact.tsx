import { site } from "@/data/site";
import { interfaceText, type Language } from "@/data/locale";

/** Плавающие кнопки связи (на сайте: «Позвонить», «Написать в Max», «Написать в Telegram») */
export function FloatingContact({ language }: { language: Language }) {
  const max = site.socials.find((s) => s.label === "Max");
  const tg = site.socials.find((s) => s.label === "Telegram");
  return (
    <div className="float" aria-label={interfaceText[language].contact}>
      <a href={site.phoneHref}>{language === "ru" ? "Позвонить" : language === "en" ? "Call us" : "致电"}</a>
      {max && (
        <a href={max.href} target="_blank" rel="noopener noreferrer">
          Max
        </a>
      )}
      {tg && (
        <a href={tg.href} target="_blank" rel="noopener noreferrer">
          Telegram
        </a>
      )}
    </div>
  );
}

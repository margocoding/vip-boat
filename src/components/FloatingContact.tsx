import { site } from "@/data/site";

/** Плавающие кнопки связи (на сайте: «Позвонить», «Написать в Max», «Написать в Telegram») */
export function FloatingContact() {
  const max = site.socials.find((s) => s.label === "Max");
  const tg = site.socials.find((s) => s.label === "Telegram");
  return (
    <div className="float" aria-label="Связаться">
      <a href={site.phoneHref}>Позвонить</a>
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

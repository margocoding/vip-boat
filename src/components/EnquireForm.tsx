"use client";

import { useEffect, useRef, useState } from "react";
import { interfaceText, type Language } from "@/data/locale";
import { rub } from "@/lib/img";

export type EnquireQuote = {
  vessel: string;
  date: string;
  start: string;
  duration: string;
  guests: number;
  options: string[];
  total: number;
};

const quoteText = {
  ru: { title: "Смета аренды", trip: "Рейс", guests: "Гостей", options: "Услуги", total: "Предварительно", optional: "необязательно", locale: "ru-RU" },
  en: { title: "Charter estimate", trip: "Trip", guests: "Guests", options: "Services", total: "Estimated total", optional: "optional", locale: "en-GB" },
  zh: { title: "租船估算", trip: "航程", guests: "人数", options: "服务", total: "预估总价", optional: "选填", locale: "zh-CN" },
} as const;

export function EnquireForm({ language = "ru", note, quote }: { language?: Language; note?: string; quote?: EnquireQuote }) {
  const [complete, setComplete] = useState(false);
  const confirmation = useRef<HTMLDivElement>(null);
  const copy = interfaceText[language];
  const labels = quoteText[language];

  useEffect(() => {
    if (complete) confirmation.current?.focus();
  }, [complete]);

  if (complete) {
    return (
      <div className="form__ok" role="status" ref={confirmation} tabIndex={-1}>
        <strong>{copy.done}</strong>
        <p>{copy.doneNote}</p>
        <button className="link-arrow form__repeat" type="button" onClick={() => setComplete(false)}>
          {language === "ru" ? "Заполнить ещё раз" : language === "en" ? "Start again" : "重新填写"}
        </button>
      </div>
    );
  }
  return (
    <form className="form" method="dialog" onSubmit={(event) => {
      event.preventDefault();
      setComplete(true);
    }}>
      {quote && (
        <section className="enquire-quote" aria-label={labels.title}>
          <div className="enquire-quote__heading">
            <p className="enquire-quote__vessel">{quote.vessel}</p>
            <p className="enquire-quote__total"><span>{labels.total}</span><strong>{rub(quote.total)}</strong></p>
          </div>
          <dl className="enquire-quote__details">
            <div><dt>{labels.trip}</dt><dd>
              <time dateTime={`${quote.date}T${quote.start}`}>{new Intl.DateTimeFormat(labels.locale, {
                day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC",
              }).format(new Date(quote.date))} · {quote.start}</time> · {quote.duration}
            </dd></div>
            <div><dt>{labels.guests}</dt><dd>{quote.guests}</dd></div>
            <div><dt>{labels.options}</dt><dd>{quote.options.join(" · ")}</dd></div>
          </dl>
        </section>
      )}
      <p className="form__note">{copy.demo}</p>
      <label><span>{copy.name}</span><input name="name" type="text" required pattern={".*\\S.*"} maxLength={80} autoComplete="off" /></label>
      <label><span>{copy.phone}</span><input name="contact" type="text" required pattern={".*\\S.*"} maxLength={120} autoComplete="off" spellCheck={false} /></label>
      <label><span>{copy.message} <small>{labels.optional}</small></span><textarea name="message" rows={note ? 4 : 2} defaultValue={note} maxLength={800} /></label>
      <button className="btn btn--solid" type="submit">{copy.send}</button>
    </form>
  );
}

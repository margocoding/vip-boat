"use client";

import { useState } from "react";
import type { Language } from "@/data/locale";
import { cateringOptions, estimateRental, rentalExtras, type CateringOption, type RentalSelection } from "@/lib/estimate";
import { rub } from "@/lib/img";
import { useEnquire } from "../EnquireProvider";

const text = {
  ru: {
    title: "Рассчитайте аренду", trip: "Ваш рейс", date: "Дата", start: "Начало", hours: "Часов", guests: "Гостей", food: "Кейтеринг", extras: "Дополнительные услуги",
    choices: ["Без кейтеринга", "Фуршет", "Банкет"], services: ["Сервировка", "Оформление палубы", "Фотограф"], perGuest: "с человека",
    result: "Ваш расчёт", hire: "Аренда", hour: "ч", price: "Предварительная стоимость", ready: "Продолжить к заявке", chooseDate: "Выберите дату для расчёта.",
    notice: "Расчёт демонстрационный. Сумма меняется в зависимости от даты, времени, числа гостей и услуг.",
  },
  en: {
    title: "Estimate your charter", trip: "Your trip", date: "Date", start: "Departure", hours: "Hours", guests: "Guests", food: "Catering", extras: "Extras",
    choices: ["No catering", "Reception", "Banquet"], services: ["Table setup", "Deck décor", "Photographer"], perGuest: "per guest",
    result: "Your estimate", hire: "Charter", hour: "hr", price: "Estimated total", ready: "Continue to enquiry", chooseDate: "Choose a date to see the estimate.",
    notice: "Demo estimate. The total changes with the date, departure time, guests and selected services.",
  },
  zh: {
    title: "估算租船费用", trip: "您的航程", date: "日期", start: "出发时间", hours: "小时", guests: "人数", food: "餐饮", extras: "附加服务",
    choices: ["无需餐饮", "酒会", "宴会"], services: ["餐桌布置", "甲板装饰", "摄影师"], perGuest: "每位",
    result: "费用估算", hire: "船只租赁", hour: "小时", price: "预估总价", ready: "继续咨询", chooseDate: "请选择日期以查看预估费用。",
    notice: "演示估算。总价随日期、时间、人数及所选服务变化。",
  },
} as const;

export function RentalEstimate({ vessel, language }: { vessel: { name: string; price: number; capacity: number }; language: Language }) {
  const copy = text[language];
  const { open } = useEnquire();
  const [selection, setSelection] = useState<RentalSelection>({
    date: "2027-06-17",
    hour: 16,
    hours: 2,
    guests: Math.min(8, vessel.capacity),
    catering: "none",
    extras: [],
  });
  const estimate = estimateRental(vessel.price, selection);
  const start = `${String(selection.hour).padStart(2, "0")}:00`;
  const update = <K extends keyof RentalSelection>(key: K, value: RentalSelection[K]) =>
    setSelection(current => ({ ...current, [key]: value }));
  const money = estimate ? rub(estimate.total) : "—";
  const priceLabel = language === "ru" ? "Демонстрационный расчёт" : language === "en" ? "Demo estimate" : "演示估算";
  const cateringIndex = cateringOptions.findIndex(item => item.id === selection.catering);
  const services = rentalExtras.flatMap((item, index) => selection.extras.includes(item.id) ? [copy.services[index]] : []);
  const enquiry = [
    vessel.name,
    `${selection.date} · ${start} · ${selection.hours} ${copy.hour} · ${copy.guests}: ${selection.guests}`,
    copy.choices[cateringIndex],
    ...services,
    `${priceLabel}: ${money}`,
  ].join("\n");
  return (
    <section className="estimate" id="estimate" aria-labelledby="estimate-title">
      <header className="estimate__header">
        <h2 id="estimate-title" className="h2">{copy.title}</h2>
        <p>{copy.notice}</p>
      </header>
      <div className="estimate__grid">
        <div className="estimate__controls">
          <fieldset>
            <legend>{copy.trip}</legend>
            <div className="estimate__fields">
              <label>{copy.date}<input type="date" value={selection.date} onChange={e => update("date", e.target.value)} /></label>
              <label>{copy.start}<select aria-label={copy.start} value={selection.hour} onChange={e => update("hour", Number(e.target.value))}>
                {Array.from({ length: 24 }, (_, hour) => <option key={hour} value={hour}>{String(hour).padStart(2, "0")}:00</option>)}
              </select></label>
              <label>{copy.hours}<select aria-label={copy.hours} value={selection.hours} onChange={e => update("hours", Number(e.target.value))}>
                {Array.from({ length: 12 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
              </select></label>
              <label>{copy.guests}<select aria-label={copy.guests} value={selection.guests} onChange={e => update("guests", Number(e.target.value))}>
                {Array.from({ length: vessel.capacity }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
              </select></label>
            </div>
          </fieldset>
          <fieldset>
            <legend>{copy.food}</legend>
            <div className="estimate__choices">
              {cateringOptions.map((item, index) => (
                <label key={item.id}>
                  <input type="radio" name="catering" value={item.id} checked={selection.catering === item.id} onChange={e => update("catering", e.target.value as CateringOption)} />
                  <span>{copy.choices[index]}{item.perGuest > 0 && <small>{rub(item.perGuest)} / {copy.perGuest}</small>}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>{copy.extras}</legend>
            {rentalExtras.map((item, index) => (
              <label className="estimate__extra" key={item.id}>
                <input type="checkbox" checked={selection.extras.includes(item.id)} onChange={e =>
                  update("extras", e.target.checked ? [...selection.extras, item.id] : selection.extras.filter(id => id !== item.id))
                } />
                <span>{copy.services[index]}</span><span>{rub(item.price)}</span>
              </label>
            ))}
          </fieldset>
        </div>
        <aside className="estimate__summary" aria-label={copy.result}>
          <h3>{copy.result}</h3>
          <p className="estimate__summary-boat">{vessel.name}</p>
          {estimate ? (
            <dl className="estimate__lines">
              <div><dt>{copy.hire} · {selection.hours} {copy.hour}</dt><dd>{rub(estimate.hire)}</dd></div>
              {!!estimate.food && <div><dt>{copy.food} · {selection.guests}</dt><dd>{rub(estimate.food)}</dd></div>}
              {estimate.extras.map(item => (
                <div key={item.id}><dt>{copy.services[rentalExtras.findIndex(extra => extra.id === item.id)]}</dt><dd>{rub(item.price)}</dd></div>
              ))}
            </dl>
          ) : <p>{copy.chooseDate}</p>}
          <div className="estimate__total" aria-live="polite">
            <span>{copy.price}</span>
            <strong>{money}</strong>
          </div>
          <button className="btn btn--solid" type="button" disabled={!estimate} onClick={() => open(enquiry)}>{copy.ready}</button>
        </aside>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { interfaceText, type Language } from "@/data/locale";

export function EnquireForm({ language = "ru", note }: { language?: Language; note?: string }) {
  const [complete, setComplete] = useState(false);
  const copy = interfaceText[language];

  if (complete) {
    return (
      <div className="form__ok" role="status">
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
      <p className="form__note">{copy.demo}</p>
      <label><span>{copy.name}</span><input name="name" required maxLength={80} autoComplete="off" /></label>
      <label><span>{copy.phone}</span><input name="contact" required maxLength={120} autoComplete="off" /></label>
      <label><span>{copy.message}</span><textarea name="message" rows={note ? 4 : 2} defaultValue={note} maxLength={800} /></label>
      <button className="btn btn--solid" type="submit">{copy.send}</button>
    </form>
  );
}

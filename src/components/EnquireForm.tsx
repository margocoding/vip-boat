"use client";

import { useEffect, useRef, useState } from "react";
import { interfaceText, type Language } from "@/data/locale";

export function EnquireForm({ language = "ru", note }: { language?: Language; note?: string }) {
  const [complete, setComplete] = useState(false);
  const confirmation = useRef<HTMLDivElement>(null);
  const copy = interfaceText[language];

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
      <p className="form__note">{copy.demo}</p>
      <label><span>{copy.name}</span><input name="name" type="text" required pattern={".*\\S.*"} maxLength={80} autoComplete="off" /></label>
      <label><span>{copy.phone}</span><input name="contact" type="text" required pattern={".*\\S.*"} maxLength={120} autoComplete="off" spellCheck={false} /></label>
      <label><span>{copy.message}</span><textarea name="message" rows={note ? 4 : 2} defaultValue={note} maxLength={800} /></label>
      <button className="btn btn--solid" type="submit">{copy.send}</button>
    </form>
  );
}

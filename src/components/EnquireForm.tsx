"use client";

import { useState } from "react";

export function EnquireForm({ onDone, light = false }: { onDone?: () => void; light?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("ok");
      form.reset();
      if (onDone) setTimeout(onDone, 2500);
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="form__ok">
        <strong>Спасибо!</strong>
        <p>Заявка отправлена. Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form className={`form ${light ? "form--light" : ""}`} onSubmit={onSubmit}>
      <label>
        <span>Имя*</span>
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        <span>Телефон / WhatsApp / Telegram*</span>
        <input name="phone" required autoComplete="tel" />
      </label>
      <label>
        <span>E-mail</span>
        <input name="email" type="email" autoComplete="email" />
      </label>
      <label>
        <span>Сообщение</span>
        <textarea name="message" rows={3} />
      </label>
      <button className="btn btn--solid" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Отправка…" : "Отправить"}
      </button>
      {status === "error" && <p className="form__err">Не удалось отправить. Попробуйте ещё раз.</p>}
      <p className="form__note">Нажимая «Отправить», вы соглашаетесь с политикой конфиденциальности.</p>
    </form>
  );
}

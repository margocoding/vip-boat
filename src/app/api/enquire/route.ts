import { NextResponse } from "next/server";

/**
 * Приём заявок с формы.
 * TODO: подключите отправку на почту / в Telegram-бота / CRM.
 * Пример для Telegram: POST https://api.telegram.org/bot<TOKEN>/sendMessage
 * (токен и chat_id храните в .env.local, не в коде).
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    if (!name || !phone) {
      return NextResponse.json({ ok: false, error: "name and phone required" }, { status: 400 });
    }
    console.log("[enquire]", {
      name,
      phone,
      email: String(body.email ?? ""),
      message: String(body.message ?? ""),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

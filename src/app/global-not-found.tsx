import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHeading } from "@/components/rental/InteriorHeading";
import "./globals.css";
import "./prototype.css";

const title = "Страница не найдена";

export const metadata: Metadata = {
  title: `${title} | Vip Boat`,
};

export default function GlobalNotFound() {
  return (
    <html lang="ru">
      <body>
        <main>
          <InteriorHeading title={title} subtitle="Проверьте адрес или вернитесь к выбору судна."
            home={{ href: "/", label: "На главную" }} />
          <div className="interior-content">
            <Link href="/arenda-yachty" className="btn btn--solid" prefetch={false}>Перейти к каталогу</Link>
            <nav className="locale-switch" aria-label="Язык">
              <Link href="/en" lang="en" hrefLang="en" prefetch={false}>English</Link>
              <Link href="/zh" lang="zh-Hans" hrefLang="zh-Hans" prefetch={false}>简体中文</Link>
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}

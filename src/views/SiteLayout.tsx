import type { Metadata } from "next";
import "@/app/globals.css";
import "@/app/prototype.css";
import { EnquireProvider } from "@/components/EnquireProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { interfaceText, type Language } from "@/data/locale";
import { origin } from "@/lib/metadata";

export const metadata: Metadata = { metadataBase: origin };
export default function SiteLayout({ children, language }: { children: React.ReactNode; language: Language }) {
  return (
    <html lang={language === "zh" ? "zh-Hans" : language}>
      <body>
        <a className="skip-link" href="#main-content">{interfaceText[language].skip}</a>
        <EnquireProvider language={language}>
          <Header language={language} />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer language={language} />
        </EnquireProvider>
      </body>
    </html>
  );
}

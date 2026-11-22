import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/data/site";
import { EnquireProvider } from "@/components/EnquireProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";

export const metadata: Metadata = {
  title: site.fullName,
  description: site.description,
  openGraph: {
    title: site.fullName,
    description: "Аренда яхт, катеров и теплоходов в Санкт-Петербурге. Подбор судна для прогулок и мероприятий.",
    siteName: "Vip Boat",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <EnquireProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingContact />
        </EnquireProvider>
      </body>
    </html>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { interfaceText, languageDestination, languages, localized, type Language } from "@/data/locale";

const names = { ru: "Русский", en: "English", zh: "简体中文" };

export function LanguageSwitch({ language }: { language: Language }) {
  const path = usePathname() || localized(language);
  return (
    <nav className="locale-switch" aria-label={interfaceText[language].language}>
      {languages.map(item => {
        const tag = item === "zh" ? "zh-Hans" : item;
        return (
          <a key={item} href={languageDestination(path, language, item)} hrefLang={tag} lang={tag}
            aria-label={names[item]} aria-current={item === language ? "true" : undefined}>
            {item.toUpperCase()}
          </a>
        );
      })}
    </nav>
  );
}

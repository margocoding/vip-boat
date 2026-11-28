"use client";

import { useState } from "react";
import type { Language } from "@/data/locale";

const labels = {
  ru: { title: "Посмотрите судно изнутри", open: "Открыть 3D-тур", close: "Свернуть 3D-тур", external: "Открыть в новой вкладке" },
  en: { title: "Look around on board", open: "Load the 3D tour", close: "Close the 3D tour", external: "Open in a new tab" },
  zh: { title: "探索船内空间", open: "加载 3D 导览", close: "关闭 3D 导览", external: "在新标签页打开" },
};

export function VirtualTour({ url, name, language }: { url: string; name: string; language: Language }) {
  const [loaded, setLoaded] = useState(false);
  const text = labels[language];
  return (
    <section className="tour">
      <h2>{text.title}</h2>
      <button type="button" className="btn btn--ghost" aria-expanded={loaded}
        aria-controls="virtual-tour-content" onClick={() => setLoaded(current => !current)}>
        {loaded ? text.close : text.open}
      </button>
      <div className="tour__content" id="virtual-tour-content" hidden={!loaded}>
        {loaded && <>
          <iframe src={url} title={`3D · ${name}`} allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          <a href={url} className="plain-link" target="_blank" rel="noreferrer">{text.external} ↗</a>
        </>}
      </div>
    </section>
  );
}

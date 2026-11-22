import Link from "next/link";
import { categories } from "@/data/site";

/** Полоса категорий сразу под hero (как у образца) */
export function CategoryStrip() {
  return (
    <section className="strip" aria-label="Категории">
      <ul className="strip__list">
        {categories.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="strip__tab">
              {c.label}
              {c.count ? <em>{c.count}</em> : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

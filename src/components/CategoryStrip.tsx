import Link from "next/link";
import type { Category } from "@/data/site";

/** Полоса категорий сразу под hero (как у образца) */
export function CategoryStrip({ categories }: { categories: Category[] }) {
  return (
    <section className="strip" aria-label="Категории">
      <ul className="strip__list">
        {categories.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="strip__tab" prefetch={false}>
              {c.label}
              {c.count !== undefined && <em>{c.count}</em>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

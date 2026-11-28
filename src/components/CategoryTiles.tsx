import Link from "next/link";
import type { Category } from "@/data/site";
import { Photo } from "./Photo";

/** Плитки категорий: те же шесть, что на vip-boat.ru */
export function CategoryTiles({ categories }: { categories: Category[] }) {
  return (
    <section className="tiles" id="catalog">
      <div className="tiles__head">
        <p className="kicker">Каталог услуг</p>
        <h2 className="h2">Аренда яхт, катеров и теплоходов</h2>
      </div>
      <ul className="tiles__grid">
        {categories.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="tile" prefetch={false}>
              <Photo src={c.image} className="tile__photo" />
              <span className="tile__shade" />
              <span className="tile__label">
                {c.label}
                {c.count !== undefined && <em>{c.count}</em>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

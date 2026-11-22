import Link from "next/link";
import { categories, extraNav, legalLinks, site, topNav } from "@/data/site";
import { EnquireForm } from "./EnquireForm";

export function Footer() {
  return (
    <footer className="footer" id="contacts">
      <div className="footer__top">
        <div className="footer__form">
          <h2 className="h2">Выбрали судно — оставьте заявку</h2>
          <EnquireForm />
        </div>

        <div className="footer__contacts">
          <h4>Контакты</h4>
          <a href={site.phoneHref} className="footer__phone">
            {site.phone}
          </a>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          <p>Менеджер свяжется с вами в течение 5 минут</p>
          <ul className="footer__socials">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__dir">
        <div>
          <h4>Категории</h4>
          {categories.map((c) => (
            <Link key={c.href} href={c.href}>
              {c.label}
            </Link>
          ))}
        </div>
        <div>
          <h4>Разделы</h4>
          {[...topNav, ...extraNav].map((c) => (
            <Link key={c.href} href={c.href}>
              {c.label}
            </Link>
          ))}
        </div>
        <div>
          <h4>Документы</h4>
          {legalLinks.map((c) => (
            <Link key={c.href} href={c.href}>
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="footer__legal">
        <p>
          © {site.name}, {new Date().getFullYear()}. Все права защищены. Аренда яхт, катеров и теплоходов в
          Санкт-Петербурге. Копирование материалов запрещено. Сайт не является публичной офертой.
        </p>
        <p>
          {site.legal.owner} (ИНН {site.legal.inn}, ОГРНИП {site.legal.ogrnip})
        </p>
        <p>
          <Link href="/ai-content-agreement">Внимание: на сайте использован контент, сгенерированный ИИ (нейросеть)</Link>
        </p>
      </div>
    </footer>
  );
}

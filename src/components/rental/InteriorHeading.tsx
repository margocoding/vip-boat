import Link from "next/link";

export function InteriorHeading({ title, subtitle, eyebrow, parent, compact = false, home = { href: "/", label: "Главная" } }: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  parent?: { href: string; label: string };
  compact?: boolean;
  home?: { href: string; label: string };
}) {
  return (
    <div className={compact ? "interior-heading interior-heading--compact" : "interior-heading"}>
      <nav className="breadcrumbs" aria-label={home.label}>
        <Link href={home.href}>{home.label}</Link>
        {parent && <><span aria-hidden="true">/</span><Link href={parent.href}>{parent.label}</Link></>}
        <span aria-hidden="true">/</span>
        <span aria-current="page">{title}</span>
      </nav>
      {eyebrow && <p className="kicker">{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <p className="interior-heading__subtitle">{subtitle}</p>}
    </div>
  );
}

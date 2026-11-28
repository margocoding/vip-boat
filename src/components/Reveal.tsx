/** Keeps layout wrappers visible in server HTML and during hydration. */
export function Reveal({ children, className }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}

/**
 * Фото с запасным градиентом: если файла нет, виден градиент,
 * поэтому макет не «ломается», пока картинки не скопированы.
 * `src` — готовый URL (используйте vimg() для файлов из /public/vip-images).
 */
const gradients = [
  "linear-gradient(135deg,#00202f,#0b5a78 55%,#07c4cf)",
  "linear-gradient(135deg,#002839,#165874 60%,#9fdde2)",
  "linear-gradient(135deg,#001a28,#0f4a64 55%,#6fc9d1)",
  "linear-gradient(135deg,#00283a,#1b6b86 55%,#d3f1f3)",
];

export function Photo({
  src,
  seed = 0,
  className = "",
  label,
}: {
  src: string;
  seed?: number;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`photo ${className}`}
      style={{ backgroundImage: `url("${src}"), ${gradients[seed % gradients.length]}` }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}

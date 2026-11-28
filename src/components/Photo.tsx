import { cardSizes, responsivePhoto } from "@/lib/media";

export function Photo({ src, className = "", label = "", sizes = cardSizes, priority = false }: {
  src: string;
  className?: string;
  label?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const image = responsivePhoto(src, sizes);
  return (
    <div className={`photo ${className}`}>
      {image && (
        // Local WebP variants already encode the right widths.
        // eslint-disable-next-line @next/next/no-img-element
        <img {...image} alt={label} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" />
      )}
    </div>
  );
}

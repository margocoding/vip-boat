import manifest from "@/data/media.json";

type Variants = Record<string, [string, number]>;
const aliases = manifest.aliases as Record<string, string>;
const images = manifest.media as unknown as Record<string, { variants: Variants }>;

export const cardSizes = "(max-width: 560px) 90vw, (max-width: 1100px) 45vw, 30vw";

export function responsivePhoto(asset: string, sizes: string) {
  const name = asset.normalize("NFC");
  const media = images[aliases[name] || name];
  if (!media) return null;
  const variants = Object.entries(media.variants);
  const [width, [src, height]] = (variants.find(([size]) => Number(size) >= 800) || variants.at(-1))!;
  return { src, srcSet: variants.map(([size, [path]]) => `${path} ${size}w`).join(", "), sizes, width: Number(width), height };
}

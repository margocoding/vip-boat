export type Boat = {
  slug: string;
  name: string;
  href: string;
  capacity: number; // человек
  length: string; // метров
  priceOld: number | null; // цена без скидки, ₽/час
  price: number; // ₽/час (со скидкой, если она есть)
  amenities: string[];
  images: string[]; // имена файлов из /public/vip-images
};

import { boats } from "./boats";
import type { Boat } from "./types";

export const fleetSections = {
  "arenda-yachty": {
    title: "Аренда яхт",
    name: "Яхты",
    description: "Выберите моторную яхту для прогулки с капитаном по Неве или выхода в Финский залив.",
  },
  "arenda-catera": {
    title: "Аренда катеров",
    name: "Катера",
    description: "Прогулки по рекам и каналам Петербурга для небольших компаний. Подберите катер по вместимости и цене.",
  },
  "arenda-teplohoda": {
    title: "Аренда теплоходов",
    name: "Теплоходы",
    description: "Теплоходы с открытыми палубами и банкетными залами для свадеб, корпоративов и других событий на воде.",
  },
} as const;

export type FleetSection = keyof typeof fleetSections;
export type RentalVessel = Boat & {
  section: FleetSection;
  description?: string;
  seo?: { title?: string; description?: string };
  tourUrl?: string;
  configuration?: { decks?: 1 | 2; premium?: boolean; banquet?: number; buffet?: number; tables?: number; chairs?: number };
};

export function isFleetSection(section: string): section is FleetSection {
  return Object.hasOwn(fleetSections, section);
}

type ExtraVessel = Pick<RentalVessel, "slug" | "name" | "capacity" | "price"> &
  Partial<Pick<RentalVessel, "priceOld" | "length" | "configuration" | "description">>;

function examples(section: FleetSection, entries: ExtraVessel[]): RentalVessel[] {
  return entries.map((entry) => ({
    priceOld: null,
    length: "",
    amenities: [],
    ...entry,
    href: `/${section}/${entry.slug}`,
    section,
    images: [entry.slug, `${entry.slug}-salon`],
  }));
}

const motorboats = examples("arenda-catera", [
  { slug: "nord", name: "Катер «Норд»", capacity: 7, price: 7500 },
  { slug: "moulin-rouge", name: "Катер «Мулен Руж»", capacity: 7, price: 8000 },
  { slug: "sea-ray-270", name: "Катер Sea Ray 270 «Светлана»", capacity: 11, price: 13000 },
  { slug: "montferrand", name: "Катер «Монферран»", capacity: 10, price: 26000 },
]);

// A fleet sample for review. Layout and banquet figures without operator confirmation
// belong to the prototype and are labelled as such on ship cards.
const ships = examples("arenda-teplohoda", [
  {
    slug: "siesta", name: "Теплоход «Сиеста»", capacity: 30, price: 14500,
    configuration: { decks: 1, buffet: 30, banquet: 20 },
    description: "Камерный теплоход с закрытым салоном и местом на открытом воздухе. Подойдёт для дня рождения или небольшой свадьбы.",
  },
  {
    slug: "alta", name: "Теплоход «Альта»", capacity: 50, price: 23000, priceOld: 30000,
    configuration: { decks: 2, buffet: 50, banquet: 35, tables: 8, chairs: 35 },
    description: "Теплоход с банкетным залом и открытой палубой. Можно разместить гостей за столами и выделить место для музыки и танцев.",
  },
  {
    slug: "ameli", name: "Теплоход «Амели»", capacity: 100, price: 34000,
    configuration: { decks: 2, buffet: 100, banquet: 84, premium: true },
  },
  {
    slug: "mirazh", name: "Теплоход «Мираж»", capacity: 149, price: 36000,
    configuration: { decks: 2, buffet: 149, premium: true },
  },
  {
    slug: "vasiliy", name: "Теплоход «Василий»", capacity: 164, price: 38000,
    configuration: { decks: 2, buffet: 164 },
  },
]);

const yachts: RentalVessel[] = boats.map((boat) => ({
  ...boat,
  section: "arenda-yachty",
  images: [boat.slug, `${boat.slug}-salon`],
  ...(boat.slug === "azimut-62" ? {
    description: "Моторная яхта длиной 19 метров для компании до 10 гостей. На борту панорамный салон, открытая палуба и каюты. Подойдёт для прогулки по Неве, выхода в залив или камерного праздника.",
    tourUrl: "https://3dmytour.ru/3d/azimut62s",
  } : {}),
}));

export const fleet: Record<FleetSection, RentalVessel[]> = {
  "arenda-yachty": yachts,
  "arenda-catera": motorboats,
  "arenda-teplohoda": ships,
};

export const allVessels = Object.values(fleet).flat();

export function vesselDescription(vessel: RentalVessel) {
  return vessel.description ??
    `${vessel.name} для прогулки с капитаном в Санкт-Петербурге. Вместимость до ${vessel.capacity} гостей.`;
}

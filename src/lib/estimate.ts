export const rentalExtras = [
  { id: "serving", label: "Сервировка", price: 5000 },
  { id: "decor", label: "Оформление палубы", price: 10000 },
  { id: "photographer", label: "Фотограф", price: 8000 },
] as const;

export const cateringOptions = [
  { id: "none", label: "Без кейтеринга", perGuest: 0, minimum: 0 },
  { id: "buffet", label: "Фуршет", perGuest: 2200, minimum: 20000 },
  { id: "banquet", label: "Банкет", perGuest: 3200, minimum: 35000 },
] as const;

export type CateringOption = typeof cateringOptions[number]["id"];
export type ExtraId = typeof rentalExtras[number]["id"];
export type RentalPricing = {
  price: number;
  capacity: number;
  configuration?: { banquet?: number; buffet?: number };
};

export type RentalSelection = {
  date: string;
  hour: number;
  hours: number;
  guests: number;
  catering: CateringOption;
  extras: ExtraId[];
};

export function cateringCapacity(vessel: RentalPricing, format: CateringOption) {
  if (format === "none") return vessel.capacity;
  return Math.min(vessel.capacity, vessel.configuration?.[format] ?? vessel.capacity);
}

// Prototype coefficients inspired by the tariff table, separate from published base rates.
function rate(base: number, hour: Date) {
  const monthDay = (hour.getUTCMonth() + 1) * 100 + hour.getUTCDate();
  const season = monthDay >= 610 && monthDay <= 705 ? 1.5 : monthDay >= 522 && monthDay <= 913 ? 1.25 : 1;
  const weekend = [0, 5, 6].includes(hour.getUTCDay()) ? 1.1 : 1;
  const evening = hour.getUTCHours() < 8 || hour.getUTCHours() >= 18 ? 1.12 : 1;
  return Math.round(base * season * weekend * evening);
}

export function estimateRental(vessel: RentalPricing, selection: RentalSelection) {
  const { date, hour, hours, guests } = selection;
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isInteger(hour) || hour < 0 || hour > 23 ||
    !Number.isInteger(hours) || hours < 1 || hours > 12 ||
    !Number.isInteger(guests) || guests < 1 || guests > cateringCapacity(vessel, selection.catering)
  ) return null;

  const firstHour = new Date(`${date}T00:00:00.000Z`);
  if (!Number.isFinite(firstHour.getTime()) || firstHour.toISOString().slice(0, 10) !== date) return null;
  const catering = cateringOptions.find(({ id }) => id === selection.catering);
  if (!catering) return null;

  firstHour.setUTCHours(hour);
  let hire = 0;
  for (let offset = 0; offset < hours; offset++) {
    hire += rate(vessel.price, new Date(firstHour.getTime() + offset * 3600000));
  }
  const food = Math.max(catering.minimum, catering.perGuest * guests);
  const extras = rentalExtras.filter(({ id }) => selection.extras.includes(id));
  const total = hire + food + extras.reduce((sum, { price }) => sum + price, 0);
  return { hire, food, extras, total };
}

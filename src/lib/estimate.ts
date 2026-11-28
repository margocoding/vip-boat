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
export type RentalSelection = {
  date: string;
  hour: number;
  hours: number;
  guests: number;
  catering: CateringOption;
  extras: ExtraId[];
};

// Prototype coefficients inspired by the tariff table, separate from published base rates.
function rate(base: number, hour: Date) {
  const monthDay = (hour.getUTCMonth() + 1) * 100 + hour.getUTCDate();
  const season = monthDay >= 610 && monthDay <= 705 ? 1.5 : monthDay >= 522 && monthDay <= 913 ? 1.25 : 1;
  const weekend = [0, 5, 6].includes(hour.getUTCDay()) ? 1.1 : 1;
  const evening = hour.getUTCHours() < 8 || hour.getUTCHours() >= 18 ? 1.12 : 1;
  return Math.round(base * season * weekend * evening);
}

export function estimateRental(base: number, selection: RentalSelection) {
  const { date, hour, hours, guests } = selection;
  const firstHour = new Date(`${date}T00:00:00.000Z`);
  if (!date || Number.isNaN(firstHour.getTime())) return null;
  firstHour.setUTCHours(hour);
  const hourlyRates = Array.from({ length: hours }, (_, i) => rate(base, new Date(firstHour.getTime() + i * 3600000)));
  const hire = hourlyRates.reduce((total, value) => total + value, 0);
  const catering = cateringOptions.find(({ id }) => id === selection.catering)!;
  const food = Math.max(catering.minimum, catering.perGuest * guests);
  const extras = rentalExtras.filter(({ id }) => selection.extras.includes(id));
  const total = hire + food + extras.reduce((sum, { price }) => sum + price, 0);
  return { hire, food, extras, total };
}

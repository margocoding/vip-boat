import type { Language } from "./locale";

type Localized = Record<Language, string>;
type EditorialCard = {
  slug: string;
  image: string;
  name: Localized;
  description: Localized;
  duration?: Localized;
  menu?: string;
};

export type EditorialSection = "routes" | "catering" | "events" | "cruises";

export const editorial: Record<EditorialSection, { title: Localized; description: Localized; items: EditorialCard[] }> = {
  routes: {
    title: { ru: "Маршруты по воде", en: "Routes on the water", zh: "水上航线" },
    description: {
      ru: "Каналы исторического центра, широкая Нева и просторы Финского залива. Выберите направление для своей прогулки.",
      en: "Explore the historic canals, the wide Neva River and the Gulf of Finland.",
      zh: "穿过历史城区的运河，领略宽阔的涅瓦河和芬兰湾。",
    },
    items: [
      {
        slug: "petrovskaya-venetsiya", image: "venice",
        name: { ru: "Петровская Венеция", en: "Venice of the North", zh: "北方威尼斯" },
        description: { ru: "Прогулка по водным путям исторического Петербурга. Маршрут и причал капитан уточняет перед выходом.", en: "A tour through the waterways of historic St Petersburg. Confirm your exact route and pier with the skipper.", zh: "沿圣彼得堡历史城区的水道巡游。具体航线和登船码头由船长确认。" },
        duration: { ru: "2–2,5 часа", en: "2–2.5 hours", zh: "2 至 2.5 小时" },
      },
      {
        slug: "finskiy-zaliv", image: "hero",
        name: { ru: "Финский залив", en: "Gulf of Finland", zh: "芬兰湾" },
        description: { ru: "Выход в залив с видами на город и акваторию Балтики. Подбираем судно под продолжительность и состав компании.", en: "Head out into the gulf for sweeping city and Baltic views. Choose a vessel to suit your group and itinerary.", zh: "出航前往芬兰湾，饱览城市和波罗的海景色。可按人数和行程选择船只。" },
        duration: { ru: "По запросу", en: "On request", zh: "按需安排" },
      },
    ] satisfies EditorialCard[],
  },
  catering: {
    title: { ru: "Кейтеринг на борту", en: "Catering on board", zh: "船上餐饮" },
    description: {
      ru: "Фуршет для прогулки или банкет с рассадкой. Посмотрите варианты подачи и примеры меню.",
      en: "Choose between a stand-up reception and a seated banquet. Explore the formats and sample menus.",
      zh: "可选择站立式酒会或正式宴会，查看服务形式与示例菜单。",
    },
    items: [
      {
        slug: "furshet", image: "siesta-salon",
        name: { ru: "Фуршет", en: "Reception", zh: "船上酒会" },
        description: { ru: "Лёгкие закуски, канапе и напитки на отдельных станциях. Гости свободно перемещаются между салоном и палубой.", en: "Light bites, canapés and drinks served at stations so guests can mingle between the saloon and deck.", zh: "提供小食、点心及饮品，宾客可在船舱和甲板之间自由交流。" },
        menu: "/menus/reception.txt",
      },
      {
        slug: "banket", image: "vasiliy-salon",
        name: { ru: "Банкет", en: "Seated banquet", zh: "正式宴会" },
        description: { ru: "Сервировка и подача по курсам для свадьбы или торжества. Рассадку, меню и время сервировки согласовывают с организатором.", en: "Table service and a multi-course menu for weddings and celebrations. Seating and service timing are arranged with the organiser.", zh: "为婚礼及庆典提供分道上菜与餐桌服务。座位、菜单与服务时间由主办方确认。" },
        menu: "/menus/banquet.txt",
      },
    ] satisfies EditorialCard[],
  },
  events: {
    title: { ru: "Мероприятия на воде", en: "Events on the water", zh: "水上活动" },
    description: { ru: "Подберите судно под повод и количество гостей. Маршрут, программу и меню можно собрать вместе.", en: "Choose a vessel for the occasion and plan your route, entertainment and catering.", zh: "按活动类型和人数选择船只，并安排航线、节目及餐饮。" },
    items: [
      {
        slug: "wedding", image: "alta-salon",
        name: { ru: "Свадьба", en: "Wedding", zh: "婚礼" },
        description: { ru: "Церемония на палубе и банкет в салоне теплохода.", en: "A ceremony on deck and a banquet in the saloon.", zh: "在甲板上举行仪式，在宴会厅内用餐。" },
      },
      {
        slug: "corporate", image: "mirazh-salon",
        name: { ru: "Корпоратив", en: "Corporate event", zh: "企业活动" },
        description: { ru: "Фуршет и программа на борту для команды и гостей.", en: "A reception and entertainment on board for your team and guests.", zh: "为团队和宾客安排船上酒会与娱乐节目。" },
      },
    ] satisfies EditorialCard[],
  },
  cruises: {
    title: { ru: "Круизы из Петербурга", en: "Cruises from St Petersburg", zh: "圣彼得堡出发的游轮之旅" },
    description: { ru: "Индивидуальные путешествия по Ладоге и водным путям Северо-Запада.", en: "Private cruises on Lake Ladoga and the waterways of north-west Russia.", zh: "私人游轮探索拉多加湖及俄罗斯西北部水道。" },
    items: [
      {
        slug: "ladoga", image: "politruk-bocharov",
        name: { ru: "Ладожские шхеры", en: "Lake Ladoga skerries", zh: "拉多加湖群岛" },
        description: { ru: "Круиз на ретро-теплоходе «Политрук Бочаров». Продолжительность и остановки подбираются под вашу поездку.", en: "Explore Lake Ladoga aboard the retro motor ship Politruk Bocharov. Tailor the cruise length and stops to your group.", zh: "搭乘复古的博恰罗夫号探索拉多加湖，行程时长和停靠点可按需安排。" },
      },
    ] satisfies EditorialCard[],
  },
};

export function isEditorialSection(value: string): value is EditorialSection {
  return Object.hasOwn(editorial, value);
}

export const documents: Record<string, string> = {
  "privacy-policy": "Политика обработки персональных данных",
  "data-consent": "Согласие на обработку персональных данных",
  "cookies": "Файлы cookie, карты и локальные настройки",
  "order-terms": "Условия использования и аренды",
  "analytics-consent": "Согласие на трансграничную передачу данных Google Analytics",
  "ai-content-agreement": "Информация об использовании ИИ",
};

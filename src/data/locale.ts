export const languages = ["ru", "en", "zh"] as const;
export type Language = typeof languages[number];

export function isLanguage(value: string): value is Language {
  return (languages as readonly string[]).includes(value);
}

export function localized(language: Language, path = "/") {
  return language === "ru" ? path : `/${language}${path === "/" ? "" : path}`;
}

const translatedSections = new Set([
  "arenda-yachty", "arenda-catera", "arenda-teplohoda", "routes", "catering", "events", "cruises", "contacts",
]);

export function languageDestination(pathname: string, current: Language, target: Language) {
  if (current === target) return pathname;
  const path = current === "ru" ? pathname : pathname.slice(current.length + 1) || "/";
  const section = path.split("/")[1];
  return localized(target, translatedSections.has(section) ? path : "/");
}

export const interfaceText = {
  ru: {
    home: "Главная", fleet: "Флот", yachts: "Яхты", boats: "Катера", ships: "Теплоходы", routes: "Маршруты", catering: "Кейтеринг",
    callback: "Заказать звонок", enquiry: "Оставить заявку", contact: "Контакты", menu: "Меню", close: "Закрыть",
    name: "Имя", phone: "Телефон или мессенджер", message: "Комментарий", send: "Проверить заявку",
    demo: "Демонстрационная форма. Используйте тестовые контакты.",
    done: "Форма заполнена", doneNote: "Это демонстрация. Данные остались в браузере.",
    skip: "К основному содержанию", language: "Язык",
  },
  en: {
    home: "Home", fleet: "Fleet", yachts: "Yachts", boats: "Motorboats", ships: "Event boats", routes: "Routes", catering: "Catering",
    callback: "Request a call", enquiry: "Make an enquiry", contact: "Contact", menu: "Menu", close: "Close",
    name: "Name", phone: "Phone or messenger", message: "Message", send: "Preview enquiry",
    demo: "Demo form. Use sample contact details.",
    done: "Enquiry preview complete", doneNote: "This is a demo. Your details stayed in your browser.",
    skip: "Skip to main content", language: "Language",
  },
  zh: {
    home: "首页", fleet: "船队", yachts: "游艇", boats: "快艇", ships: "宴会船", routes: "航线", catering: "餐饮",
    callback: "预约回电", enquiry: "提交咨询", contact: "联系方式", menu: "菜单", close: "关闭",
    name: "姓名", phone: "电话或即时通讯账号", message: "留言", send: "预览咨询",
    demo: "演示表单，请使用测试联系方式。",
    done: "咨询预览已完成", doneNote: "这是演示，您的信息仅保留在浏览器中。",
    skip: "跳到主要内容", language: "语言",
  },
} as const;

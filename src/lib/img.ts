/**
 * Путь к фото из папки /public/vip-images (туда копируется папка «…_files»
 * из сохранённой страницы, см. scripts/import-images.mjs и README).
 * Имена файлов приводятся к NFC, чтобы «ё» и «й» совпадали на любой ОС.
 */
export const rub = (n: number) => n.toLocaleString("ru-RU").replace(/ /g, " ") + " ₽";

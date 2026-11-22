// Копирует картинки из папки «…_files» сохранённой страницы в public/vip-images,
// приводя имена файлов к NFC (иначе «ё»/«й» могут не совпасть с именами в коде).
//
// Запуск:
//   node scripts/import-images.mjs "/путь/к/Аренда яхты в СПБ с капитаном, моторная яхта на прокат_files"
import { copyFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const src = process.argv[2];
if (!src) {
  console.error('Укажите путь к папке "..._files" первым аргументом.');
  process.exit(1);
}
const dest = join(process.cwd(), "public", "vip-images");
mkdirSync(dest, { recursive: true });

let n = 0;
for (const name of readdirSync(src)) {
  const from = join(src, name);
  if (!statSync(from).isFile()) continue;
  if (!/\.(webp|png|jpe?g|svg|gif|avif)$/i.test(name)) continue;
  copyFileSync(from, join(dest, name.normalize("NFC")));
  n++;
}
console.log(`Скопировано файлов: ${n} → ${dest}`);

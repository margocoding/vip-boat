import { fleet } from "@/data/rental";
import { rub } from "@/lib/img";
import { FeaturedBoatSelector } from "./FeaturedBoatSelector";
import { Photo } from "./Photo";

export function FeaturedBoats() {
  const options = [...fleet["arenda-yachty"]]
    .sort((a, b) => Number(a.length.replace(",", ".")) - Number(b.length.replace(",", ".")))
    .map(({ slug, name, href, length, capacity, price, priceOld, amenities, images }) => ({
      slug, name, href, length, capacity, amenities,
      price: rub(price),
      priceOld: priceOld ? rub(priceOld) : null,
      photo: <Photo src={images[0]} sizes="(max-width: 860px) 90vw, 46vw" label={name} />,
    }));

  return (
    <section className="featured">
      <div className="featured__head">
        <p className="kicker">Популярный выбор</p>
        <h2 className="h2">Яхты по размеру</h2>
      </div>

      <FeaturedBoatSelector options={options} />
    </section>
  );
}

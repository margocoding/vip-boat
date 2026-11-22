import { Hero } from "@/components/Hero";
import { CategoryStrip } from "@/components/CategoryStrip";
import { Manifesto } from "@/components/Manifesto";
import { Reasons } from "@/components/Reasons";
import { FeaturedBoats } from "@/components/FeaturedBoats";
import { Vessels } from "@/components/Vessels";
import { CategoryTiles } from "@/components/CategoryTiles";
import { BoatsCatalog } from "@/components/BoatsCatalog";
import { Occasions } from "@/components/Occasions";
import { Reviews } from "@/components/Reviews";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <Manifesto />
      <Reasons />
      <FeaturedBoats />
      <Vessels />
      <CategoryTiles />
      <BoatsCatalog />
      <Occasions />
      <Reviews />
    </>
  );
}

import Banner from "@/components/home/Banner/Banner";
import Products from "@/components/home/Products/Products";
import Olivia from "@/components/home/Olivia/Olivia";
import Brands from "@/components/home/Brands/Brands";
import MostSales from "@/components/home/MostSales/MostSales";
import SpecialOffer from "@/components/home/SpecialOffer/SpecialOffer";
import IconInfo from "@/components/home/IconInfo/IconInfo";
import ImageGrid from "@/components/home/ImageGrid/ImageGrid";

export default function Home() {
  return (
    <>
      <section>
        <Banner />
      </section>

      <section>
        <Products />
      </section>

      <section>
        <Olivia />
      </section>

      <section>
        <Brands />
      </section>

      <section>
        <MostSales />
      </section>

      <section>
        <SpecialOffer />
      </section>

      <section>
        <IconInfo />
      </section>

      <section>
        <ImageGrid />
      </section>
    </>
  );
}
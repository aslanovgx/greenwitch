import Banner from "@/components/home/Banner/Banner";
import Products from "@/components/home/Products/Products";
import Olivia from "@/components/home/Olivia/Olivia";
import Brands from "@/components/home/Brands/Brands";

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
    </>
  );
}
import Banner from "@/components/home/Banner/Banner";
import Products from "@/components/home/Products/Products";
import Olivia from "@/components/home/Olivia/Olivia";

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
    </>
  );
}
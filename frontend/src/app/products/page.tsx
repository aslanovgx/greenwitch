import Contact from "@/components/home/Contact/Contact";
import FilterCards from "@/components/products/FilterCards/FilterCards";
import FilterSection from "@/components/products/FilterSection/FilterSection";


export default function Home() {
  return (
    <>
      <section>
        <FilterSection />
      </section>
      <section>
        <FilterCards />
      </section>
      <section>
        <Contact />
      </section>
    </>
  );
}
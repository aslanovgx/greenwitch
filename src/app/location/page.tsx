// app/location/page.tsx
import Contact from "@/components/home/Contact/Contact";
import MapView from "@/components/MapView";

export default function LocationPage() {
    return (
        <section>
            <MapView />
            <Contact />
        </section>
    );
}

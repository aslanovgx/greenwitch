import { notFound } from "next/navigation";
import SpecialOfferPage from "@/components/home/SpecialOffer/SpecialOfferPage";
import { specialOffers, Offer } from "@/data/specialOffers"; // Offer burada gəlir

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function Page({ params }: Props) {
    const { id } = await params;
    const offer: Offer | undefined = specialOffers[id];
    if (!offer) return notFound();

    return <SpecialOfferPage offer={offer} id={parseInt(id)} />;
}

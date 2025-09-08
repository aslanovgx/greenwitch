// data/stores.ts
export type Store = {
  name: string;
  phone: string;
  hours: string;
  location: {
    lat: number;
    lng: number;
  };
};

export const stores: Store[] = [
  {
    name: "28 Mall ( 1-ci mərtəbə )",
    phone: "(050) 210 23 68",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.37906366529173, lng: 49.84677230690917 }
  },
  {
    name: "Gənclik Mall ( 3-cü mərtəbə )",
    phone: "(050) 233 35 01",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.40015132600593, lng: 49.852955328835485 }
  },
  {
    name: "Metro Park ( 3-cü mərtəbə )",
    phone: "(050) 233 35 02",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.40340191876415, lng: 49.872871262128974 }
  },
  {
    name: "Park Bulvar ( 2-ci mərtəbə )",
    phone: "(050) 233 35 03",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.37078542001694, lng: 49.84985081533347 }
  },
  {
    name: "Port Baku Mall ( 1-ci mərtəbə )",
    phone: "(050) 233 35 04",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.37523150186601, lng: 49.86026654904935 } 
  },
  {
    name: "Sumqayıt Mall ( 1-ci mərtəbə )(Bravosuperstore)",
    phone: "(050) 233 35 05",
    hours: "Hər gün 10:00 – 21:00",
    location: { lat: 40.573666, lng: 49.690773 }
  },
  {
    name: "Zefir Mall ( 1-ci mərtəbə )",
    phone: "(050) 233 35 06",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.37657551072271, lng: 49.79402273861551 } 
  },
];
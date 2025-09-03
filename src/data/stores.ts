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
    location: { lat: 40.3977, lng: 49.8671 }
  },
  {
    name: "Metro Park ( 3-cü mərtəbə )",
    phone: "(050) 233 35 02",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.4072, lng: 49.8751 }
  },
  {
    name: "Park Bulvar ( 2-ci mərtəbə )",
    phone: "(050) 233 35 03",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.3703, lng: 49.8515 }
  },
  {
    name: "Port Baku Mall ( 1-ci mərtəbə )",
    phone: "(050) 233 35 04",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.3681, lng: 49.8672 }
  },
  {
    name: "Sumqayıt Mall ( 1-ci mərtəbə )(Bravosuperstore)",
    phone: "(050) 233 35 05",
    hours: "Hər gün 10:00 – 21:00",
    location: { lat: 40.5897, lng: 49.6679 }
  },
  {
    name: "Zefir Mall ( 1-ci mərtəbə )",
    phone: "(050) 233 35 06",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.409, lng: 49.8761 }
  },
  {
    name: "Dəniz Mall ( 5-ci mərtəbə )",
    phone: "(050) 233 35 07",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.409, lng: 49.8761 }
  },
];
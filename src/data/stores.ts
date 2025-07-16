// data/stores.ts
export type Store = {
  name: string;
  address: string;
  hours: string;
  location: {
    lat: number;
    lng: number;
  };
};

export const stores: Store[] = [
  {
    name: "28 mall",
    address: "Füzuli küç. 34, Bakı",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.37906366529173, lng: 49.84677230690917 }
  },
  {
    name: "gənclik mall",
    address: "Fətəli Xan Xoyski 14, Bakı",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.3977, lng: 49.8671 }
  },
  {
    name: "metro park",
    address: "Cəfər Cabbarlı 609, Bakı",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.4072, lng: 49.8751 }
  },
  {
    name: "park bulvar",
    address: "Neftçilər pr. 36, Bakı",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.3703, lng: 49.8515 }
  },
  {
    name: "port baku mall",
    address: "Neftçilər pr. 153, Bakı",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.3681, lng: 49.8672 }
  },
  {
    name: "sumqayıt",
    address: "Sülh küç. 15, Sumqayıt",
    hours: "Hər gün 10:00 – 21:00",
    location: { lat: 40.5897, lng: 49.6679 }
  },
  {
    name: "zefir mall",
    address: "Koroğlu Rəhimov küç. 2A, Bakı",
    hours: "Hər gün 10:00 – 22:00",
    location: { lat: 40.409, lng: 49.8761 }
  }
];
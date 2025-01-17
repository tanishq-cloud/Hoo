import { create } from "zustand";

interface Address {
  street: string;
  suite?: string;
  city: string;
  zipcode?: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase?: string;
  bs?: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone?: string;
  website?: string;
  company: Company;
}

interface ChartData {
  cities: { city: string; users: number }[];
  companies: { company: string; users: number }[];
  geoLocations: { user: string; lat: number; lng: number }[];
}

interface ChartStore {
  chartData: ChartData;
  fetchChartData: () => Promise<void>;
}

export const useChartStore = create<ChartStore>((set) => ({
  chartData: {
    cities: [],
    companies: [],
    geoLocations: [],
  },
  fetchChartData: async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data: User[] = await response.json();

    const cities = data.reduce<{ [key: string]: number }>((acc, user) => {
      acc[user.address.city] = (acc[user.address.city] || 0) + 1;
      return acc;
    }, {});

    const companies = data.reduce<{ [key: string]: number }>((acc, user) => {
      acc[user.company.name] = (acc[user.company.name] || 0) + 1;
      return acc;
    }, {});

    const geoLocations = data.map((user) => ({
      user: user.name,
      lat: parseFloat(user.address.geo.lat),
      lng: parseFloat(user.address.geo.lng),
    }));

    set({
      chartData: {
        cities: Object.entries(cities).map(([city, users]) => ({ city, users })),
        companies: Object.entries(companies).map(([company, users]) => ({
          company,
          users,
        })),
        geoLocations,
      },
    });
  },
}));

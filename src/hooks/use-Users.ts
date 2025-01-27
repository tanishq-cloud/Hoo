import { useQuery } from "@tanstack/react-query";
import axiosClient, { isAxiosError } from "@/utils/axiosClient";

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

export interface UserData {
  cities: { city: string; users: number }[];
  companies: { company: string; users: number }[];
  geoLocations: { user: string; lat: number; lng: number }[];
}

const fetchUserData = async (): Promise<UserData> => {
  try {
    const response = await axiosClient.get<User[]>("/users");
    const { data } = response;

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

    return {
      cities: Object.entries(cities).map(([city, users]) => ({ city, users })),
      companies: Object.entries(companies).map(([company, users]) => ({
        company,
        users,
      })),
      geoLocations,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(`Axios error: ${error.message}`);
      throw new Error(`Failed to fetch user data: ${error.message}`);
    }
    console.error(`Unexpected error: ${error}`);
    throw error;
  }
};

export const useUserData = () => {
  return useQuery<UserData, Error>({
    queryKey: ["userData"],
    queryFn: fetchUserData,
  });
};

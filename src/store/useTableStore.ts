import { create } from "zustand";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface TableState {
  data: Post[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  fetchData: (page: number) => Promise<void>;
}

export const useTableStore = create<TableState>((set) => ({
  data: [],
  currentPage: 1,
  totalPages: 10, 
  isLoading: false,
  fetchData: async (page) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const data = await response.json();
      set({ data, currentPage: page });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

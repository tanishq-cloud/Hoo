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
  hasMore: boolean;
  isLoading: boolean;
  fetchData: (page: number) => Promise<void>;
}

export const useTableStore = create<TableState>((set, get) => ({
  data: [],
  currentPage: 1,
  hasMore: true,
  isLoading: false,
  fetchData: async (page) => {
    if (get().isLoading || !get().hasMore) return;

    set({ isLoading: true });
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const newData: Post[] = await response.json();

      // Update state: append data and check if more pages are available
      set((state) => ({
        data: [...state.data, ...newData],
        currentPage: page,
        hasMore: newData.length > 0, // If no data, no more pages
      }));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

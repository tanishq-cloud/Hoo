import axiosClient from "@/utils/axiosClient";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async ({ pageParam = 1 }): Promise<Post[]> => {
  const response = await axiosClient.get(
    `/posts`,
    {
      params: {
        _page: pageParam,
        _limit: 10,
      },
    }
  );
  return response.data;
};

export const usePosts = () => {
  return useInfiniteQuery<Post[], Error, InfiniteData<Post[]>, string[], number>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    
  });
};
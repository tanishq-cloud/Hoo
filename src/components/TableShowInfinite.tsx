import React, { useEffect, useRef } from "react";
import { usePosts } from "@/hooks/use-Posts";
import { columns } from "@/components/Table/column";
import { DataTable } from "./Table/data-scroll";
import { SkeletonTable } from "./Table/skeletonTable"; 


export const Table: React.FC = () => {
  const { data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,} = usePosts();
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <SkeletonTable columnsCount={4} rowsCount={5} />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4 w-full">
      <DataTable
        columns={columns}
        data={data?.pages.flat() || []} // Flatten pages for the DataTable
      />

      {isFetchingNextPage && (
        <div className="flex justify-center mt-4">
          <SkeletonTable columnsCount={4} rowsCount={5} />
        </div>
      )}

      {/* Infinite scroll trigger */}
      <div ref={observerRef} className="h-4" />
    </div>
  );
};

export default Table;
import React, { useEffect, useRef, useCallback } from "react";
import { useTableStore} from "@/store/useTableStoreInfinite";
import { columns } from "@/components/Table/column";
import { DataTable } from "./Table/data-scroll";
import { SkeletonTable } from "./Table/skeletonTable"; 


export const Table: React.FC = () => {
  const { data, currentPage, isLoading, hasMore, fetchData } = useTableStore();
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Fetch initial data
  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  // Infinite scrolling handler
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        fetchData(currentPage + 1);
      }
    },
    [hasMore, isLoading, currentPage, fetchData]
  );

  useEffect(() => {
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
  }, [handleObserver]);

  return (
    <div className="p-4 w-full">
      <DataTable columns={columns} data={data} />

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <SkeletonTable columnsCount={4} rowsCount={5} />
        </div>
      )}

      {/* Infinite scroll trigger */}
      <div ref={observerRef} className="h-4" />
    </div>
  );
};

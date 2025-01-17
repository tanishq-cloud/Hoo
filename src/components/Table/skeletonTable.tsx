import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface SkeletonTableProps {
  columnsCount: number; 
  rowsCount: number; 
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  columnsCount,
  rowsCount,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columnsCount }).map((_, index) => (
              <TableHead key={index}>
                <Skeleton className="h-[20px] w-[100px] rounded" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowsCount }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columnsCount }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-[20px] w-[150px] rounded" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

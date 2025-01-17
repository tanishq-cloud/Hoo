import { Button } from "../ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { IconArrowUp}from "@tabler/icons-react"

export type Posts= {
  userId: number
  id: number
  title: string
  body: string
}

export const columns: ColumnDef<Posts>[] = [
  {
    accessorKey: "userId",
    header: "User ID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "id",
    cell: (info) => info.getValue(),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <IconArrowUp className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: (info) => info.getValue(),
    filterFn: "includesString", 
  },
  {
    accessorKey: "body",
    header: "Body",
    cell: (info) => info.getValue(),
  },
];

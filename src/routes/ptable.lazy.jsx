import { createLazyFileRoute } from '@tanstack/react-router'
import TablePage from '@/pages/TablePaginationDisplay'

export const Route = createLazyFileRoute('/ptable')({
  component: TablePage,
})

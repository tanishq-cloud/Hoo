import { createLazyFileRoute } from '@tanstack/react-router'
import TableInfinitePage from '@/pages/TableInfiniteDisplay'

export const Route = createLazyFileRoute('/table')({
  component: TableInfinitePage,
})

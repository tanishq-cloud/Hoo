import { createLazyFileRoute } from '@tanstack/react-router'
import ChartDashboard from '@/pages/ChartDisplay'

export const Route = createLazyFileRoute('/charts')({
  component: ChartDashboard,
})

import { useEffect } from "react";
import { Bar, BarChart, Pie, PieChart, Line, LineChart, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useChartStore } from "@/store/useChartStore";
import { useTranslationStore } from "@/store/useTranslation";

const COLORS = ["#2563eb", "#60a5fa", "#34d399", "#f97316", "#e11d48"];

export default function ChartDashboard() {
  const { chartData, fetchChartData } = useChartStore();
  const { translate } = useTranslationStore();

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  const { cities, companies, geoLocations } = chartData;

  const userConfig = {
    users: {
      label: translate("users"),
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold mb-6">{translate("dashboard_title")}</h1>

      {/* Users by City Bar Chart */}
      <div>
        <h2 className="text-xl font-bold mb-4">{translate("users_by_city")}</h2>
        <ChartContainer config={userConfig} className="h-[200px] w-full">
          <BarChart width={600} height={300} data={cities}>
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#60a5fa" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Users by Company Pie Chart */}
      <div>
        <h2 className="text-xl font-bold mb-4">{translate("users_by_company")}</h2>
        <ChartContainer config={userConfig} className="h-[200px] w-full">
          <PieChart width={600} height={300}>
            <Pie
              data={companies}
              dataKey="users"
              nameKey="company"
              outerRadius={100}
              fill="#2563eb"
              label
            >
              {companies.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartContainer>
      </div>

      {/* Geo Location Line Chart */}
      <div>
        <h2 className="text-xl font-bold mb-4">{translate("user_geo_locations")}</h2>
        <ChartContainer config={userConfig} className="h-[200px] w-full">
          <LineChart width={600} height={300} data={geoLocations}>
            <XAxis dataKey="user" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="lat" stroke="#2563eb" />
            <Line type="monotone" dataKey="lng" stroke="#60a5fa" />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}

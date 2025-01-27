import {
  Bar,
  BarChart,
  Pie,
  PieChart,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useTranslationStore } from "@/store/useTranslation";
import { useUserData, UserData } from "@/hooks/use-Users";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const COLORS = ["#2563eb", "#60a5fa", "#34d399", "#f97316", "#e11d48"];

export default function ChartDashboard() {
  const { data, isLoading, isError, error } = useUserData();
  const { translate } = useTranslationStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const { cities, companies, geoLocations } = data as UserData;

  const userConfig = {
    users: {
      label: "users",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold mb-6">
        {translate("dashboard_title")}
      </h1>

      {/* Users by City Bar Chart */}
      <Card>
  <CardHeader>
    <CardTitle>{translate("users_by_city")}</CardTitle>
    <CardDescription>
    {translate("users_by_city_des")}
    </CardDescription>
  </CardHeader>
  <CardContent>
    <ChartContainer config={userConfig} className="h-[200px] w-full">
      <BarChart width={600} height={300} data={cities}>
        <YAxis />
        <XAxis dataKey="city" />
        <Tooltip />
        <Bar dataKey="users" fill="#60a5fa" radius={4} />
      </BarChart>
    </ChartContainer>
  </CardContent>
</Card>


      {/* Users by Company Pie Chart, no legend available with shadcn charts as default. */}
      <Card>
        <CardHeader>
          <CardTitle>{translate("users_by_company")}</CardTitle>
          <CardDescription>
          {translate("users_by_company_des")}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={userConfig} className="h-[350px] w-full">
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
        </CardContent>
      </Card>

      {/* Geo Location Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{translate("user_geo_locations")}</CardTitle>
          <CardDescription>
          {translate("user_geo_locations_des")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={userConfig} className="h-[200px] w-full">
            <LineChart width={600} height={300} data={geoLocations}>
              <XAxis dataKey="user" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="lat" stroke="#2563eb" />
              <Line type="monotone" dataKey="lng" stroke="#60a5fa" />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

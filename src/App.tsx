import TablePage from "@/pages/TableDisplay";
import {
  IconTable,
  IconChartSankey,
  IconTableAlias,
} from "@tabler/icons-react";
import ChartDashboard from "./pages/ChartDisplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableInfinitePage from "./pages/TableInfiniteDisplay";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="/brain.svg" alt="Brain Icon" className="w-10 h-10" />
              <h1 className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
                Hoo
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-600 text-right">
                <div className="font-medium">{formattedTime}</div>
                <div className="text-gray-500">{formattedDate}</div>
              </div>

              <div className="border-l border-gray-200 pl-6">
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-6">
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full grid-cols-3 items-center mb-6">
            <TabsTrigger value="table" className="space-x-2">
              <IconTable className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
              <span>{t("table")}</span>
            </TabsTrigger>
            <TabsTrigger value="charts" className="space-x-2">
              <IconChartSankey className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
              <span>{t("charts")}</span>
            </TabsTrigger>
            <TabsTrigger value="ptable" className="space-x-2">
              <IconTableAlias className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
              <span>{t("table_with_pagination")}</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="table">
            <TableInfinitePage />
          </TabsContent>
          <TabsContent value="charts">
            <ChartDashboard />
          </TabsContent>
          <TabsContent value="ptable">
            <TablePage />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600">{t("footer_text")}</div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <span className="text-sm text-gray-500">© 2025 Hoo.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

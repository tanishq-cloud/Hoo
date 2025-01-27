import { useTranslationStore } from "@/store/useTranslation";
import LanguageSelector from "./components/LanguageSelector";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import DateTimeDisplay from "./components/DateTimeDisplay"; // Import DateTimeDisplay

const router = createRouter({ routeTree });

function App() {
  const { translate } = useTranslationStore();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation Bar 🔨*/}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="/brain.svg" alt="Brain Icon" className="w-10 h-10" />
              <h1 className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
                Hoo {/* ৻(  •̀ ᗜ •́  ৻) */}
              </h1>
            </div>

           
            <div className="flex items-center justify-between space-x-6 w-full sm:w-auto">
              <DateTimeDisplay /> {/* ✨ Using DateTimeDisplay here, so it doesn't re-render the whole App component */}

              <div className="border-l border-gray-200 pl-6 sm:border-0 sm:pl-0">
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main tab content (¬⤙¬ ) */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full">
          <div className="tabs-content">
            <RouterProvider router={router} />
          </div>
        </div>
      </main>

      {/* Footer 🦉*/}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600">{translate("footer_text")}</div>
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

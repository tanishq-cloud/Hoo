import { useTranslationStore } from "@/store/useTranslation";

const Updates = () => {
  const { translate } = useTranslationStore();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{translate("index_title")}</h1>
        
        <div className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold text-gray-700">{translate("zustand_translation")}</h2>
            <p className="text-gray-600">
              {translate("zustand_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700">{translate("react_query_infinite")}</h2>
            <p className="text-gray-600">
              {translate("react_query_infinite_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700">{translate("axios_api")}</h2>
            <p className="text-gray-600">
              {translate("axios_api_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700">{translate("component_architecture")}</h2>
            <p className="text-gray-600">
              {translate("component_architecture_description")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700">{translate("lazy_loading_router")}</h2>
            <p className="text-gray-600">
              {translate("lazy_loading_router_description")}
            </p>
          </section>
        </div>

        <div className="mt-6 text-center">
          <p className="text-lg text-gray-700">{translate("click_to_change_view")}</p>
        </div>
      </div>
    </div>
  );
};

export default Updates;

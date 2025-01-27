import React from "react";
import { Table } from "@/components/TableShowPagination";
import { useTranslationStore } from "@/store/useTranslation";

const TablePage: React.FC = () => {
    const { translate } = useTranslationStore();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">{translate('posts_table')}</h1>
        <Table />
      </div>
    </div>
  );
};

export default TablePage;

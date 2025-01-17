import { create } from "zustand";
import i18n from "@/i18n";

interface TranslationStore {
  language: string;
  setLanguage: (lang: string) => void;
  translate: (key: string) => string;
}

export const useTranslationStore = create<TranslationStore>((set) => ({
  language: i18n.language || "en",
  setLanguage: (lang: string) => {
    i18n.changeLanguage(lang); // Change the i18n language
    set({ language: lang });
  },
  translate: (key: string) => i18n.t(key), // Translate a key using i18n
}));

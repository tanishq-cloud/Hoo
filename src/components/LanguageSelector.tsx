import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslationStore } from "@/store/useTranslation"

function LanguageSelector() {
  const { setLanguage, language } = useTranslationStore();

  const handleChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <div className="flex mx-auto items-center space-x-4">
      <Select onValueChange={handleChange} value={language}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Languages</SelectLabel>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="es">Español</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default LanguageSelector;

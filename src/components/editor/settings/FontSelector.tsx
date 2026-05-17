// Font selector component — renders a list of ATS-safe font options
import type { Font, FontOption } from "../../../types/types";

const fonts: FontOption[] = [
  { value: "Arial", label: "Arial" },
  { value: "Georgia", label: "Georgia" },
  { value: "Inter", label: "Inter" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Verdana", label: "Verdana" },
];

interface FontSelectorProps {
  selected: Font;
  onFontChange: (font: Font) => void;
}

export default function FontSelector({
  selected,
  onFontChange,
}: FontSelectorProps) {
  return (
    <div className="grid gap-2">
      {fonts.map((font) => (
        <button
          key={font.value}
          onClick={() => onFontChange(font.value)}
          className={`p-3 rounded-lg border-2 text-left transition-all cursor-pointer ${
            selected === font.value
              ? "border-amber-500"
              : "border-gray-200 hover:border-gray-300"
          }`}
          style={{ fontFamily: font.value }}
        >
          <span
            className={`text-sm ${selected === font.value ? "text-amber-600" : "text-gray-800"}`}
          >
            {font.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// Color scheme selector component — renders a list of accent color options
import type { ColorScheme, ColorSchemeOption } from "../../../types/types";

const colorSchemes: ColorSchemeOption[] = [
  { value: "emerald", label: "Emerald", color: "bg-emerald-500" },
  { value: "ruby", label: "Ruby", color: "bg-red-500" },
  { value: "sapphire", label: "Sapphire", color: "bg-blue-500" },
  { value: "amber", label: "Amber", color: "bg-amber-500" },
];

interface ColorSchemeSelectorProps {
  selected: ColorScheme;
  onColorChange: (colorScheme: ColorScheme) => void;
}

export default function ColorSchemeSelector({
  selected,
  onColorChange,
}: ColorSchemeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {colorSchemes.map((scheme) => (
        <button
          key={scheme.value}
          onClick={() => onColorChange(scheme.value)}
          className={`p-3 rounded-lg border-2 text-left transition-all cursor-pointer ${
            selected === scheme.value
              ? "text-pink-600"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <p className="mb-2 text-sm text-gray-800">{scheme.label}</p>
          <div className={`h-4 rounded ${scheme.color}`} />
        </button>
      ))}
    </div>
  );
}

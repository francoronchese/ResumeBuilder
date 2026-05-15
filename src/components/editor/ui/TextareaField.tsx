// Reusable textarea field component with label
interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export default function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: TextareaFieldProps) {
  return (
    <div className="grid gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="px-3 py-2 text-sm text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-500 transition-colors resize-none"
      />
    </div>
  );
}
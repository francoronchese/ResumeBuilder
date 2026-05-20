// Reusable form field component with label and input
interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}

export default function FormField({
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  type = "text",
}: FormFieldProps) {
  return (
    <div className="grid gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onBlur?.(e.target.value)}
        placeholder={placeholder}
        className={`px-3 py-2 text-sm text-gray-800 border rounded-lg focus:outline-none transition-colors ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-gray-200 focus:border-gray-500"
        }`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

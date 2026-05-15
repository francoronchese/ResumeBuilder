// Reusable form field component with label and input
interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

export default function FormField({
  label,
  value,
  onChange,
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
        placeholder={placeholder}
        className="px-3 py-2 text-sm text-gray-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-700 transition-colors"
      />
    </div>
  );
}

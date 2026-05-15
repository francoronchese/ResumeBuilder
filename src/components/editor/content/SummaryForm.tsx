// Professional summary form component
interface SummaryFormProps {
  data: string;
  onSummaryChange: (data: string) => void;
}

export default function SummaryForm({
  data,
  onSummaryChange,
}: SummaryFormProps) {
  const maxLength = 500;

  return (
    <div className="grid gap-1">
      <label className="mb-2 text-sm font-medium text-gray-700">
        Write a brief summary of your professional background and key
        qualifications
      </label>
      <textarea
        value={data}
        onChange={(e) => onSummaryChange(e.target.value)}
        placeholder="Senior developer with 5+ years of experience..."
        rows={5}
        maxLength={maxLength}
        className="px-3 py-2 text-sm text-gray-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-700 transition-colors resize-none"
      />
      {/* Character counter */}
      <p className="text-right text-xs text-gray-500">
        {data.length}/{maxLength} characters
      </p>
    </div>
  );
}

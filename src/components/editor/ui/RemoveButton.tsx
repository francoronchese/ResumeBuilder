// Reusable remove button component
import { Trash2 } from "lucide-react";

interface RemoveButtonProps {
  onClick: () => void;
  label?: string;
}

export default function RemoveButton({ onClick, label = "Remove" }: RemoveButtonProps) {
  return (
    <div className="flex justify-end">
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 bg-red-100 hover:text-red-600 hover:bg-red-200 rounded-lg transition-colors cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
        {label}
      </button>
    </div>
  );
}
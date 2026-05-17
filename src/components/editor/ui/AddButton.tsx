// Reusable add button component
interface AddButtonProps {
  onClick: () => void;
  label: string;
}

export default function AddButton({ onClick, label }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2.5 text-sm text-gray-500 border-2 border-dashed border-gray-300 hover:border-emerald-400 hover:text-emerald-600 rounded-lg transition-colors cursor-pointer"
    >
      + {label}
    </button>
  );
}

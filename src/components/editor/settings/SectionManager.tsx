// Section manager component — handles section reordering and visibility toggling
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import type { Section } from "../../../types/types";

interface SortableItemsProps {
  index: number;
  section: Section;
  onToggle: (id: string, enabled: boolean) => void;
}

// Individual draggable section row with toggle switch
function SortableItem({ index, section, onToggle }: SortableItemsProps) {
  // Ref provided by useSortable to enable drag and drop on
  const { ref } = useSortable({ id: section.id, index });

  return (
    <div
      ref={ref}
      className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:bg-emerald-100 transition-all cursor-grab"
    >
      {/* Drag handle */}
      <span className="text-gray-400 cursor-grab">⠿</span>
      <span className="flex-1 text-sm text-gray-800">{section.label}</span>
      {/* Visibility toggle */}
      <button
        onClick={() => onToggle(section.id, !section.enabled)}
        className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${
          section.enabled ? "bg-emerald-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            section.enabled ? "translate-x-0" : "-translate-x-5"
          }`}
        />
      </button>
    </div>
  );
}

interface SectionManagerProps {
  sections: Section[];
  onSectionsChange: (sections: Section[]) => void;
}

export default function SectionManager({
  sections,
  onSectionsChange,
}: SectionManagerProps) {
  // Updates section visibility and notifies parent
  const handleToggle = (id: string, enabled: boolean) => {
    const updated = sections.map((section) =>
      section.id === id ? { ...section, enabled } : section,
    );
    onSectionsChange(updated);
  };

  return (
    <DragDropProvider
      // Reorders sections after drag and notifies parent
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { source } = event.operation;

        if (isSortable(source)) {
          const { initialIndex, index } = source;

          if (initialIndex !== index) {
            // Create a new array and move the dragged item to its new position
            const newItems = [...sections];
            const [removed] = newItems.splice(initialIndex, 1);
            newItems.splice(index, 0, removed);
            onSectionsChange(newItems);
          }
        }
      }}
    >
      <div className="grid gap-2">
        {sections.map((section, index) => (
          <SortableItem
            key={section.id}
            section={section}
            index={index}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </DragDropProvider>
  );
}

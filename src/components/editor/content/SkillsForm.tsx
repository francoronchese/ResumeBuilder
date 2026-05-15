// Skills form component
import { Trash2 } from "lucide-react";
import FormField from "../ui/FormField";
import type { Skill, SkillCategory } from "../../../types/types";

// Available skill categories
const SKILL_CATEGORIES: SkillCategory[] = [
  "Programming Languages",
  "Frameworks & Libraries",
  "Databases",
  "Cloud Services",
  "Tools & DevOps",
  "Soft Skills",
  "Languages",
  "Other",
];

interface SkillsFormProps {
  data: Skill[];
  onSkillsChange: (data: Skill[]) => void;
}

export default function SkillsForm({ data, onSkillsChange }: SkillsFormProps) {
  const handleAdd = () => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: "",
      category: "Programming Languages",
    };
    onSkillsChange([...data, newSkill]);
  };

  const handleRemove = (id: string) => {
    onSkillsChange(data.filter((skill) => skill.id !== id));
  };

  // Merges the updated field into the matching skill entry — keyof Skill ensures field can only be a valid key of the type
  const handleChange = (id: string, field: keyof Skill, value: string) => {
    onSkillsChange(
      data.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill,
      ),
    );
  };

  return (
    <div className="grid gap-4">
      {data.map((skill) => (
        <div
          key={skill.id}
          className="grid gap-3 p-4 border-2 border-gray-200 rounded-lg"
        >
          {/* Skill name */}
          <FormField
            label="Skill Name"
            value={skill.name}
            onChange={(value) => handleChange(skill.id, "name", value)}
            placeholder="TypeScript"
          />

          {/* Category */}
          <div className="grid gap-1">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={skill.category}
              onChange={(e) =>
                handleChange(skill.id, "category", e.target.value)
              }
              className="px-3 py-2 text-sm text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-500 transition-colors"
            >
              {SKILL_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Remove button */}
          <div className="flex justify-end">
            <button
              onClick={() => handleRemove(skill.id)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 bg-red-100 hover:text-red-600 hover:bg-red-200 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Add skill button */}
      <button
        onClick={handleAdd}
        className="w-full py-2.5 text-sm text-gray-500 border-2 border-dashed border-gray-300 hover:border-emerald-400 hover:text-emerald-600 rounded-lg transition-colors cursor-pointer"
      >
        + Add Skill
      </button>
    </div>
  );
}

// Skills form component
import { useState } from "react";
import FormField from "../ui/FormField";
import RemoveButton from "../ui/RemoveButton";
import AddButton from "../ui/AddButton";
import type { Skill } from "../../../lib/schemas";
import { skillSchema } from "../../../lib/schemas";

// Get categories directly from the Zod schema enum
const SKILL_CATEGORIES = skillSchema.shape.category.options;

// Each skill id maps to an optional error string for the name field
type SkillErrors = Record<string, string | undefined>;

interface SkillsFormProps {
  data: Skill[];
  onSkillsChange: (data: Skill[]) => void;
}

export default function SkillsForm({ data, onSkillsChange }: SkillsFormProps) {
  const [errors, setErrors] = useState<SkillErrors>({});

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
    setErrors((prev) => ({ ...prev, [id]: undefined }));
  };

  // Merges the updated field into the matching skill entry — keyof Skill ensures field can only be a valid key of the type
  const handleChange = (id: string, field: keyof Skill, value: string) => {
    onSkillsChange(
      data.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill,
      ),
    );

    if (field === "name" && errors[id]) {
      validate(id, value);
    }
  };

  // Validates the skill name field using the Zod schema on blur —
  // shape accesses the individual field schema, safeParse validates the value
  const validate = (id: string, value: string) => {
    const result = skillSchema.shape.name.safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [id]: result.success ? undefined : result.error.issues[0].message,
    }));
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
            onBlur={(value) => validate(skill.id, value)}
            error={errors[skill.id]}
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
          <RemoveButton onClick={() => handleRemove(skill.id)} />
        </div>
      ))}

      {/* Add skill button */}
      <AddButton onClick={handleAdd} label="Add Skill" />
    </div>
  );
}

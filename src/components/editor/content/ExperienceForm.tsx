// Work experience form component
import { useState } from "react";
import TextareaField from "../ui/TextareaField";
import RemoveButton from "../ui/RemoveButton";
import AddButton from "../ui/AddButton";
import FormField from "../ui/FormField";
import type { WorkExperience } from "../../../lib/schemas";
import { workExperienceSchema } from "../../../lib/schemas";

// Error messages for a single experience entry — each field can have an optional error string
type ExperienceFieldErrors = Partial<Record<keyof WorkExperience, string>>;
// Maps each experience entry by its id to its field errors
type ExperienceErrors = Record<string, ExperienceFieldErrors | undefined>;

interface ExperienceFormProps {
  data: WorkExperience[];
  onExperienceChange: (data: WorkExperience[]) => void;
}

export default function ExperienceForm({
  data,
  onExperienceChange,
}: ExperienceFormProps) {
  const [errors, setErrors] = useState<ExperienceErrors>({});

  const handleAdd = () => {
    const newExperience: WorkExperience = {
      id: `experience-${Date.now()}`,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    onExperienceChange([...data, newExperience]);
  };

  const handleRemove = (id: string) => {
    onExperienceChange(data.filter((exp) => exp.id !== id));
    setErrors((prev) => ({ ...prev, [id]: undefined }));
  };

  // Merges the updated field into the matching experience entry — keyof WorkExperience ensures field can only be a valid key of the type
  const handleChange = (
    id: string,
    field: keyof WorkExperience,
    value: string | boolean,
  ) => {
    onExperienceChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    );

    if (typeof value === "string" && errors[id]?.[field]) {
      validate(id, field, value);
    }
  };

  // Validates a single field using the Zod schema on blur —
  // shape accesses the individual field schema, safeParse validates the value
  const validate = (id: string, field: keyof WorkExperience, value: string) => {
    const result = workExperienceSchema.shape[field].safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: result.success ? undefined : result.error.issues[0].message,
      },
    }));
  };

  return (
    <div className="grid gap-4">
      {data.map((exp) => (
        <div
          key={exp.id}
          className="grid gap-3 p-4 border-2 border-gray-200 rounded-lg"
        >
          {/* Position */}
          <FormField
            label="Position"
            value={exp.position}
            onChange={(value) => handleChange(exp.id, "position", value)}
            onBlur={(value) => validate(exp.id, "position", value)}
            error={errors[exp.id]?.position}
            placeholder="Software Engineer"
          />
          {/* Company */}
          <FormField
            label="Company"
            value={exp.company}
            onChange={(value) => handleChange(exp.id, "company", value)}
            onBlur={(value) => validate(exp.id, "company", value)}
            error={errors[exp.id]?.company}
            placeholder="Acme Inc."
          />
          {/* Location */}
          <FormField
            label="Location"
            value={exp.location}
            onChange={(value) => handleChange(exp.id, "location", value)}
            onBlur={(value) => validate(exp.id, "location", value)}
            error={errors[exp.id]?.location}
            placeholder="City, Country"
          />

          {/* Start Date */}
          <FormField
            label="Start Date"
            value={exp.startDate}
            onChange={(value) => handleChange(exp.id, "startDate", value)}
            onBlur={(value) => validate(exp.id, "startDate", value)}
            error={errors[exp.id]?.startDate}
            placeholder="Jan 2021"
          />
          {/* End Date */}
          {!exp.current && (
            <FormField
              label="End Date"
              value={exp.endDate}
              onChange={(value) => handleChange(exp.id, "endDate", value)}
              placeholder="Jan 2023"
            />
          )}

          {/* Currently working here checkbox */}
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) =>
                handleChange(exp.id, "current", e.target.checked)
              }
              className="w-4 h-4 accent-emerald-500"
            />
            I currently work here
          </label>

          {/* Description */}
          <TextareaField
            label="Description"
            value={exp.description}
            onChange={(value) => handleChange(exp.id, "description", value)}
            onBlur={(value) => validate(exp.id, "description", value)}
            error={errors[exp.id]?.description}
            placeholder="Describe your role and key achievements..."
            rows={4}
          />

          {/* Remove button */}
          <RemoveButton onClick={() => handleRemove(exp.id)} />
        </div>
      ))}

      {/* Add experience button */}
      <AddButton onClick={handleAdd} label="Add Experience" />
    </div>
  );
}

// Work experience form component
import TextareaField from "../ui/TextareaField";
import RemoveButton from "../ui/RemoveButton";
import AddButton from "../ui/AddButton";
import type { WorkExperience } from "../../../types/types";
import FormField from "../ui/FormField";

interface ExperienceFormProps {
  data: WorkExperience[];
  onExperienceChange: (data: WorkExperience[]) => void;
}

export default function ExperienceForm({
  data,
  onExperienceChange,
}: ExperienceFormProps) {
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
            placeholder="Software Engineer"
          />
          {/* Company */}
          <FormField
            label="Company"
            value={exp.company}
            onChange={(value) => handleChange(exp.id, "company", value)}
            placeholder="Acme Inc."
          />
          {/* Location */}
          <FormField
            label="Location"
            value={exp.location}
            onChange={(value) => handleChange(exp.id, "location", value)}
            placeholder="City, Country"
          />

          {/* Start Date */}
          <FormField
            label="Start Date"
            value={exp.startDate}
            onChange={(value) => handleChange(exp.id, "startDate", value)}
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

// Education form component
import { Trash2 } from "lucide-react";
import TextareaField from "../ui/TextareaField";
import type { Education } from "../../../types/types";
import FormField from "../ui/FormField";

interface EducationFormProps {
  data: Education[];
  onEducationChange: (data: Education[]) => void;
}

export default function EducationForm({
  data,
  onEducationChange,
}: EducationFormProps) {
  const handleAdd = () => {
    const newEducation: Education = {
      id: `education-${Date.now()}`,
      institution: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      description: "",
    };
    onEducationChange([...data, newEducation]);
  };

  const handleRemove = (id: string) => {
    onEducationChange(data.filter((edu) => edu.id !== id));
  };

  // Merges the updated field into the matching education entry — keyof Education ensures field can only be a valid key of the type
  const handleChange = (
    id: string,
    field: keyof Education,
    value: string | boolean,
  ) => {
    onEducationChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    );
  };

  return (
    <div className="grid gap-4">
      {data.map((edu) => (
        <div
          key={edu.id}
          className="grid gap-3 p-4 border-2 border-gray-200 rounded-lg"
        >
          {/* Institution */}
          <FormField
            label="Institution"
            value={edu.institution}
            onChange={(value) => handleChange(edu.id, "institution", value)}
            placeholder="MIT"
          />
          {/* Degree */}
          <FormField
            label="Degree"
            value={edu.degree}
            onChange={(value) => handleChange(edu.id, "degree", value)}
            placeholder="Bachelor's Degree"
          />
          {/* Field of Study */}
          <FormField
            label="Field of Study"
            value={edu.fieldOfStudy}
            onChange={(value) => handleChange(edu.id, "fieldOfStudy", value)}
            placeholder="Computer Science"
          />
          {/* Location */}
          <FormField
            label="Location"
            value={edu.location}
            onChange={(value) => handleChange(edu.id, "location", value)}
            placeholder="City, Country"
          />

          {/* Start Date */}
          <FormField
            label="Start Date"
            value={edu.startDate}
            onChange={(value) => handleChange(edu.id, "startDate", value)}
            placeholder="Jan 2021"
          />
          {/* End Date */}
          {!edu.current && (
            <FormField
              label="End Date"
              value={edu.endDate}
              onChange={(value) => handleChange(edu.id, "endDate", value)}
              placeholder="Jan 2023"
            />
          )}

          {/* Currently studying here checkbox */}
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={edu.current}
              onChange={(e) =>
                handleChange(edu.id, "current", e.target.checked)
              }
              className="w-4 h-4 accent-emerald-500"
            />
            I am currently studying here
          </label>

          {/* GPA (optional) */}
          <FormField
            label="GPA (optional)"
            value={edu.gpa ?? ""}
            onChange={(value) => handleChange(edu.id, "gpa", value)}
            placeholder="3.8/4.0"
          />

          {/* Description (optional) */}
          <TextareaField
            label="Description (optional)"
            value={edu.description ?? ""}
            onChange={(value) => handleChange(edu.id, "description", value)}
            placeholder="Relevant coursework, achievements, activities..."
          />

          {/* Remove button */}
          <div className="flex justify-end">
            <button
              onClick={() => handleRemove(edu.id)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 bg-red-100 hover:text-red-600 hover:bg-red-200 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Add education button */}
      <button
        onClick={handleAdd}
        className="w-full py-2.5 text-sm text-gray-500 border-2 border-dashed border-gray-300 hover:border-emerald-400 hover:text-emerald-600 rounded-lg transition-colors cursor-pointer"
      >
        + Add Education
      </button>
    </div>
  );
}

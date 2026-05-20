// Projects form component
import { useState } from "react";
import TextareaField from "../ui/TextareaField";
import RemoveButton from "../ui/RemoveButton";
import AddButton from "../ui/AddButton";
import FormField from "../ui/FormField";
import type { Project } from "../../../lib/schemas";
import { projectSchema } from "../../../lib/schemas";

// Error messages for a single project entry — each field can have an optional error string
type ProjectFieldErrors = Partial<Record<keyof Project, string>>;
// Maps each project entry by its id to its field errors
type ProjectErrors = Record<string, ProjectFieldErrors | undefined>;

interface ProjectsFormProps {
  data: Project[];
  onProjectsChange: (data: Project[]) => void;
}

export default function ProjectsForm({
  data,
  onProjectsChange,
}: ProjectsFormProps) {
  const [errors, setErrors] = useState<ProjectErrors>({});

  const handleAdd = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: "",
      description: "",
      technologies: "",
      url: "",
      startDate: "",
      endDate: "",
    };
    onProjectsChange([...data, newProject]);
  };

  const handleRemove = (id: string) => {
    onProjectsChange(data.filter((project) => project.id !== id));
    setErrors((prev) => ({ ...prev, [id]: undefined }));
  };

  // Merges the updated field into the matching project entry — keyof Project ensures field can only be a valid key of the type
  const handleChange = (id: string, field: keyof Project, value: string) => {
    onProjectsChange(
      data.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    );

    if (errors[id]?.[field]) {
      validate(id, field, value);
    }
  };

  // Validates a single field using the Zod schema on blur —
  // shape accesses the individual field schema, safeParse validates the value
  const validate = (id: string, field: keyof Project, value: string) => {
    const result = projectSchema.shape[field].safeParse(value);
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
      {data.map((project) => (
        <div
          key={project.id}
          className="grid gap-3 p-4 border-2 border-gray-200 rounded-lg"
        >
          {/* Project name */}
          <FormField
            label="Project Name"
            value={project.name}
            onChange={(value) => handleChange(project.id, "name", value)}
            onBlur={(value) => validate(project.id, "name", value)}
            error={errors[project.id]?.name}
            placeholder="My Awesome Project"
          />

          {/* Description */}
          <TextareaField
            label="Description"
            value={project.description}
            onChange={(value) => handleChange(project.id, "description", value)}
            onBlur={(value) => validate(project.id, "description", value)}
            error={errors[project.id]?.description}
            placeholder="A brief description of the project..."
          />

          {/* Technologies */}
          <FormField
            label="Technologies Used"
            value={project.technologies}
            onChange={(value) =>
              handleChange(project.id, "technologies", value)
            }
            onBlur={(value) => validate(project.id, "technologies", value)}
            error={errors[project.id]?.technologies}
            placeholder="React, TypeScript, Tailwind..."
          />

          {/* URL (optional) */}
          <FormField
            label="Project URL (optional)"
            value={project.url ?? ""}
            onChange={(value) => handleChange(project.id, "url", value)}
            placeholder="https://myproject.com"
          />

          {/* Start Date (optional) */}
          <FormField
            label="Start Date (optional)"
            value={project.startDate ?? ""}
            onChange={(value) => handleChange(project.id, "startDate", value)}
            placeholder="Jan 2021"
          />
          {/* End Date (optional) */}
          <FormField
            label="End Date (optional)"
            value={project.endDate ?? ""}
            onChange={(value) => handleChange(project.id, "endDate", value)}
            placeholder="Jan 2023"
          />

          {/* Remove button */}
          <RemoveButton onClick={() => handleRemove(project.id)} />
        </div>
      ))}

      {/* Add project button */}
      <AddButton onClick={handleAdd} label="Add Project" />
    </div>
  );
}

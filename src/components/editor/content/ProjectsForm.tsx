// Projects form component
import { Trash2 } from "lucide-react";
import TextareaField from "../ui/TextareaField";
import type { Project } from "../../../types/types";
import FormField from "../ui/FormField";

interface ProjectsFormProps {
  data: Project[];
  onProjectsChange: (data: Project[]) => void;
}

export default function ProjectsForm({
  data,
  onProjectsChange,
}: ProjectsFormProps) {
  const handleAdd = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: "",
      description: "",
      technologies: "",
      url: "",
      startDate: "",
      endDate: "",
      highlights: "",
    };
    onProjectsChange([...data, newProject]);
  };

  const handleRemove = (id: string) => {
    onProjectsChange(data.filter((project) => project.id !== id));
  };

  // Merges the updated field into the matching project entry — keyof Project ensures field can only be a valid key of the type
  const handleChange = (id: string, field: keyof Project, value: string) => {
    onProjectsChange(
      data.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    );
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
            placeholder="My Awesome Project"
          />

          {/* Description */}
          <TextareaField
            label="Description"
            value={project.description}
            onChange={(value) => handleChange(project.id, "description", value)}
            placeholder="A brief description of the project..."
          />

          {/* Technologies */}
          <FormField
            label="Technologies Used"
            value={project.technologies}
            onChange={(value) =>
              handleChange(project.id, "technologies", value)
            }
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

          {/* Key highlights */}
          <TextareaField
            label="Key Highlights"
            value={project.highlights}
            onChange={(value) => handleChange(project.id, "highlights", value)}
            placeholder="Key achievements and highlights of the project..."
          />

          {/* Remove button */}
          <div className="flex justify-end">
            <button
              onClick={() => handleRemove(project.id)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 bg-red-100 hover:text-red-600 hover:bg-red-200 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Add project button */}
      <button
        onClick={handleAdd}
        className="w-full py-2.5 text-sm text-gray-500 border-2 border-dashed border-gray-300 hover:border-emerald-400 hover:text-emerald-600 rounded-lg transition-colors cursor-pointer"
      >
        + Add Project
      </button>
    </div>
  );
}

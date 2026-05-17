// Projects form component
import TextareaField from "../ui/TextareaField";
import RemoveButton from "../ui/RemoveButton";
import AddButton from "../ui/AddButton";
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

          {/* Remove button */}
          <RemoveButton onClick={() => handleRemove(project.id)} />
        </div>
      ))}

      {/* Add project button */}
      <AddButton onClick={handleAdd} label="Add Project" />
    </div>
  );
}

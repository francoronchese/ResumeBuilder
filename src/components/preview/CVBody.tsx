import type { Section  } from "../../types/types";
import type { WorkExperience, Education, Skill, Project } from "../../lib/schemas";

interface CVBodyProps {
  accentColor: string;
  sections: Section[];
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
}

export default function CVBody({
  accentColor,
  sections,
  summary,
  experience,
  education,
  skills,
  projects,
}: CVBodyProps) {
  // Get unique skill categories — Set removes duplicates, spread converts it back to an array
  const skillCategories = [...new Set(skills.map((skill) => skill.category))];

  return (
    <div className="grid gap-6 px-10 py-8 ">
      {sections
        .filter((section) => section.enabled)
        .map((section) => {
          switch (section.id) {
            case "summary":
              return summary ? (
                <div key={section.id}>
                  <h2
                    className="mb-2 pb-1 text-lg font-semibold border-b-2"
                    style={{ color: accentColor, borderColor: accentColor }}
                  >
                    Professional Summary
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {summary}
                  </p>
                </div>
              ) : null;

            case "experience":
              return experience.length > 0 ? (
                <div key={section.id}>
                  <h2
                    className="mb-3 pb-1 text-lg font-semibold border-b-2"
                    style={{ color: accentColor, borderColor: accentColor }}
                  >
                    Experience
                  </h2>
                  <div className="grid gap-4">
                    {experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {exp.position}
                            </p>
                            <p className="text-sm text-gray-600">
                              {exp.company} • {exp.location}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500 shrink-0">
                            {exp.startDate} -{" "}
                            {exp.current ? "Present" : exp.endDate}
                          </p>
                        </div>
                        {exp.description && (
                          <p className="mt-1 text-sm text-gray-700 leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;

            case "education":
              return education.length > 0 ? (
                <div key={section.id}>
                  <h2
                    className="mb-3 pb-1 text-lg font-semibold border-b-2"
                    style={{ color: accentColor, borderColor: accentColor }}
                  >
                    Education
                  </h2>
                  <div className="grid gap-4">
                    {education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {edu.degree} · {edu.fieldOfStudy}
                            </p>
                            <p className="text-sm text-gray-600">
                              {edu.institution} • {edu.location}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500 shrink-0">
                            {edu.startDate} -{" "}
                            {edu.current ? "Present" : edu.endDate}
                          </p>
                        </div>
                        {edu.gpa && (
                          <p className="mt-1 text-sm text-gray-600">
                            GPA: {edu.gpa}
                          </p>
                        )}
                        {edu.description && (
                          <p className="mt-1 text-sm text-gray-700 leading-relaxed">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;

            case "skills":
              return skills.length > 0 ? (
                <div key={section.id}>
                  <h2
                    className="mb-3 pb-1 text-lg font-semibold border-b-2"
                    style={{ color: accentColor, borderColor: accentColor }}
                  >
                    Skills
                  </h2>
                  <div className="grid gap-3">
                    {skillCategories.map((category) => (
                      <div key={category}>
                        <p className="mb-1 text-sm font-medium text-gray-700">
                          {category}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {skills
                            .filter((skill) => skill.category === category)
                            .map((skill) => (
                              <span
                                key={skill.id}
                                className="px-3 py-1 text-xs rounded-full border"
                                style={{
                                  color: accentColor,
                                  borderColor: accentColor,
                                  /* Semi‑transparent background matching the PDF’s tone */
                                  backgroundColor: `${accentColor}22`, // “22” → ≈ 13% opacity
                                }}
                              >
                                {skill.name}
                              </span>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;

            case "projects":
              return projects.length > 0 ? (
                <div key={section.id}>
                  <h2
                    className="mb-3 pb-1 text-lg font-semibold border-b-2"
                    style={{ color: accentColor, borderColor: accentColor }}
                  >
                    Projects
                  </h2>
                  <div className="grid gap-4">
                    {projects.map((project) => (
                      <div key={project.id}>
                        <div className="flex justify-between items-start">
                          <p className="font-semibold text-gray-900">
                            {project.name}
                          </p>
                          {project.startDate && project.endDate && (
                            <p className="text-sm text-gray-500 shrink-0">
                              {project.startDate} - {project.endDate}
                            </p>
                          )}
                        </div>
                        {project.description && (
                          <p className="mt-1 text-sm text-gray-700 leading-relaxed">
                            {project.description}
                          </p>
                        )}
                        {project.technologies && (
                          <p className="mt-1 text-sm text-gray-500">
                            Technologies: {project.technologies}
                          </p>
                        )}
                        {project.url && (
                          <a
                            href={
                              project.url.startsWith("http")
                                ? project.url
                                : `https://${project.url}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 text-sm hover:underline"
                            style={{ color: accentColor }}
                          >
                            {project.url}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;

            default:
              return null;
          }
        })}
    </div>
  );
}

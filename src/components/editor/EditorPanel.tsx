// Editor panel containing settings and content sections
import {
  CaseSensitive,
  Palette,
  List,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  FolderKanban,
} from "lucide-react";
import { useState } from "react";
import FontSelector from "./settings/FontSelector";
import ColorSchemeSelector from "./settings/ColorSchemeSelector";
import SectionManager from "./settings/SectionManager";
import PersonalInfoForm from "./content/PersonalInfoForm";
import SummaryForm from "./content/SummaryForm";
import ExperienceForm from "./content/ExperienceForm";
import EducationForm from "./content/EducationForm";
import SkillsForm from "./content/SkillsForm";
import ProjectsForm from "./content/ProjectsForm";
import type {
  Font,
  ColorScheme,
  Section,
  PersonalInfo,
  WorkExperience,
  Education,
  Skill,
  Project,
} from "../../types/types";
import { DEFAULT_SECTIONS, DEFAULT_PERSONAL_INFO } from "../../constants";

export default function EditorPanel() {
  const [font, setFont] = useState<Font>("Inter");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("emerald");
  const [sections, setSections] = useState<Section[]>(DEFAULT_SECTIONS);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(
    DEFAULT_PERSONAL_INFO,
  );
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  return (
    <div className="grid gap-6">
      {/* Settings section */}
      <div className="grid gap-4">
        {/* Font selector card */}
        <div className="p-5 rounded-xl border border-gray-300">
          <div className="flex items-center gap-3 mb-4">
            <CaseSensitive className="w-10 h-10 text-amber-600" />
            <h3 className="text-gray-900 text-xl font-medium">Font</h3>
          </div>
          <FontSelector selected={font} onFontChange={setFont} />
        </div>

        {/* Color scheme selector card */}
        <div className="p-5 rounded-xl border border-gray-300">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-10 h-10 text-pink-600" />
            <h3 className="text-gray-900 text-xl font-medium">Color Scheme</h3>
          </div>
          <ColorSchemeSelector
            selected={colorScheme}
            onColorChange={setColorScheme}
          />
        </div>

        {/* Section manager card */}
        <div className="p-5 rounded-xl border border-gray-300">
          <div className="flex items-center gap-3 mb-4">
            <List className="w-10 h-10 text-cyan-600" />
            <h3 className="text-gray-900 text-xl font-medium">Section Order</h3>
          </div>
          <SectionManager sections={sections} onSectionsChange={setSections} />
        </div>
      </div>

      {/* Content section */}
      <div>
        <div className="grid gap-4">
          {/* Personal info card */}
          <div className="p-5 rounded-xl border border-gray-300">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-10 h-10 text-blue-600" />
              <h3 className="text-gray-900 text-xl font-medium">
                Personal Info
              </h3>
            </div>
            <PersonalInfoForm
              data={personalInfo}
              onPersonalInfoChange={setPersonalInfo}
            />
          </div>

          {/* Summary card */}
          <div className="p-5 rounded-xl border border-gray-300">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-10 h-10 text-purple-600" />
              <h3 className="text-gray-900 text-xl font-medium">Summary</h3>
            </div>
            <SummaryForm data={summary} onSummaryChange={setSummary} />
          </div>

          {/* Experience card */}
          <div className="p-5 rounded-xl border border-gray-300">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-10 h-10 text-emerald-600" />
              <h3 className="text-gray-900 text-xl font-medium">Experience</h3>
            </div>
            <ExperienceForm
              data={experience}
              onExperienceChange={setExperience}
            />
          </div>

          {/* Education card */}
          <div className="p-5 rounded-xl border border-gray-300">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-10 h-10 text-indigo-600" />
              <h3 className="text-gray-900 text-xl font-medium">Education</h3>
            </div>
            <EducationForm data={education} onEducationChange={setEducation} />
          </div>

          {/* Skills card */}
          <div className="p-5 rounded-xl border border-gray-300">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-10 h-10 text-orange-600" />
              <h3 className="text-gray-900 text-xl font-medium">Skills</h3>
            </div>
            <SkillsForm data={skills} onSkillsChange={setSkills} />
          </div>

          {/* Projects card */}
          <div className="p-5 rounded-xl border border-gray-300">
            <div className="flex items-center gap-3 mb-4">
              <FolderKanban className="w-10 h-10 text-teal-600" />
              <h3 className="text-gray-900 text-xl font-medium">Projects</h3>
            </div>
            <ProjectsForm data={projects} onProjectsChange={setProjects} />
          </div>
        </div>
      </div>
    </div>
  );
}

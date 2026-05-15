// Shared types used across the application

// Font types
export type Font =
  | "Arial"
  | "Georgia"
  | "Inter"
  | "Times New Roman"
  | "Verdana";

export type FontOption = {
  value: Font;
  label: string;
};

// Color scheme types
export type ColorScheme = "emerald" | "ruby" | "sapphire" | "amber";

export type ColorSchemeOption = {
  value: ColorScheme;
  label: string;
  color: string;
};

// Section types
export type Section = {
  id: string;
  label: string;
  enabled: boolean;
};

// Personal information types
export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
};

// Work experience type
export type WorkExperience = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

// Education type
export type Education = {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  description?: string;
};

// Skill category type
export type SkillCategory =
  | "Programming Languages"
  | "Frameworks & Libraries"
  | "Databases"
  | "Cloud Services"
  | "Tools & DevOps"
  | "Soft Skills"
  | "Languages"
  | "Other";

// Skill type
export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
};

// Project type
export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  highlights: string;
};

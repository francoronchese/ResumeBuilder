// App-wide constants
import type { Section, PersonalInfo } from "./types/types";

export const DEFAULT_SECTIONS: Section[] = [
  { id: "summary", label: "Summary", enabled: true },
  { id: "experience", label: "Experience", enabled: true },
  { id: "education", label: "Education", enabled: true },
  { id: "skills", label: "Skills", enabled: true },
  { id: "projects", label: "Projects", enabled: true },
];

export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  website: "",
};

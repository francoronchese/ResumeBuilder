// Global resume state store with auto-save via localStorage
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  Font,
  ColorScheme,
  Section,
  PersonalInfo,
  WorkExperience,
  Education,
  Skill,
  Project,
} from "../types/types";
import { DEFAULT_SECTIONS, DEFAULT_PERSONAL_INFO } from "../constants";

type ResumeState = {
  font: Font;
  colorScheme: ColorScheme;
  sections: Section[];
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
};

type ResumeActions = {
  setFont: (font: Font) => void;
  setColorScheme: (colorScheme: ColorScheme) => void;
  setSections: (sections: Section[]) => void;
  setPersonalInfo: (personalInfo: PersonalInfo) => void;
  setSummary: (summary: string) => void;
  setExperience: (experience: WorkExperience[]) => void;
  setEducation: (education: Education[]) => void;
  setSkills: (skills: Skill[]) => void;
  setProjects: (projects: Project[]) => void;
};

type ResumeStore = ResumeState & ResumeActions;

export const useResumeStore = create<ResumeStore>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        font: "Inter",
        colorScheme: "emerald",
        sections: DEFAULT_SECTIONS,
        personalInfo: DEFAULT_PERSONAL_INFO,
        summary: "",
        experience: [],
        education: [],
        skills: [],
        projects: [],

        // Actions
        setFont: (font) => set({ font }),
        setColorScheme: (colorScheme) => set({ colorScheme }),
        setSections: (sections) => set({ sections }),
        setPersonalInfo: (personalInfo) => set({ personalInfo }),
        setSummary: (summary) => set({ summary }),
        setExperience: (experience) => set({ experience }),
        setEducation: (education) => set({ education }),
        setSkills: (skills) => set({ skills }),
        setProjects: (projects) => set({ projects }),
      }),
      {
        // Key used to store the state in localStorage
        name: "resume-data",
      },
    ),
  ),
);

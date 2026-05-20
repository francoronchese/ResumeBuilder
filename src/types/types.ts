// Shared types used across the application

// Font types
export type Font = "Inter" | "Arimo" | "Caladea" | "Cabin" | "Merriweather";

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
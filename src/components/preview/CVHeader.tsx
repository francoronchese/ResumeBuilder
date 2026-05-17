import type { PersonalInfo } from "../../types/types";

interface CVHeaderProps {
  personalInfo: PersonalInfo;
  accentColor: string;
}

export default function CVHeader({ personalInfo, accentColor }: CVHeaderProps) {
  return (
    <div className="px-10 py-8" style={{ backgroundColor: accentColor }}>
      <h1 className="text-3xl font-bold text-white mb-1">
        {personalInfo.firstName} {personalInfo.lastName}
      </h1>

      {/* Contact info — line 1: email, phone, location */}
      <div className="flex flex-wrap gap-x-3 text-white text-sm mt-3">
        {personalInfo.email && (
          <a href={`mailto:${personalInfo.email}`} className="hover:underline">
            {personalInfo.email}
          </a>
        )}
        {personalInfo.phone && (
          <>
            <span>|</span>
            <a href={`tel:${personalInfo.phone}`} className="hover:underline">
              {personalInfo.phone}
            </a>
          </>
        )}
        {personalInfo.location && (
          <>
            <span>|</span>
            <span>{personalInfo.location}</span>
          </>
        )}
      </div>

      {/* Contact info — line 2: linkedin, github, website */}
      <div className="flex flex-wrap gap-x-3 text-white text-sm mt-1">
        {personalInfo.linkedin && (
          <a
            href={`https://${personalInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {personalInfo.linkedin}
          </a>
        )}
        {personalInfo.github && (
          <>
            <span>|</span>
            <a
              href={`https://${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {personalInfo.github}
            </a>
          </>
        )}
        {personalInfo.website && (
          <>
            <span>|</span>
            <a
              href={`https://${personalInfo.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {personalInfo.website}
            </a>
          </>
        )}
      </div>
    </div>
  );
}

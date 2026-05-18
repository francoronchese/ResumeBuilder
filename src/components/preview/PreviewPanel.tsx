// Preview panel — displays the live resume preview and download button
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useResumeStore } from "../../store/store";
import CVHeader from "./CVHeader";
import CVBody from "./CVBody";
import ResumePDF from "./ResumePDF";

// Color scheme values for the CV header and accents
const colorValues: Record<string, string> = {
  emerald: "#10b981",
  ruby: "#ef4444",
  sapphire: "#3b82f6",
  amber: "#f59e0b",
};

export default function PreviewPanel() {
  const {
    font,
    colorScheme,
    personalInfo,
    summary,
    experience,
    education,
    skills,
    projects,
    sections,
  } = useResumeStore();

  const accentColor = colorValues[colorScheme];

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl border border-gray-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900">Resume Preview</h2>
        <PDFDownloadLink
          document={
            <ResumePDF
              font={font}
              accentColor={accentColor}
              personalInfo={personalInfo}
              summary={summary}
              experience={experience}
              education={education}
              skills={skills}
              projects={projects}
              sections={sections}
            />
          }
          fileName={`${personalInfo.firstName}_${personalInfo.lastName}_Resume.pdf`.replace(
            /\s+/g,
            "_",
          )}
          className="w-full md:w-auto px-4 py-2 text-sm bg-gray-900 hover:bg-gray-700 text-white rounded-lg transition-colors cursor-pointer"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div>

      {/* CV Preview */}
      <div className="overflow-x-auto">
        <div
          className="min-w-160 border border-gray-200 overflow-hidden"
          style={{ fontFamily: font }}
        >
          {/* CV Header */}
          <CVHeader personalInfo={personalInfo} accentColor={accentColor} />

          {/* CV Body */}
          <CVBody
            accentColor={accentColor}
            sections={sections}
            summary={summary}
            experience={experience}
            education={education}
            skills={skills}
            projects={projects}
          />
        </div>
      </div>
    </div>
  );
}

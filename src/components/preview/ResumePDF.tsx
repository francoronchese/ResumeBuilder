// PDF template — mirrors CVBody styles for consistent output
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import type { Section } from "../../types/types";
import type {
  PersonalInfo,
  WorkExperience,
  Education,
  Skill,
  Project,
} from "../../lib/schemas";

// Register ATS-safe fonts from local files
Font.register({
  family: "Inter",
  src: "/fonts/Inter_24pt-Regular.ttf",
});
Font.register({
  family: "Arimo",
  src: "/fonts/Arimo-Regular.ttf",
});
Font.register({
  family: "Caladea",
  src: "/fonts/Caladea-Regular.ttf",
});
Font.register({
  family: "Cabin",
  src: "/fonts/Cabin-Regular.ttf",
});
Font.register({
  family: "Merriweather",
  src: "/fonts/Merriweather_120pt-Regular.ttf",
});

interface ResumePDFProps {
  font: string;
  accentColor: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  sections: Section[];
}

export default function ResumePDF({
  font,
  accentColor,
  personalInfo,
  summary,
  experience,
  education,
  skills,
  projects,
  sections,
}: ResumePDFProps) {
  // Get unique skill categories — Set removes duplicates, spread converts it back to an array
  const skillCategories = [...new Set(skills.map((skill) => skill.category))];

  const styles = StyleSheet.create({
    page: {
      fontFamily: font,
      backgroundColor: "#ffffff",
      paddingBottom: 32,
    },
    header: {
      backgroundColor: accentColor,
      color: "#ffffff",
      paddingTop: 32,
      paddingBottom: 32,
      paddingLeft: 40,
      paddingRight: 40,
    },
    headerName: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 4,
    },
    headerContact: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 8,
    },
    headerContactText: {
      fontSize: 10,
      color: "#ffffff",
    },
    separator: { fontSize: 10 },
    body: {
      paddingTop: 32,
      paddingBottom: 32,
      paddingLeft: 40,
      paddingRight: 40,
      gap: 24,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: "bold",
      color: accentColor,
      paddingBottom: 4,
      borderBottomWidth: 2,
      borderBottomColor: accentColor,
      borderBottomStyle: "solid",
      marginBottom: 8,
    },
    entryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 2,
    },
    entryTitle: { fontSize: 11, fontWeight: "bold", color: "#111827" },
    entrySubtitle: { fontSize: 10, color: "#4b5563" },
    entryDate: { fontSize: 10, color: "#6b7280" },
    entryDescription: {
      fontSize: 10,
      color: "#374151",
      lineHeight: 1.6,
      marginTop: 4,
    },
    skillCategory: {
      fontSize: 10,
      fontWeight: "bold",
      color: "#374151",
      marginBottom: 4,
    },
    skillTags: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
    skillTag: {
      backgroundColor: `${accentColor}22`,
      borderRadius: 20,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 8,
      paddingRight: 8,
    },
    skillTagText: { fontSize: 9, color: accentColor },
    link: { fontSize: 10, color: accentColor },
  });

  const enabledSections = sections.filter((s) => s.enabled);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Spacer that appears on every page except the first */}
        <View
          fixed
          render={({ pageNumber }) =>
            pageNumber === 1 ? null : <View style={{ paddingTop: 32 }} />
          }
        />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerName}>
            {personalInfo.firstName} {personalInfo.lastName}
          </Text>

          {/* Contact line 1 */}
          <View style={styles.headerContact}>
            {personalInfo.email && (
              <Link
                src={`mailto:${personalInfo.email}`}
                style={{ ...styles.headerContactText, textDecoration: "none" }}
              >
                {personalInfo.email}
              </Link>
            )}
            {personalInfo.phone && (
              <>
                <Text style={styles.separator}>|</Text>
                <Link
                  src={`tel:${personalInfo.phone}`}
                  style={{
                    ...styles.headerContactText,
                    textDecoration: "none",
                  }}
                >
                  {personalInfo.phone}
                </Link>
              </>
            )}
            {personalInfo.location && (
              <>
                <Text style={styles.separator}>|</Text>
                <Text style={styles.headerContactText}>
                  {personalInfo.location}
                </Text>
              </>
            )}
          </View>

          {/* Contact line 2 */}
          <View style={styles.headerContact}>
            {personalInfo.linkedin && (
              <Link
                src={`https://${personalInfo.linkedin}`}
                style={{ ...styles.headerContactText, textDecoration: "none" }}
              >
                {personalInfo.linkedin}
              </Link>
            )}
            {personalInfo.github && (
              <>
                <Text style={styles.headerContactText}>|</Text>
                <Link
                  src={`https://${personalInfo.github}`}
                  style={{
                    ...styles.headerContactText,
                    textDecoration: "none",
                  }}
                >
                  {personalInfo.github}
                </Link>
              </>
            )}
            {personalInfo.website && (
              <>
                <Text style={styles.headerContactText}>|</Text>
                <Link
                  src={`https://${personalInfo.website}`}
                  style={{
                    ...styles.headerContactText,
                    textDecoration: "none",
                  }}
                >
                  {personalInfo.website}
                </Link>
              </>
            )}
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {enabledSections.map((section) => {
            switch (section.id) {
              // Summary
              case "summary":
                return summary ? (
                  <View key={section.id} wrap={false}>
                    <Text style={styles.sectionTitle}>
                      Professional Summary
                    </Text>
                    <Text style={styles.entryDescription}>{summary}</Text>
                  </View>
                ) : null;

              // Experience
              case "experience":
                return experience.length > 0 ? (
                  <View key={section.id}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    {experience.map((exp) => (
                      <View
                        key={exp.id}
                        style={{ marginBottom: 10 }}
                        wrap={false}
                      >
                        <View style={styles.entryRow}>
                          <View>
                            <Text style={styles.entryTitle}>
                              {exp.position}
                            </Text>
                            <Text style={styles.entrySubtitle}>
                              {exp.company} • {exp.location}
                            </Text>
                          </View>
                          <Text style={styles.entryDate}>
                            {exp.startDate} -{" "}
                            {exp.current ? "Present" : exp.endDate}
                          </Text>
                        </View>
                        {exp.description && (
                          <Text style={styles.entryDescription}>
                            {exp.description}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                ) : null;

              // Education
              case "education":
                return education.length > 0 ? (
                  <View key={section.id}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {education.map((edu) => (
                      <View
                        key={edu.id}
                        style={{ marginBottom: 10 }}
                        wrap={false}
                      >
                        <View style={styles.entryRow}>
                          <View>
                            <Text style={styles.entryTitle}>
                              {edu.degree} · {edu.fieldOfStudy}
                            </Text>
                            <Text style={styles.entrySubtitle}>
                              {edu.institution} • {edu.location}
                            </Text>
                          </View>
                          <Text style={styles.entryDate}>
                            {edu.startDate} -{" "}
                            {edu.current ? "Present" : edu.endDate}
                          </Text>
                        </View>
                        {edu.gpa && (
                          <Text style={styles.entryDescription}>
                            GPA: {edu.gpa}
                          </Text>
                        )}
                        {edu.description && (
                          <Text style={styles.entryDescription}>
                            {edu.description}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                ) : null;

              // Skills
              case "skills":
                return skills.length > 0 ? (
                  <View key={section.id}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    {skillCategories.map((category) => (
                      <View
                        key={category}
                        style={{ marginBottom: 8 }}
                        wrap={false}
                      >
                        <Text style={styles.skillCategory}>{category}</Text>
                        <View style={styles.skillTags}>
                          {skills
                            .filter((skill) => skill.category === category)
                            .map((skill) => (
                              <View key={skill.id} style={styles.skillTag}>
                                <Text style={styles.skillTagText}>
                                  {skill.name}
                                </Text>
                              </View>
                            ))}
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null;

              // Projects
              case "projects":
                return projects.length > 0 ? (
                  <View key={section.id}>
                    <Text style={styles.sectionTitle}>Projects</Text>
                    {projects.map((project) => (
                      <View
                        key={project.id}
                        style={{ marginBottom: 10 }}
                        wrap={false}
                      >
                        <View style={styles.entryRow}>
                          <Text style={styles.entryTitle}>{project.name}</Text>
                          {project.startDate && project.endDate && (
                            <Text style={styles.entryDate}>
                              {project.startDate} - {project.endDate}
                            </Text>
                          )}
                        </View>
                        {project.description && (
                          <Text style={styles.entryDescription}>
                            {project.description}
                          </Text>
                        )}
                        {project.technologies && (
                          <Text style={styles.entryDescription}>
                            Technologies: {project.technologies}
                          </Text>
                        )}
                        {project.url && (
                          <Link
                            src={
                              project.url.startsWith("http")
                                ? project.url
                                : `https://${project.url}`
                            }
                            style={{ ...styles.link, textDecoration: "none" }}
                          >
                            {project.url}
                          </Link>
                        )}
                      </View>
                    ))}
                  </View>
                ) : null;

              default:
                return null;
            }
          })}
        </View>
      </Page>
    </Document>
  );
}

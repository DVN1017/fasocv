const COLORS = {
  navy: "#17324D",
  accent: "#2F6F9F",
  accentLight: "#EEF4F8",
  text: "#111827",
  muted: "#64748B",
  line: "#D9E2E8",
  soft: "#F7F9FB",
};

function Filigrane() {
  return (
    <div style={{ position: "absolute", bottom: 14, right: 14, zIndex: 10, display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.94)", border: `1px solid ${COLORS.line}`, borderRadius: 20, padding: "4px 10px", boxShadow: "0 2px 8px rgba(15,23,42,0.08)" }}>
      <span style={{ fontSize: 13 }}>🇧🇫</span>
      <span style={{ fontSize: 9, fontWeight: 800, color: COLORS.navy, letterSpacing: "0.5px" }}>FasoCV</span>
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <div style={{ fontSize: 11.2, fontWeight: 900, letterSpacing: "1.6px", textTransform: "uppercase", color: COLORS.navy, borderBottom: `1px solid ${COLORS.line}`, paddingBottom: 4, marginBottom: 8, fontFamily: "system-ui" }}>
      {title}
    </div>
  );
}

function ProjectList({ projects }) {
  const validProjects = (Array.isArray(projects) ? projects : []).filter(project => project?.name || project?.description);
  if (!validProjects.length) return null;

  return (
    <div style={{ marginBottom: 12 }}>
      <SectionTitle title="Selected Projects" />
      {validProjects.map(project => (
        <div key={project.id} style={{ marginBottom: 9, paddingBottom: 8, borderBottom: `1px solid ${COLORS.line}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
            <div style={{ fontSize: 13.2, fontWeight: 800, color: COLORS.text }}>{project.name || "Project"}</div>
            {project.role && <div style={{ fontSize: 10.5, color: COLORS.accent, fontWeight: 700 }}>{project.role}</div>}
          </div>
          {project.description && <p style={{ fontSize: 11.2, color: COLORS.muted, margin: "2px 0 4px", lineHeight: 1.45 }}>{project.description}</p>}
          {project.technologies?.length > 0 && (
            <div style={{ fontSize: 10.5, color: COLORS.navy, lineHeight: 1.4 }}>
              <strong>Technologies:</strong> {project.technologies.join(" · ")}
            </div>
          )}
          {(project.url || project.githubUrl) && (
            <div style={{ display: "flex", gap: 10, marginTop: 3, fontSize: 9.8, color: COLORS.accent }}>
              {project.url && <span>{project.url.replace(/^https?:\/\//, "")}</span>}
              {project.githubUrl && <span>{project.githubUrl.replace(/^https?:\/\//, "")}</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function TemplateModerne({ cv, avecFiligrane = false }) {
  const { personal, summary, experience, education, skills, languages, projects } = cv;
  const validSkills = skills.filter(s => s);
  const validLanguages = languages.filter(l => l.language);
  const validExperience = experience.filter(e => e.company || e.role);
  const validEducation = education.filter(e => e.institution || e.degree);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", width: "794px", minHeight: "1123px", background: "white", display: "flex", flexDirection: "column", position: "relative", color: COLORS.text }}>
      {avecFiligrane && <Filigrane />}
      <div style={{ borderBottom: `2px solid ${COLORS.navy}`, padding: "22px 30px 17px", position: "relative", flexShrink: 0 }}>
        <div style={{ position: "absolute", bottom: -2, left: 30, width: 70, height: 2, background: COLORS.accent }} />
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          {personal.photo && <img src={personal.photo} alt="Photo" style={{ width: 68, height: 68, borderRadius: "50%", objectFit: "cover", border: `2px solid ${COLORS.line}`, flexShrink: 0 }} />}
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: COLORS.navy }}>{personal.name || "Votre Nom"}</h1>
            <p style={{ fontSize: 11, color: COLORS.accent, margin: "3px 0 8px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 800 }}>{personal.title || "Votre Poste"}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 14px", fontSize: 10.8, color: COLORS.muted }}>
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.location && <span>{personal.location}</span>}
              {personal.website && <span>{personal.website}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "155px 1fr", flex: 1 }}>
        <div style={{ background: COLORS.soft, padding: "16px 12px", borderRight: `1px solid ${COLORS.line}` }}>
          {validSkills.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <SectionTitle title="Technical Skills" />
              {validSkills.map((skill, i) => <div key={i} style={{ fontSize: 10.8, color: COLORS.text, padding: "3px 0", marginBottom: 2, borderBottom: `1px solid ${COLORS.line}` }}>{skill}</div>)}
            </div>
          )}
          {validLanguages.length > 0 && (
            <div>
              <SectionTitle title="Languages" />
              {validLanguages.map(language => (
                <div key={language.id} style={{ marginBottom: 7 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 800, color: COLORS.navy }}>{language.language}</div>
                  <div style={{ fontSize: 10.3, color: COLORS.muted }}>{language.level}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: "16px 20px" }}>
          {summary && <div style={{ marginBottom: 12 }}><SectionTitle title="Professional Summary" /><p style={{ fontSize: 11, color: COLORS.muted, lineHeight: 1.55, margin: 0 }}>{summary}</p></div>}
          {validExperience.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <SectionTitle title="Professional Experience" />
              {validExperience.map(exp => (
                <div key={exp.id} style={{ marginBottom: 9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><div style={{ fontSize: 13, fontWeight: 800, color: COLORS.text }}>{exp.role || "Poste"}</div><div style={{ fontSize: 10.5, color: COLORS.muted }}>{exp.period}</div></div>
                  <div style={{ fontSize: 11.3, color: COLORS.accent, fontWeight: 700, marginBottom: 2 }}>{exp.company}</div>
                  {exp.description && <p style={{ fontSize: 10.9, color: COLORS.muted, margin: 0, lineHeight: 1.45 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          <ProjectList projects={projects} />
          {validEducation.length > 0 && (
            <div>
              <SectionTitle title="Education" />
              {validEducation.map(edu => (
                <div key={edu.id} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><div style={{ fontSize: 12.8, fontWeight: 800, color: COLORS.text }}>{edu.degree || "Diplôme"}</div><div style={{ fontSize: 10.5, color: COLORS.muted }}>{edu.year}</div></div>
                  <div style={{ fontSize: 11.2, color: COLORS.accent, fontWeight: 700 }}>{edu.institution}</div>
                  {edu.description && <p style={{ fontSize: 10.7, color: COLORS.muted, margin: "2px 0 0", lineHeight: 1.4 }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function TemplateEpure({ cv, avecFiligrane = false }) {
  const { personal, summary, experience, education, skills, languages, projects } = cv;
  const validSkills = skills.filter(s => s);
  const validLanguages = languages.filter(l => l.language);
  const validExperience = experience.filter(e => e.company || e.role);
  const validEducation = education.filter(e => e.institution || e.degree);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", width: "794px", minHeight: "1123px", background: "white", padding: "28px 36px", display: "flex", flexDirection: "column", position: "relative", color: COLORS.text }}>
      {avecFiligrane && <Filigrane />}
      <div style={{ height: 2, background: COLORS.navy, borderRadius: 2, marginBottom: 16, flexShrink: 0 }} />
      <div style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${COLORS.line}`, flexShrink: 0 }}>
        {personal.photo && <img src={personal.photo} alt="Photo" style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: `2px solid ${COLORS.line}`, flexShrink: 0 }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 31, fontWeight: 900, letterSpacing: "-0.5px", margin: 0, color: COLORS.navy }}>{personal.name || "Votre Nom"}</h1>
          <p style={{ fontSize: 14, color: COLORS.accent, margin: "3px 0 8px", fontWeight: 800 }}>{personal.title || "Votre Poste"}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 14px", fontSize: 10.8, color: COLORS.muted }}>
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.website && <span>{personal.website}</span>}
          </div>
        </div>
      </div>

      {summary && <div style={{ marginBottom: 12, padding: "8px 10px", background: COLORS.accentLight, borderLeft: `2px solid ${COLORS.accent}`, borderRadius: "0 5px 5px 0", flexShrink: 0 }}><p style={{ fontSize: 10.9, color: "#334155", lineHeight: 1.6, margin: 0 }}>{summary}</p></div>}

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, flex: 1, overflow: "hidden" }}>
        <div>
          {validSkills.length > 0 && <div style={{ marginBottom: 14 }}><SectionTitle title="Technical Skills" /><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{validSkills.map((skill, i) => <span key={i} style={{ fontSize: 10.4, background: COLORS.accentLight, color: COLORS.navy, border: `1px solid ${COLORS.line}`, borderRadius: 3, padding: "3px 6px", fontWeight: 700 }}>{skill}</span>)}</div></div>}
          {validExperience.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <SectionTitle title="Professional Experience" />
              {validExperience.map(exp => (
                <div key={exp.id} style={{ marginBottom: 9, paddingBottom: 9, borderBottom: `1px solid ${COLORS.soft}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><div style={{ fontSize: 13, fontWeight: 800, color: COLORS.text }}>{exp.role || "Poste"}</div><div style={{ fontSize: 10.5, color: COLORS.muted }}>{exp.period}</div></div>
                  <div style={{ fontSize: 11.3, color: COLORS.accent, fontWeight: 700, marginBottom: 2 }}>{exp.company}</div>
                  {exp.description && <p style={{ fontSize: 10.9, color: COLORS.muted, margin: 0, lineHeight: 1.45 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          <ProjectList projects={projects} />
          {validEducation.length > 0 && <div><SectionTitle title="Education" />{validEducation.map(edu => <div key={edu.id} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><div style={{ fontSize: 12.8, fontWeight: 800, color: COLORS.text }}>{edu.degree || "Diplôme"}</div><div style={{ fontSize: 10.5, color: COLORS.muted }}>{edu.year}</div></div><div style={{ fontSize: 11.2, color: COLORS.accent, fontWeight: 700 }}>{edu.institution}</div>{edu.description && <p style={{ fontSize: 10.7, color: COLORS.muted, margin: "2px 0 0", lineHeight: 1.4 }}>{edu.description}</p>}</div>)}</div>}
        </div>
        <div>
          {validLanguages.length > 0 && <div><SectionTitle title="Languages" />{validLanguages.map(language => <div key={language.id} style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 10.5, marginBottom: 6 }}><span style={{ fontWeight: 800, color: COLORS.text }}>{language.language}</span><span style={{ color: COLORS.muted }}>{language.level}</span></div>)}</div>}
        </div>
      </div>
    </div>
  );
}

const BF = {
  rouge: "#EF2B2D",
  rougeFonce: "#c01f21",
  rougeLight: "#fde8e8",
  vert: "#009A44",
  vertFonce: "#007a35",
  vertLight: "#e6f7ed",
  jaune: "#FCD116",
  jauneLight: "#fff9e0",
};

function Filigrane() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 14,
        right: 14,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: "rgba(255,255,255,0.92)",
        border: `1.5px solid ${BF.rouge}33`,
        borderRadius: 20,
        padding: "4px 10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
      }}
    >
      <span style={{ fontSize: 13 }}>🇧🇫</span>
      <span style={{ fontSize: 9, fontWeight: 800, color: BF.rouge, letterSpacing: "0.5px" }}>FasoCV</span>
    </div>
  );
}

function SectionTitle({ title, color = BF.rouge, rich = false }) {
  return (
    <div
      style={{
        fontSize: 11.7,
        fontWeight: rich ? 800 : 900,
        letterSpacing: rich ? "1.8px" : "2px",
        textTransform: "uppercase",
        color,
        borderBottom: rich ? `2px solid ${color}` : "none",
        paddingBottom: rich ? 3 : 0,
        marginBottom: 8,
        fontFamily: "system-ui",
      }}
    >
      {title}
    </div>
  );
}

export function TemplateModerne({ cv, avecFiligrane = false }) {
  const { personal, summary, experience, education, skills, languages } = cv;
  const designRiche = avecFiligrane;

  return (
    <div style={{ fontFamily: "'Georgia', serif", width: "794px", minHeight: "1123px", background: "white", display: "flex", flexDirection: "column", position: "relative" }}>
      {avecFiligrane && <Filigrane />}
      <div
        style={{
          background: designRiche ? `linear-gradient(135deg, ${BF.rouge} 0%, ${BF.rougeFonce} 100%)` : "#ffffff",
          borderBottom: designRiche ? "none" : "1px solid #e5e7eb",
          padding: "22px 30px 18px",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: designRiche ? 4 : 1, background: designRiche ? BF.vert : BF.rouge }} />
        <div style={{ display: "flex", gap: 18, alignItems: "center", position: "relative", zIndex: 1 }}>
          {personal.photo && (
            <img
              src={personal.photo}
              alt="Photo"
              style={{
                width: 68,
                height: 68,
                borderRadius: "50%",
                objectFit: "cover",
                border: designRiche ? "3px solid rgba(255,255,255,0.35)" : "2px solid #e5e7eb",
                flexShrink: 0,
              }}
            />
          )}
          <div style={{ color: designRiche ? "white" : "#111827" }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: designRiche ? "white" : BF.rouge }}>{personal.name || "Votre Nom"}</h1>
            <p style={{ fontSize: 11, opacity: designRiche ? 0.82 : 1, color: designRiche ? "inherit" : "#4b5563", margin: "3px 0 8px", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "system-ui" }}>
              {personal.title || "Votre Poste"}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", fontSize: 12.3, opacity: designRiche ? 0.9 : 1, color: designRiche ? "inherit" : "#6b7280", fontFamily: "system-ui" }}>
              {personal.email && <span>✉ {personal.email}</span>}
              {personal.phone && <span>✆ {personal.phone}</span>}
              {personal.location && <span>⌖ {personal.location}</span>}
              {personal.website && <span>⊕ {personal.website}</span>}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "155px 1fr", flex: 1 }}>
        <div style={{ background: designRiche ? "#f0faf4" : "#ffffff", padding: "16px 12px", borderRight: designRiche ? `2px solid ${BF.vert}22` : "1px solid #e5e7eb", minHeight: "100%" }}>
          {skills.filter((s) => s).length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <SectionTitle title="Compétences" color={BF.vert} rich={designRiche} />
              {skills.filter((s) => s).map((skill, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 12.3,
                    color: designRiche ? "#374151" : BF.vert,
                    background: designRiche ? "white" : "#f8fafc",
                    borderTop: designRiche ? "none" : "1px solid #d1d5db",
                    borderRight: designRiche ? "none" : "1px solid #d1d5db",
                    borderBottom: designRiche ? "none" : "1px solid #d1d5db",
                    borderLeft: `3px solid ${BF.vert}`,
                    padding: "3px 6px",
                    marginBottom: 3,
                    borderRadius: designRiche ? "0 3px 3px 0" : "6px",
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          )}
          {languages.filter((l) => l.language).length > 0 && (
            <div>
              <SectionTitle title="Langues" color={BF.vert} rich={designRiche} />
              {languages.filter((l) => l.language).map((l) => (
                <div key={l.id} style={{ marginBottom: 7 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: designRiche ? BF.vertFonce : "#374151" }}>{l.language}</div>
                  <div style={{ fontSize: 11.7, color: "#6b7280", fontStyle: "italic" }}>{l.level}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ padding: "16px 20px" }}>
          {summary && (
            <div style={{ marginBottom: 12 }}>
              <SectionTitle title="Profil" color={BF.rouge} rich={designRiche} />
              <p style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.6, margin: 0 }}>{summary}</p>
            </div>
          )}
          {experience.filter((e) => e.company || e.role).length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <SectionTitle title="Expérience Professionnelle" color={BF.rouge} rich={designRiche} />
              {experience.filter((e) => e.company || e.role).map((exp) => (
                <div key={exp.id} style={{ marginBottom: 9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 13.7, fontWeight: 700, color: "#111827" }}>{exp.role || "Poste"}</div>
                    <div style={{ fontSize: 11.7, color: "#9ca3af" }}>{exp.period}</div>
                  </div>
                  <div style={{ fontSize: 12.3, color: designRiche ? BF.rouge : "#374151", fontWeight: 600, marginBottom: 2 }}>{exp.company}</div>
                  {exp.description && <p style={{ fontSize: 12.3, color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          {education.filter((e) => e.institution || e.degree).length > 0 && (
            <div>
              <SectionTitle title="Formation" color={BF.rouge} rich={designRiche} />
              {education.filter((e) => e.institution || e.degree).map((edu) => (
                <div key={edu.id} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 13.7, fontWeight: 700, color: "#111827" }}>{edu.degree || "Diplôme"}</div>
                    <div style={{ fontSize: 11.7, color: "#9ca3af" }}>{edu.year}</div>
                  </div>
                  <div style={{ fontSize: 12.3, color: designRiche ? BF.rouge : "#374151", fontWeight: 600 }}>{edu.institution}</div>
                  {edu.description && <p style={{ fontSize: 12.3, color: "#6b7280", margin: "2px 0 0", lineHeight: 1.4 }}>{edu.description}</p>}
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
  const { personal, summary, experience, education, skills, languages } = cv;
  const designRiche = avecFiligrane;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", width: "794px", minHeight: "1123px", background: "white", padding: "28px 36px", display: "flex", flexDirection: "column", position: "relative" }}>
      {avecFiligrane && <Filigrane />}
      <div style={{ height: designRiche ? 4 : 1, background: designRiche ? `linear-gradient(90deg, ${BF.rouge} 33%, ${BF.jaune} 33%, ${BF.jaune} 66%, ${BF.vert} 66%)` : BF.rouge, borderRadius: 3, marginBottom: 16, flexShrink: 0 }} />
      <div style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 14, paddingBottom: 14, borderBottom: designRiche ? `2px solid ${BF.rouge}` : "1px solid #e5e7eb", flexShrink: 0 }}>
        {personal.photo && (
          <img
            src={personal.photo}
            alt="Photo"
            style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: designRiche ? `3px solid ${BF.vert}` : "2px solid #d1d5db", flexShrink: 0 }}
          />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 31.2, fontWeight: 900, letterSpacing: "-0.5px", margin: 0, color: designRiche ? "#0f172a" : BF.rouge }}>{personal.name || "Votre Nom"}</h1>
          <p style={{ fontSize: 14.3, color: BF.rouge, margin: "3px 0 8px", fontWeight: 700 }}>{personal.title || "Votre Poste"}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: 12.3, color: "#64748b" }}>
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.website && <span>{personal.website}</span>}
          </div>
        </div>
      </div>
      {summary && (
        <div style={{ marginBottom: 12, padding: "8px 10px", background: designRiche ? BF.vertLight : "transparent", borderLeft: `2px solid ${BF.vert}`, borderRadius: designRiche ? "0 6px 6px 0" : 0, flexShrink: 0 }}>
          <p style={{ fontSize: 11, color: "#374151", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>{summary}</p>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, flex: 1, overflow: "hidden" }}>
        <div>
          {experience.filter((e) => e.company || e.role).length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <SectionTitle title="Expérience Professionnelle" color={BF.rouge} rich={designRiche} />
              {experience.filter((e) => e.company || e.role).map((exp) => (
                <div key={exp.id} style={{ marginBottom: 9, paddingBottom: 9, borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 13.7, fontWeight: 700, color: "#0f172a" }}>{exp.role || "Poste"}</div>
                    <div style={{ fontSize: 11.7, color: "#94a3b8" }}>{exp.period}</div>
                  </div>
                  <div style={{ fontSize: 12.3, color: designRiche ? BF.rouge : "#374151", fontWeight: 600, marginBottom: 2 }}>{exp.company}</div>
                  {exp.description && <p style={{ fontSize: 12.3, color: "#64748b", margin: 0, lineHeight: 1.5 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          {education.filter((e) => e.institution || e.degree).length > 0 && (
            <div>
              <SectionTitle title="Formation" color={BF.rouge} rich={designRiche} />
              {education.filter((e) => e.institution || e.degree).map((edu) => (
                <div key={edu.id} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 13.7, fontWeight: 700, color: "#0f172a" }}>{edu.degree || "Diplôme"}</div>
                    <div style={{ fontSize: 11.7, color: "#94a3b8" }}>{edu.year}</div>
                  </div>
                  <div style={{ fontSize: 12.3, color: designRiche ? BF.rouge : "#374151", fontWeight: 600 }}>{edu.institution}</div>
                  {edu.description && <p style={{ fontSize: 12.3, color: "#64748b", margin: "2px 0 0", lineHeight: 1.4 }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {skills.filter((s) => s).length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <SectionTitle title="Compétences" color={BF.vert} rich={designRiche} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {skills.filter((s) => s).map((skill, i) => (
                  <span key={i} style={{ fontSize: 11.7, background: designRiche ? BF.vertLight : "#f8fafc", color: BF.vertFonce, border: designRiche ? `1px solid ${BF.vert}33` : "1px solid #d1d5db", borderRadius: 20, padding: "2px 7px", fontWeight: 600 }}>{skill}</span>
                ))}
              </div>
            </div>
          )}
          {languages.filter((l) => l.language).length > 0 && (
            <div>
              <SectionTitle title="Langues" color={BF.vert} rich={designRiche} />
              {languages.filter((l) => l.language).map((l) => (
                <div key={l.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 5 }}>
                  <span style={{ fontWeight: 700, color: "#374151" }}>{l.language}</span>
                  <span style={{ color: "#6b7280", fontSize: 11.7 }}>{l.level}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

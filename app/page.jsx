"use client";
import { useState, useRef, useCallback } from "react";

// ─── COULEURS DU DRAPEAU DU BURKINA FASO ─────────────────────────────────────
const BF = {
  rouge: "#EF2B2D",
  rougeFonce: "#c01f21",
  rougeLight: "#fde8e8",
  vert: "#009A44",
  vertFonce: "#007a35",
  vertLight: "#e6f7ed",
  jaune: "#FCD116",
  jauneLight: "#fff9e0",
  sombre: "#0f1e0a",
};

// ─── ÉTAT INITIAL ─────────────────────────────────────────────────────────────
const EMPTY_CV = {
  personal: { name: "", title: "", phone: "", email: "", location: "", website: "", photo: null },
  summary: "",
  experience: [{ id: 1, company: "", role: "", period: "", description: "" }],
  education: [{ id: 1, institution: "", degree: "", year: "", description: "" }],
  skills: [""],
  languages: [{ id: 1, language: "", level: "Courant" }],
};

const DEMO_CV = {
  personal: { name: "Aminata Sawadogo", title: "Ingénieure Logiciel Senior", phone: "+226 70 12 34 56", email: "aminata@fasocv.bf", location: "Ouagadougou, Burkina Faso", website: "linkedin.com/in/aminata", photo: null },
  summary: "Ingénieure logiciel expérimentée avec plus de 7 ans d'expérience dans le développement d'applications web évolutives. Passionnée par le code propre et la conception centrée sur l'utilisateur. A dirigé des équipes pluridisciplinaires en Afrique de l'Ouest et en Europe.",
  experience: [
    { id: 1, company: "Orange Burkina Faso", role: "Ingénieure Frontend Principale", period: "2021 – Présent", description: "Développement et maintenance d'un portail client desservant plus de 2 millions d'utilisateurs. Réduction du temps de chargement de 40 % grâce à des optimisations de performance. Encadrement d'une équipe de 5 développeurs juniors." },
    { id: 2, company: "Sonatel Sénégal", role: "Développeuse Full Stack", period: "2018 – 2021", description: "Développement d'une architecture microservices pour la plateforme de facturation. Intégration des APIs de mobile money sur 4 marchés en Afrique de l'Ouest." },
  ],
  education: [
    { id: 1, institution: "Université de Ouagadougou", degree: "Master en Informatique", year: "2018", description: "Diplômée avec mention. Thèse sur les systèmes distribués dans les environnements à faible bande passante." },
  ],
  skills: ["React / Next.js", "Node.js", "Python", "PostgreSQL", "Docker", "AWS", "TypeScript", "APIs REST"],
  languages: [
    { id: 1, language: "Français", level: "Langue maternelle" },
    { id: 2, language: "Anglais", level: "Courant" },
    { id: 3, language: "Mooré", level: "Langue maternelle" },
  ],
};

const STEPS = [
  { id: 0, label: "Personnel" },
  { id: 1, label: "Résumé" },
  { id: 2, label: "Expérience" },
  { id: 3, label: "Formation" },
  { id: 4, label: "Compétences" },
  { id: 5, label: "Langues" },
];

const LANG_LEVELS = ["Langue maternelle", "Courant", "Avancé", "Intermédiaire", "Débutant"];

// ─── ICÔNES SVG ───────────────────────────────────────────────────────────────
const Icon = ({ path, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);
const icons = {
  plus: "M12 5v14M5 12h14",
  trash: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  camera: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
};

// ─── COMPOSANTS RÉUTILISABLES ─────────────────────────────────────────────────
const baseInput = { width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 13, color: "#111827", outline: "none", boxSizing: "border-box", background: "white", transition: "border-color 0.2s", fontFamily: "inherit" };

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 }}>{label}</label>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={baseInput}
        onFocus={e => e.target.style.borderColor = BF.vert}
        onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <div>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 }}>{label}</label>}
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        style={{ ...baseInput, resize: "vertical" }}
        onFocus={e => e.target.style.borderColor = BF.vert}
        onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 }}>{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)} style={{ ...baseInput, cursor: "pointer" }}>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

// ─── UPLOAD DE PHOTO ──────────────────────────────────────────────────────────
function PhotoUpload({ photo, onChange }) {
  const fileRef = useRef();
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "16px", background: "#f9fafb", borderRadius: 12, border: "1.5px solid #e5e7eb" }}>
      <div
        onClick={() => fileRef.current.click()}
        style={{ width: 90, height: 90, borderRadius: "50%", cursor: "pointer", border: `3px dashed ${photo ? BF.vert : "#d1d5db"}`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: photo ? "transparent" : "white", flexShrink: 0, transition: "all 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = BF.rouge; e.currentTarget.style.transform = "scale(1.04)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = photo ? BF.vert : "#d1d5db"; e.currentTarget.style.transform = "scale(1)"; }}
      >
        {photo
          ? <img src={photo} alt="Photo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <div style={{ textAlign: "center", color: "#9ca3af" }}><Icon path={icons.camera} size={26} /><div style={{ fontSize: 9, marginTop: 3, fontWeight: 700 }}>PHOTO</div></div>
        }
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#374151", marginBottom: 4 }}>Photo de profil</div>
        <div style={{ fontSize: 11.5, color: "#6b7280", marginBottom: 10, lineHeight: 1.5 }}>Optionnel. Une photo professionnelle améliore votre CV.</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => fileRef.current.click()} style={{ padding: "6px 14px", background: BF.vertLight, border: `1.5px solid ${BF.vert}`, borderRadius: 8, color: BF.vertFonce, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
            📷 {photo ? "Changer" : "Importer une photo"}
          </button>
          {photo && (
            <button onClick={() => onChange(null)} style={{ padding: "6px 12px", background: BF.rougeLight, border: `1.5px solid ${BF.rouge}`, borderRadius: 8, color: BF.rougeFonce, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
              Supprimer
            </button>
          )}
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
    </div>
  );
}

// ─── ÉTAPES DU FORMULAIRE ─────────────────────────────────────────────────────
function StepPersonnel({ cv, update }) {
  const p = cv.personal;
  const upd = (k, v) => update("personal", { ...p, [k]: v });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <PhotoUpload photo={p.photo} onChange={v => upd("photo", v)} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input label="Nom complet *" value={p.name} onChange={v => upd("name", v)} placeholder="Aminata Sawadogo" />
        <Input label="Intitulé du poste" value={p.title} onChange={v => upd("title", v)} placeholder="Ingénieure Logiciel" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input label="E-mail *" value={p.email} onChange={v => upd("email", v)} placeholder="aminata@email.com" type="email" />
        <Input label="Téléphone" value={p.phone} onChange={v => upd("phone", v)} placeholder="+226 70 00 00 00" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input label="Localisation" value={p.location} onChange={v => upd("location", v)} placeholder="Ouagadougou, BF" />
        <Input label="Site web / LinkedIn" value={p.website} onChange={v => upd("website", v)} placeholder="linkedin.com/in/..." />
      </div>
    </div>
  );
}

function StepResume({ cv, update }) {
  return (
    <div>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.7, background: BF.jauneLight, padding: "10px 14px", borderRadius: 8, borderLeft: `4px solid ${BF.jaune}` }}>
        💡 Rédigez un résumé de 2 à 4 phrases présentant votre profil professionnel, vos points forts et vos objectifs.
      </p>
      <Textarea value={cv.summary} onChange={v => update("summary", v)} placeholder="Ingénieur logiciel expérimenté avec plus de 7 ans d'expérience dans le développement d'applications web évolutives..." rows={6} />
    </div>
  );
}

function StepExperience({ cv, update }) {
  const add = () => update("experience", [...cv.experience, { id: Date.now(), company: "", role: "", period: "", description: "" }]);
  const remove = id => update("experience", cv.experience.filter(e => e.id !== id));
  const upd = (id, f, v) => update("experience", cv.experience.map(e => e.id === id ? { ...e, [f]: v } : e));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {cv.experience.map((exp, idx) => (
        <div key={exp.id} style={{ background: "#f9fafb", border: `1.5px solid #e5e7eb`, borderTop: `3px solid ${BF.rouge}`, borderRadius: 10, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 10.5, fontWeight: 800, color: BF.rouge, letterSpacing: "1.5px" }}>EXPÉRIENCE #{idx + 1}</span>
            {cv.experience.length > 1 && <button onClick={() => remove(exp.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Icon path={icons.trash} size={14} /></button>}
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Input label="Entreprise" value={exp.company} onChange={v => upd(exp.id, "company", v)} placeholder="Orange Burkina Faso" />
              <Input label="Poste occupé" value={exp.role} onChange={v => upd(exp.id, "role", v)} placeholder="Développeur Senior" />
            </div>
            <Input label="Période" value={exp.period} onChange={v => upd(exp.id, "period", v)} placeholder="2020 – Présent" />
            <Textarea label="Description" value={exp.description} onChange={v => upd(exp.id, "description", v)} placeholder="Décrivez vos responsabilités et réalisations..." rows={3} />
          </div>
        </div>
      ))}
      <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", border: `1.5px dashed ${BF.vert}`, borderRadius: 8, background: BF.vertLight, color: BF.vertFonce, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
        <Icon path={icons.plus} size={16} /> Ajouter une expérience
      </button>
    </div>
  );
}

function StepFormation({ cv, update }) {
  const add = () => update("education", [...cv.education, { id: Date.now(), institution: "", degree: "", year: "", description: "" }]);
  const remove = id => update("education", cv.education.filter(e => e.id !== id));
  const upd = (id, f, v) => update("education", cv.education.map(e => e.id === id ? { ...e, [f]: v } : e));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {cv.education.map((edu, idx) => (
        <div key={edu.id} style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderTop: `3px solid ${BF.vert}`, borderRadius: 10, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 10.5, fontWeight: 800, color: BF.vert, letterSpacing: "1.5px" }}>FORMATION #{idx + 1}</span>
            {cv.education.length > 1 && <button onClick={() => remove(edu.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Icon path={icons.trash} size={14} /></button>}
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Input label="Établissement" value={edu.institution} onChange={v => upd(edu.id, "institution", v)} placeholder="Université de Ouagadougou" />
              <Input label="Diplôme" value={edu.degree} onChange={v => upd(edu.id, "degree", v)} placeholder="Master en Informatique" />
            </div>
            <Input label="Année d'obtention" value={edu.year} onChange={v => upd(edu.id, "year", v)} placeholder="2018" />
            <Textarea label="Description (optionnel)" value={edu.description} onChange={v => upd(edu.id, "description", v)} placeholder="Mention, sujet de thèse, distinctions obtenues..." rows={2} />
          </div>
        </div>
      ))}
      <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", border: `1.5px dashed ${BF.vert}`, borderRadius: 8, background: BF.vertLight, color: BF.vertFonce, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
        <Icon path={icons.plus} size={16} /> Ajouter une formation
      </button>
    </div>
  );
}

function StepCompetences({ cv, update }) {
  const skills = cv.skills.length ? cv.skills : [""];
  const updateSkill = (i, v) => { const s = [...skills]; s[i] = v; update("skills", s); };
  const add = () => update("skills", [...skills, ""]);
  const remove = i => update("skills", skills.filter((_, idx) => idx !== i));
  return (
    <div>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14, lineHeight: 1.6 }}>Ajoutez vos compétences clés : techniques, professionnelles ou transversales.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {skills.map((skill, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input value={skill} onChange={e => updateSkill(i, e.target.value)} placeholder={`Compétence ${i + 1} (ex : React.js, Gestion de projet…)`}
              style={{ ...baseInput, flex: 1 }}
              onFocus={e => e.target.style.borderColor = BF.vert}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
            {skills.length > 1 && <button onClick={() => remove(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: "6px 8px" }}><Icon path={icons.trash} size={14} /></button>}
          </div>
        ))}
        <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", border: `1.5px dashed ${BF.vert}`, borderRadius: 8, background: BF.vertLight, color: BF.vertFonce, cursor: "pointer", fontSize: 13, fontWeight: 700, marginTop: 4 }}>
          <Icon path={icons.plus} size={16} /> Ajouter une compétence
        </button>
      </div>
    </div>
  );
}

function StepLangues({ cv, update }) {
  const add = () => update("languages", [...cv.languages, { id: Date.now(), language: "", level: "Courant" }]);
  const remove = id => update("languages", cv.languages.filter(l => l.id !== id));
  const upd = (id, f, v) => update("languages", cv.languages.map(l => l.id === id ? { ...l, [f]: v } : l));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {cv.languages.map(lang => (
        <div key={lang.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10, alignItems: "end" }}>
          <Input label="Langue" value={lang.language} onChange={v => upd(lang.id, "language", v)} placeholder="Français" />
          <Select label="Niveau" value={lang.level} onChange={v => upd(lang.id, "level", v)} options={LANG_LEVELS} />
          {cv.languages.length > 1 && <button onClick={() => remove(lang.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", paddingBottom: 4 }}><Icon path={icons.trash} size={14} /></button>}
        </div>
      ))}
      <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", border: `1.5px dashed ${BF.vert}`, borderRadius: 8, background: BF.vertLight, color: BF.vertFonce, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
        <Icon path={icons.plus} size={16} /> Ajouter une langue
      </button>
    </div>
  );
}

// ─── TEMPLATE MODERNE (Bicolore Rouge / Vert) ─────────────────────────────────
function TemplateModerne({ cv }) {
  const { personal, summary, experience, education, skills, languages } = cv;
  const TitleSection = ({ title, color }) => (
    <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color, borderBottom: `2px solid ${color}`, paddingBottom: 4, marginBottom: 10, fontFamily: "system-ui" }}>{title}</div>
  );
  return (
    <div style={{ fontFamily: "'Georgia', serif", width: "210mm", maxWidth: "100%", background: "white", minHeight: "297mm" }}>
      {/* EN-TÊTE ROUGE */}
      <div style={{ background: `linear-gradient(135deg, ${BF.rouge} 0%, ${BF.rougeFonce} 100%)`, padding: "30px 36px 26px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -10, top: -10, fontSize: 180, color: "rgba(255,255,255,0.05)", lineHeight: 1, userSelect: "none" }}>★</div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5, background: BF.vert }} />
        <div style={{ display: "flex", gap: 22, alignItems: "center", position: "relative", zIndex: 1 }}>
          {personal.photo && (
            <img src={personal.photo} alt="Photo" style={{ width: 84, height: 84, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(255,255,255,0.35)", flexShrink: 0 }} />
          )}
          <div style={{ color: "white" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: "-0.5px" }}>{personal.name || "Votre Nom"}</h1>
            <p style={{ fontSize: 12, opacity: 0.82, margin: "5px 0 13px", letterSpacing: "2.5px", textTransform: "uppercase", fontFamily: "system-ui" }}>{personal.title || "Votre Poste"}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: 11, opacity: 0.88, fontFamily: "system-ui" }}>
              {personal.email && <span>✉ {personal.email}</span>}
              {personal.phone && <span>✆ {personal.phone}</span>}
              {personal.location && <span>⌖ {personal.location}</span>}
              {personal.website && <span>⊕ {personal.website}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "175px 1fr", minHeight: "calc(297mm - 128px)" }}>
        {/* COLONNE GAUCHE VERTE */}
        <div style={{ background: "#f0faf4", padding: "22px 16px", borderRight: `3px solid ${BF.vert}22` }}>
          {skills.filter(s => s).length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <TitleSection title="Compétences" color={BF.vert} />
              {skills.filter(s => s).map((skill, i) => (
                <div key={i} style={{ fontSize: 11, color: "#374151", background: "white", borderLeft: `3px solid ${BF.vert}`, padding: "4px 8px", marginBottom: 5, borderRadius: "0 4px 4px 0" }}>{skill}</div>
              ))}
            </div>
          )}
          {languages.filter(l => l.language).length > 0 && (
            <div>
              <TitleSection title="Langues" color={BF.vert} />
              {languages.filter(l => l.language).map(l => (
                <div key={l.id} style={{ marginBottom: 9 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: BF.vertFonce }}>{l.language}</div>
                  <div style={{ fontSize: 10, color: "#6b7280", fontStyle: "italic" }}>{l.level}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* COLONNE DROITE */}
        <div style={{ padding: "22px 26px" }}>
          {summary && (
            <div style={{ marginBottom: 20 }}>
              <TitleSection title="Profil" color={BF.rouge} />
              <p style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.75, margin: 0 }}>{summary}</p>
            </div>
          )}
          {experience.filter(e => e.company || e.role).length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <TitleSection title="Expérience Professionnelle" color={BF.rouge} />
              {experience.filter(e => e.company || e.role).map(exp => (
                <div key={exp.id} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "#111827" }}>{exp.role || "Poste"}</div>
                    <div style={{ fontSize: 10.5, color: "#9ca3af" }}>{exp.period}</div>
                  </div>
                  <div style={{ fontSize: 11.5, color: BF.rouge, fontWeight: 600, marginBottom: 4 }}>{exp.company}</div>
                  {exp.description && <p style={{ fontSize: 11, color: "#6b7280", margin: 0, lineHeight: 1.65 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          {education.filter(e => e.institution || e.degree).length > 0 && (
            <div>
              <TitleSection title="Formation" color={BF.rouge} />
              {education.filter(e => e.institution || e.degree).map(edu => (
                <div key={edu.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "#111827" }}>{edu.degree || "Diplôme"}</div>
                    <div style={{ fontSize: 10.5, color: "#9ca3af" }}>{edu.year}</div>
                  </div>
                  <div style={{ fontSize: 11.5, color: BF.rouge, fontWeight: 600 }}>{edu.institution}</div>
                  {edu.description && <p style={{ fontSize: 11, color: "#6b7280", margin: "4px 0 0", lineHeight: 1.6 }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── TEMPLATE ÉPURÉ ───────────────────────────────────────────────────────────
function TemplateEpure({ cv }) {
  const { personal, summary, experience, education, skills, languages } = cv;
  const S = ({ title, color = BF.rouge }) => (
    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "2.5px", textTransform: "uppercase", color, marginBottom: 10 }}>{title}</div>
  );
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", width: "210mm", maxWidth: "100%", background: "white", padding: "42px 46px", minHeight: "297mm" }}>
      {/* BANNIÈRE TRICOLORE */}
      <div style={{ height: 5, background: `linear-gradient(90deg, ${BF.rouge} 33%, ${BF.jaune} 33%, ${BF.jaune} 66%, ${BF.vert} 66%)`, borderRadius: 3, marginBottom: 24 }} />

      <div style={{ display: "flex", gap: 22, alignItems: "flex-start", marginBottom: 22, paddingBottom: 20, borderBottom: `2px solid ${BF.rouge}` }}>
        {personal.photo && (
          <img src={personal.photo} alt="Photo" style={{ width: 88, height: 88, borderRadius: "50%", objectFit: "cover", border: `3px solid ${BF.vert}`, flexShrink: 0 }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-1px", margin: 0, color: "#0f172a" }}>{personal.name || "Votre Nom"}</h1>
          <p style={{ fontSize: 14, color: BF.rouge, margin: "4px 0 11px", fontWeight: 700 }}>{personal.title || "Votre Poste"}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", fontSize: 11, color: "#64748b" }}>
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.website && <span>{personal.website}</span>}
          </div>
        </div>
      </div>

      {summary && (
        <div style={{ marginBottom: 20, padding: "12px 14px", background: BF.vertLight, borderLeft: `4px solid ${BF.vert}`, borderRadius: "0 8px 8px 0" }}>
          <p style={{ fontSize: 12, color: "#374151", lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>{summary}</p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 28 }}>
        <div>
          {experience.filter(e => e.company || e.role).length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <S title="Expérience Professionnelle" />
              {experience.filter(e => e.company || e.role).map(exp => (
                <div key={exp.id} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "#0f172a" }}>{exp.role || "Poste"}</div>
                    <div style={{ fontSize: 10.5, color: "#94a3b8" }}>{exp.period}</div>
                  </div>
                  <div style={{ fontSize: 11.5, color: BF.rouge, fontWeight: 600, marginBottom: 4 }}>{exp.company}</div>
                  {exp.description && <p style={{ fontSize: 11, color: "#64748b", margin: 0, lineHeight: 1.65 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          {education.filter(e => e.institution || e.degree).length > 0 && (
            <div>
              <S title="Formation" />
              {education.filter(e => e.institution || e.degree).map(edu => (
                <div key={edu.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "#0f172a" }}>{edu.degree || "Diplôme"}</div>
                    <div style={{ fontSize: 10.5, color: "#94a3b8" }}>{edu.year}</div>
                  </div>
                  <div style={{ fontSize: 11.5, color: BF.rouge, fontWeight: 600 }}>{edu.institution}</div>
                  {edu.description && <p style={{ fontSize: 11, color: "#64748b", margin: "4px 0 0", lineHeight: 1.6 }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {skills.filter(s => s).length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <S title="Compétences" color={BF.vert} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {skills.filter(s => s).map((skill, i) => (
                  <span key={i} style={{ fontSize: 10.5, background: BF.vertLight, color: BF.vertFonce, border: `1px solid ${BF.vert}33`, borderRadius: 20, padding: "3px 9px", fontWeight: 600 }}>{skill}</span>
                ))}
              </div>
            </div>
          )}
          {languages.filter(l => l.language).length > 0 && (
            <div>
              <S title="Langues" color={BF.vert} />
              {languages.filter(l => l.language).map(l => (
                <div key={l.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 7 }}>
                  <span style={{ fontWeight: 700, color: "#374151" }}>{l.language}</span>
                  <span style={{ color: "#6b7280", fontSize: 10.5 }}>{l.level}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE D'ACCUEIL ───────────────────────────────────────────────────────────
function Accueil({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(155deg, #0a0f05 0%, #1a1200 45%, ${BF.vertFonce} 100%)`, display: "flex", flexDirection: "column" }}>
      {/* Bande tricolore en haut */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${BF.rouge} 33%, ${BF.jaune} 33%, ${BF.jaune} 66%, ${BF.vert} 66%)` }} />

      <nav style={{ padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", width: 36, height: 36, borderRadius: 8, overflow: "hidden", border: "2px solid rgba(255,255,255,0.15)", flexShrink: 0 }}>
            <div style={{ flex: 1, background: BF.rouge }} />
            <div style={{ flex: 1, background: BF.vert }} />
          </div>
          <span style={{ color: "white", fontWeight: 900, fontSize: 22, letterSpacing: "-0.5px" }}>Faso<span style={{ color: BF.jaune }}>CV</span></span>
        </div>
        <button onClick={onStart} style={{ padding: "8px 20px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 8, color: "white", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
          Commencer →
        </button>
      </nav>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "50px 24px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", background: `${BF.jaune}22`, border: `1px solid ${BF.jaune}44`, borderRadius: 100, marginBottom: 26 }}>
          <span style={{ fontSize: 18 }}>🇧🇫</span>
          <span style={{ fontSize: 11, color: BF.jaune, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>Créateur de CV — Burkina Faso</span>
        </div>

        <h1 style={{ fontSize: "clamp(32px, 5.5vw, 60px)", fontWeight: 900, color: "white", letterSpacing: "-2px", lineHeight: 1.1, margin: "0 0 18px", maxWidth: 680 }}>
          Créez votre CV<br />
          <span style={{ color: BF.jaune }}>professionnel</span> en quelques minutes
        </h1>
        <p style={{ fontSize: "clamp(13px, 1.8vw, 17px)", color: "rgba(255,255,255,0.6)", maxWidth: 500, lineHeight: 1.8, margin: "0 0 40px" }}>
          Plateforme gratuite, simple et élégante pour créer, personnaliser et télécharger votre CV en PDF — sans inscription.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => onStart(false)}
            style={{ padding: "15px 36px", background: `linear-gradient(135deg, ${BF.rouge}, ${BF.rougeFonce})`, border: "none", borderRadius: 12, color: "white", cursor: "pointer", fontSize: 15, fontWeight: 800, boxShadow: `0 16px 36px ${BF.rouge}55`, transition: "transform 0.2s" }}
            onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}>
            Créer mon CV →
          </button>
          <button onClick={() => onStart(true)}
            style={{ padding: "15px 26px", background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.18)", borderRadius: 12, color: "white", cursor: "pointer", fontSize: 15, fontWeight: 600 }}>
            Voir la démo
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))", gap: 12, marginTop: 64, maxWidth: 700, width: "100%" }}>
          {[
            { icon: "⚡", label: "Rapide", desc: "Prêt en moins de 5 min" },
            { icon: "🎨", label: "2 Modèles", desc: "Designs professionnels" },
            { icon: "📷", label: "Photo", desc: "Ajoutez votre portrait" },
            { icon: "📄", label: "Export PDF", desc: "Format A4 imprimable" },
          ].map(f => (
            <div key={f.label} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{f.label}</div>
              <div style={{ color: "rgba(255,255,255,0.42)", fontSize: 11 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "18px", color: "rgba(255,255,255,0.28)", fontSize: 12 }}>
        © 2024 FasoCV • Fait avec ❤️ pour le Burkina Faso 🇧🇫
      </div>
      {/* Bande tricolore en bas */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${BF.rouge} 33%, ${BF.jaune} 33%, ${BF.jaune} 66%, ${BF.vert} 66%)` }} />
    </div>
  );
}

// ─── APPLICATION PRINCIPALE ───────────────────────────────────────────────────
export default function FasoCV() {
  const [screen, setScreen] = useState("home");
  const [cv, setCv] = useState(EMPTY_CV);
  const [step, setStep] = useState(0);
  const [template, setTemplate] = useState("moderne");
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const previewRef = useRef(null);

  const update = useCallback((key, value) => setCv(prev => ({ ...prev, [key]: value })), []);

  const handleStart = (demo = false) => {
    setCv(demo ? DEMO_CV : EMPTY_CV);
    setStep(0);
    setScreen("builder");
  };

  const handleExportPDF = () => {
    const style = document.createElement("style");
    style.textContent = `@media print { body * { visibility: hidden !important; } #cv-print-target, #cv-print-target * { visibility: visible !important; } #cv-print-target { position: fixed !important; left: 0 !important; top: 0 !important; width: 210mm !important; transform: none !important; box-shadow: none !important; } }`;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  if (screen === "home") return <Accueil onStart={handleStart} />;

  const stepForms = [
    <StepPersonnel cv={cv} update={update} />,
    <StepResume cv={cv} update={update} />,
    <StepExperience cv={cv} update={update} />,
    <StepFormation cv={cv} update={update} />,
    <StepCompetences cv={cv} update={update} />,
    <StepLangues cv={cv} update={update} />,
  ];

  const CVTemplate = template === "moderne" ? TemplateModerne : TemplateEpure;

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", flexDirection: "column" }}>
      <style>{`
        @media print { #cv-print-target { display: block !important; } body > * { display: none !important; } body > #cv-print-target { display: block !important; } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
      `}</style>

      {/* Bande tricolore en haut */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${BF.rouge} 33%, ${BF.jaune} 33%, ${BF.jaune} 66%, ${BF.vert} 66%)`, flexShrink: 0 }} />

      {/* En-tête */}
      <header style={{ background: "white", borderBottom: "1px solid #e5e7eb", padding: "0 20px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", flexShrink: 0 }}>
        <button onClick={() => setScreen("home")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ display: "flex", width: 26, height: 26, borderRadius: 6, overflow: "hidden", border: "1.5px solid #e5e7eb" }}>
            <div style={{ flex: 1, background: BF.rouge }} />
            <div style={{ flex: 1, background: BF.vert }} />
          </div>
          <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: "-0.5px", color: "#0f172a" }}>Faso<span style={{ color: BF.rouge }}>CV</span></span>
        </button>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 8, padding: 2, gap: 2 }}>
            {[{ key: "moderne", label: "Moderne" }, { key: "epure", label: "Épuré" }].map(t => (
              <button key={t.key} onClick={() => setTemplate(t.key)} style={{ padding: "5px 12px", fontSize: 11, fontWeight: 700, borderRadius: 6, border: "none", cursor: "pointer", background: template === t.key ? "white" : "transparent", color: template === t.key ? BF.rouge : "#6b7280", boxShadow: template === t.key ? "0 1px 3px rgba(0,0,0,0.1)" : "none", transition: "all 0.15s" }}>
                {t.label}
              </button>
            ))}
          </div>
          <button onClick={() => setShowPreviewMobile(!showPreviewMobile)} style={{ padding: "5px 12px", background: "#f3f4f6", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 600, color: "#374151" }}>
            {showPreviewMobile ? "← Formulaire" : "Aperçu →"}
          </button>
          <button onClick={handleExportPDF} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", background: `linear-gradient(135deg, ${BF.rouge}, ${BF.rougeFonce})`, border: "none", borderRadius: 8, color: "white", cursor: "pointer", fontSize: 12, fontWeight: 700, boxShadow: `0 3px 10px ${BF.rouge}44` }}>
            <Icon path={icons.download} size={13} /> Télécharger PDF
          </button>
        </div>
      </header>

      {/* Grille principale */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, overflow: "hidden", height: "calc(100vh - 58px)" }}>
        {/* Formulaire */}
        <div style={{ display: showPreviewMobile ? "none" : "flex", flexDirection: "column", borderRight: "1px solid #e5e7eb", overflowY: "auto", height: "100%" }}>
          {/* Barre de progression */}
          <div style={{ padding: "12px 20px 0", background: "white", borderBottom: "1px solid #f3f4f6", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              {STEPS.map((s, i) => (
                <button key={s.id} onClick={() => setStep(i)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", flex: 1 }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: i === step ? BF.rouge : i < step ? BF.vertLight : "#f3f4f6", color: i === step ? "white" : i < step ? BF.vert : "#9ca3af", fontSize: 10.5, fontWeight: 800, border: `2px solid ${i === step ? BF.rouge : i < step ? BF.vert : "transparent"}`, transition: "all 0.2s" }}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span style={{ fontSize: 8, fontWeight: 700, color: i === step ? BF.rouge : "#9ca3af", textTransform: "uppercase", letterSpacing: "0.3px" }}>{s.label}</span>
                </button>
              ))}
            </div>
            <div style={{ height: 3, background: "#f3f4f6", borderRadius: 2 }}>
              <div style={{ height: "100%", background: `linear-gradient(90deg, ${BF.rouge}, ${BF.jaune} 50%, ${BF.vert})`, borderRadius: 2, width: `${((step + 1) / STEPS.length) * 100}%`, transition: "width 0.4s ease" }} />
            </div>
          </div>

          {/* Contenu */}
          <div style={{ padding: "20px", flex: 1, overflowY: "auto" }}>
            <h2 style={{ fontSize: 16, fontWeight: 900, color: "#0f172a", margin: "0 0 2px" }}>{STEPS[step].label}</h2>
            <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 16px" }}>Étape {step + 1} sur {STEPS.length}</p>
            {stepForms[step]}
          </div>

          {/* Navigation */}
          <div style={{ padding: "12px 20px", borderTop: "1px solid #f3f4f6", background: "white", display: "flex", justifyContent: "space-between", gap: 10, flexShrink: 0 }}>
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              style={{ padding: "9px 18px", border: "1.5px solid #e5e7eb", borderRadius: 8, background: "white", color: "#374151", cursor: step === 0 ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600, opacity: step === 0 ? 0.35 : 1 }}>
              ← Précédent
            </button>
            {step < STEPS.length - 1
              ? <button onClick={() => setStep(s => s + 1)} style={{ padding: "9px 22px", border: "none", borderRadius: 8, background: `linear-gradient(135deg, ${BF.vert}, ${BF.vertFonce})`, color: "white", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>Suivant →</button>
              : <button onClick={handleExportPDF} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 20px", border: "none", borderRadius: 8, background: `linear-gradient(135deg, ${BF.rouge}, ${BF.rougeFonce})`, color: "white", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                  <Icon path={icons.download} size={14} /> Télécharger PDF
                </button>
            }
          </div>
        </div>

        {/* Aperçu */}
        <div style={{ display: "flex", flexDirection: "column", overflowY: "auto", height: "100%", background: "#dde3ea" }}>
          <div style={{ padding: "9px 16px", background: "white", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#374151", letterSpacing: "1px", textTransform: "uppercase" }}>Aperçu en direct</span>
            <span style={{ fontSize: 10, color: "#9ca3af", background: "#f3f4f6", padding: "2px 8px", borderRadius: 4 }}>Format A4</span>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: "18px 10px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
            <div id="cv-print-target" ref={previewRef} style={{ transform: "scale(0.68)", transformOrigin: "top center", boxShadow: "0 20px 60px rgba(0,0,0,0.28)", borderRadius: 2, marginBottom: -180 }}>
              <CVTemplate cv={cv} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

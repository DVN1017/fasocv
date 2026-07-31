"use client";
import React from "react";
import { Input, Textarea, Select, PhotoUpload } from "./FormFields";
import { Icon } from "./Icons";
import { BF, baseInput } from "./styles";

const LANG_LEVELS = ["Langue maternelle", "Courant", "Avancé", "Intermédiaire", "Débutant"];

export function StepPersonnel({ cv, update }) {
  const p = cv.personal;
  const upd = (k, v) => update("personal", { ...p, [k]: v });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <PhotoUpload photo={p.photo} onChange={v => upd("photo", v)} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Input label="Nom complet *" value={p.name} onChange={v => upd("name", v)} placeholder="Aminata Sawadogo" />
        <Input label="Intitulé du poste" value={p.title} onChange={v => upd("title", v)} placeholder="Ingénieure Logiciel" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Input label="E-mail *" value={p.email} onChange={v => upd("email", v)} placeholder="email@exemple.com" type="email" />
        <Input label="Téléphone" value={p.phone} onChange={v => upd("phone", v)} placeholder="+226 70 00 00 00" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Input label="Localisation" value={p.location} onChange={v => upd("location", v)} placeholder="Ouagadougou, BF" />
        <Input label="Site web / LinkedIn" value={p.website} onChange={v => upd("website", v)} placeholder="linkedin.com/in/..." />
      </div>
    </div>
  );
}

export function StepResume({ cv, update }) {
  return (
    <div>
      <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 14, lineHeight: 1.6, background: BF.jauneLight, padding: "10px 12px", borderRadius: 8, borderLeft: `4px solid ${BF.rouge}` }}>
        💡 Rédigez 2 à 4 phrases présentant votre profil, vos points forts et objectifs.
      </p>
      <Textarea value={cv.summary} onChange={v => update("summary", v)} placeholder="Ingénieur logiciel expérimenté avec plus de 7 ans d'expérience..." rows={6} />
    </div>
  );
}

export function StepExperience({ cv, update }) {
  const add = () => update("experience", [...cv.experience, { id: Date.now(), company: "", role: "", period: "", description: "" }]);
  const remove = id => update("experience", cv.experience.filter(e => e.id !== id));
  const upd = (id, f, v) => update("experience", cv.experience.map(e => e.id === id ? { ...e, [f]: v } : e));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {cv.experience.map((exp, idx) => (
        <div key={exp.id} style={{ background: "#f9fafb", borderTop: `3px solid ${BF.rouge}`, borderRight: "1.5px solid #e5e7eb", borderBottom: "1.5px solid #e5e7eb", borderLeft: "1.5px solid #e5e7eb", borderRadius: 10, padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: BF.rouge, letterSpacing: "1px" }}>EXPÉRIENCE #{idx + 1}</span>
            {cv.experience.length > 1 && <button onClick={() => remove(exp.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Icon path="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" size={14} /></button>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <Input label="Entreprise" value={exp.company} onChange={v => upd(exp.id, "company", v)} placeholder="Orange Burkina" />
              <Input label="Poste" value={exp.role} onChange={v => upd(exp.id, "role", v)} placeholder="Développeur" />
            </div>
            <Input label="Période" value={exp.period} onChange={v => upd(exp.id, "period", v)} placeholder="2020 – Présent" />
            <Textarea label="Description" value={exp.description} onChange={v => upd(exp.id, "description", v)} placeholder="Vos responsabilités et réalisations..." rows={3} />
          </div>
        </div>
      ))}
      <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", border: `1.5px dashed ${BF.vert}`, borderRadius: 8, background: BF.vertLight, color: BF.vertFonce, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
        <Icon path="M12 5v14M5 12h14" size={15} /> Ajouter une expérience
      </button>
    </div>
  );
}

export function StepFormation({ cv, update }) {
  const add = () => update("education", [...cv.education, { id: Date.now(), institution: "", degree: "", year: "", description: "" }]);
  const remove = id => update("education", cv.education.filter(e => e.id !== id));
  const upd = (id, f, v) => update("education", cv.education.map(e => e.id === id ? { ...e, [f]: v } : e));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {cv.education.map((edu, idx) => (
        <div key={edu.id} style={{ background: "#f9fafb", borderTop: `3px solid ${BF.vert}`, borderRight: "1.5px solid #e5e7eb", borderBottom: "1.5px solid #e5e7eb", borderLeft: "1.5px solid #e5e7eb", borderRadius: 10, padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: BF.vert, letterSpacing: "1px" }}>FORMATION #{idx + 1}</span>
            {cv.education.length > 1 && <button onClick={() => remove(edu.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Icon path="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" size={14} /></button>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <Input label="Établissement" value={edu.institution} onChange={v => upd(edu.id, "institution", v)} placeholder="Université de Ouaga" />
              <Input label="Diplôme" value={edu.degree} onChange={v => upd(edu.id, "degree", v)} placeholder="Master Informatique" />
            </div>
            <Input label="Année" value={edu.year} onChange={v => upd(edu.id, "year", v)} placeholder="2018" />
            <Textarea label="Description (optionnel)" value={edu.description} onChange={v => upd(edu.id, "description", v)} placeholder="Mention, distinctions..." rows={2} />
          </div>
        </div>
      ))}
      <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", border: `1.5px dashed ${BF.vert}`, borderRadius: 8, background: BF.vertLight, color: BF.vertFonce, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
        <Icon path="M12 5v14M5 12h14" size={15} /> Ajouter une formation
      </button>
    </div>
  );
}

export function StepCompetences({ cv, update }) {
  const skills = cv.skills.length ? cv.skills : [""];
  const updateSkill = (i, v) => { const s = [...skills]; s[i] = v; update("skills", s); };
  const add = () => update("skills", [...skills, ""]);
  const remove = i => update("skills", skills.filter((_, idx) => idx !== i));

  return (
    <div>
      <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 12, lineHeight: 1.5 }}>Ajoutez vos compétences clés.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {skills.map((skill, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              value={skill}
              onChange={e => updateSkill(i, e.target.value)}
              placeholder={`Compétence ${i + 1}`}
              style={{ ...baseInput, flex: 1 }}
              onFocus={e => e.target.style.borderColor = BF.vert}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"}
            />
            {skills.length > 1 && <button onClick={() => remove(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Icon path="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" size={14} /></button>}
          </div>
        ))}
        <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", border: `1.5px dashed ${BF.vert}`, borderRadius: 8, background: BF.vertLight, color: BF.vertFonce, cursor: "pointer", fontSize: 12, fontWeight: 700, marginTop: 4 }}>
          <Icon path="M12 5v14M5 12h14" size={15} /> Ajouter une compétence
        </button>
      </div>
    </div>
  );
}

export function StepLangues({ cv, update }) {
  const add = () => update("languages", [...cv.languages, { id: Date.now(), language: "", level: "Courant" }]);
  const remove = id => update("languages", cv.languages.filter(l => l.id !== id));
  const upd = (id, f, v) => update("languages", cv.languages.map(l => l.id === id ? { ...l, [f]: v } : l));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {cv.languages.map(lang => (
        <div key={lang.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, alignItems: "end" }}>
          <Input label="Langue" value={lang.language} onChange={v => upd(lang.id, "language", v)} placeholder="Français" />
          <Select label="Niveau" value={lang.level} onChange={v => upd(lang.id, "level", v)} options={LANG_LEVELS} />
          {cv.languages.length > 1 && <button onClick={() => remove(lang.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", paddingBottom: 4 }}><Icon path="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" size={14} /></button>}
        </div>
      ))}
      <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", border: `1.5px dashed ${BF.vert}`, borderRadius: 8, background: BF.vertLight, color: BF.vertFonce, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
        <Icon path="M12 5v14M5 12h14" size={15} /> Ajouter une langue
      </button>
    </div>
  );
}

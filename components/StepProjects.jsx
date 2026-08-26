"use client";
import React from "react";
import { Input, Textarea } from "./FormFields";
import { Icon } from "./Icons";

function createProject() {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: "",
    description: "",
    technologies: [],
    url: "",
    githubUrl: "",
    role: "",
  };
}

const TEST_PROJECTS = [
  {
    id: "fasocv",
    name: "FasoCV",
    description: "Online CV builder allowing users to create, customize and export professional resumes.",
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "HTML2Canvas"],
    url: "",
    githubUrl: "",
    role: "Full Stack Developer",
  },
  {
    id: "colispro",
    name: "ColisPro",
    description: "Parcel tracking platform designed for transport companies, including QR-based tracking and multi-agency management.",
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL/Supabase", "QR Code"],
    url: "",
    githubUrl: "",
    role: "Full Stack Developer",
  },
  {
    id: "flexisave",
    name: "FlexiSave",
    description: "Web application for setting, tracking and managing personal savings goals.",
    technologies: ["Next.js", "React", "TypeScript", "Supabase"],
    url: "",
    githubUrl: "",
    role: "Full Stack Developer",
  },
];

const iconButton = {
  width: 26,
  height: 26,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  border: "1px solid #dbe3ea",
  borderRadius: 6,
  background: "white",
  color: "#17324d",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 800,
};

export function StepProjects({ cv, update }) {
  const projects = Array.isArray(cv.projects) ? cv.projects : [];

  const add = () => update("projects", [...projects, createProject()]);
  const loadTestProjects = () => update("projects", TEST_PROJECTS.map(project => ({ ...project })));
  const remove = (id) => update("projects", projects.filter(project => project.id !== id));
  const updateProject = (id, field, value) => {
    update("projects", projects.map(project => project.id === id ? { ...project, [field]: value } : project));
  };
  const move = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= projects.length) return;
    const next = [...projects];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    update("projects", next);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20, paddingTop: 18, borderTop: "1px solid #e5e7eb" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div>
            <h3 style={{ margin: 0, color: "#17324d", fontSize: 15, fontWeight: 900 }}>Projects / Selected Projects</h3>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 11, lineHeight: 1.5 }}>
              Ajoutez vos projets les plus pertinents pour une candidature. Ils apparaîtront automatiquement dans le CV.
            </p>
          </div>
          <span style={{ flexShrink: 0, fontSize: 10, fontWeight: 800, color: "#64748b" }}>{projects.length} projet{projects.length > 1 ? "s" : ""}</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button type="button" onClick={add} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "9px 13px", border: "1.5px solid #2F6F9F", borderRadius: 8, background: "#EEF4F8", color: "#17324d", cursor: "pointer", fontSize: 11, fontWeight: 800 }}>
          <Icon path="M12 5v14M5 12h14" size={14} /> Ajouter un projet
        </button>
        <button type="button" onClick={loadTestProjects} style={{ padding: "9px 13px", border: "1px solid #dbe3ea", borderRadius: 8, background: "white", color: "#475569", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>
          Charger mes 3 projets de test
        </button>
      </div>

      {projects.map((project, index) => (
        <div key={project.id} style={{ background: "#f8fafc", border: "1px solid #dbe3ea", borderRadius: 10, padding: 13 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 900, color: "#17324d", letterSpacing: "1px" }}>PROJECT #{index + 1}</span>
            <div style={{ display: "flex", gap: 3 }}>
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Monter le projet" style={{ ...iconButton, opacity: index === 0 ? 0.35 : 1 }}>↑</button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === projects.length - 1} aria-label="Descendre le projet" style={{ ...iconButton, opacity: index === projects.length - 1 ? 0.35 : 1 }}>↓</button>
              <button type="button" onClick={() => remove(project.id)} aria-label="Supprimer le projet" style={{ ...iconButton, color: "#b91c1c" }}>
                <Icon path="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1 1v2" size={13} />
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Input label="Project name *" value={project.name} onChange={value => updateProject(project.id, "name", value)} placeholder="FasoCV" />
            <Textarea label="Short description *" value={project.description} onChange={value => updateProject(project.id, "description", value)} placeholder="Describez brièvement le projet, son objectif et son impact..." rows={3} />
            <Input label="Technologies / Tech stack" value={project.technologies.join(", ")} onChange={value => updateProject(project.id, "technologies", value.split(",").map(item => item.trim()).filter(Boolean))} placeholder="Next.js, React, TypeScript, Supabase" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <Input label="Project URL (optionnel)" value={project.url || ""} onChange={value => updateProject(project.id, "url", value)} placeholder="https://monprojet.com" type="url" />
              <Input label="GitHub URL (optionnel)" value={project.githubUrl || ""} onChange={value => updateProject(project.id, "githubUrl", value)} placeholder="https://github.com/..." type="url" />
            </div>
            <Input label="Role / Contribution (optionnel)" value={project.role || ""} onChange={value => updateProject(project.id, "role", value)} placeholder="Full Stack Developer" />
          </div>
        </div>
      ))}
    </div>
  );
}

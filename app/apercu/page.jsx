import React from "react";
import { LogoBF } from "@/components/Accueil";
import AuthActions from "@/components/AuthActions";
import { TemplateModerne } from "@/components/CvTemplates";

const demoCv = {
  personal: { name: "Aminata Sawadogo", title: "Ingénieure Logiciel Senior", phone: "+226 70 12 34 56", email: "aminata@fasocv.bf", location: "Ouagadougou, Burkina Faso", website: "linkedin.com/in/aminata", photo: null },
  summary: "Ingénieure logiciel expérimentée avec plus de 7 ans d'expérience dans le développement d'applications web évolutables.",
  experience: [
    { id: 1, company: "Orange Burkina Faso", role: "Ingénieure Frontend Principale", period: "2021 – Présent", description: "Développement et maintenance d'un portail client desservant plus de 2 millions d'utilisateurs." },
    { id: 2, company: "Sonatel Sénégal", role: "Développeuse Full Stack", period: "2018 – 2021", description: "Développement d'une architecture microservices pour la plateforme de facturation." },
  ],
  education: [{ id: 1, institution: "Université de Ouagadougou", degree: "Master en Informatique", year: "2018", description: "Diplômée avec mention." }],
  skills: ["React / Next.js", "Node.js", "Python", "PostgreSQL"],
  languages: [{ id: 1, language: "Français", level: "Langue maternelle" }, { id: 2, language: "Anglais", level: "Courant" }],
};

export default function ApercuPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 20, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LogoBF size={32} />
          <span style={{ fontSize: 22, fontWeight: 900, color: "#111827" }}>Faso<span style={{ color: "#FCD116" }}>CV</span></span>
        </div>
        <AuthActions compact />
      </header>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "210mm", boxShadow: "0 20px 60px rgba(0,0,0,0.28)" }}>
          <TemplateModerne cv={demoCv} />
        </div>
      </div>
    </div>
  );
}

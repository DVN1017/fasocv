import React from "react";
import { LogoBF } from "@/components/Accueil";
import AuthActions from "@/components/AuthActions";

const CHARIOW = {
  sixMois: "https://jevxiiyn.mychariow.shop/prd_wk62ty",
  unAn: "https://jevxiiyn.mychariow.shop/prd_lthl6f",
};

const BF = {
  rouge: "#EF2B2D",
  rougeFonce: "#c01f21",
  jaune: "#FCD116",
  vert: "#009A44",
  vertFonce: "#007a35",
};

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(155deg, #0a0f05 0%, #1a1200 45%, ${BF.vertFonce} 100%)`, display: "flex", flexDirection: "column" }}>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${BF.rouge} 33%, ${BF.jaune} 33%, ${BF.jaune} 66%, ${BF.vert} 66%)` }} />
      <nav style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 8, color: "white", cursor: "pointer", fontSize: 16.9, fontWeight: 600, padding: "7px 14px", textDecoration: "none" }}>
          ← Retour
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LogoBF size={28} />
          <span style={{ color: "white", fontWeight: 900, fontSize: 23.4 }}>Faso<span style={{ color: BF.jaune }}>CV</span></span>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <AuthActions compact />
        </div>
      </nav>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "30px 20px" }}>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 900, color: "white", textAlign: "center", margin: "0 0 8px" }}>
          Passe en <span style={{ color: BF.jaune }}>Premium</span>
        </h1>
        <p style={{ fontSize: 18.2, color: "rgba(255,255,255,0.55)", marginBottom: 36, textAlign: "center" }}>
          Téléchargements illimités, sans filigrane, 2 templates pro
        </p>
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "16px 20px", marginBottom: 30, maxWidth: 420, width: "100%" }}>
          {[
            "✅ 2 templates professionnels (Moderne + Épuré)",
            "✅ Photo de profil sur ton CV",
            "✅ PDF illimité sans filigrane",
            "✅ Paiement sécurisé Wave & Orange Money",
          ].map((item, i) => (
            <div key={i} style={{ fontSize: 16.9, color: "rgba(255,255,255,0.8)", marginBottom: i < 3 ? 10 : 0 }}>{item}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 420, width: "100%" }}>
          <a href={CHARIOW.sixMois} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ background: "rgba(255,255,255,0.06)", border: `2px solid ${BF.vert}`, borderRadius: 14, padding: "20px 14px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: 14.3, color: "rgba(255,255,255,0.5)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "1px" }}>6 Mois</div>
              <div style={{ fontSize: 36.4, fontWeight: 900, color: BF.vert }}>600 <span style={{ fontSize: 16.9 }}>FCFA</span></div>
              <div style={{ fontSize: 14.3, color: "rgba(255,255,255,0.35)", margin: "4px 0 14px" }}>~100 FCFA/mois</div>
              <div style={{ padding: "9px", background: BF.vert, borderRadius: 8, color: "white", fontSize: 16.9, fontWeight: 700 }}>Choisir →</div>
            </div>
          </a>
          <a href={CHARIOW.unAn} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ background: "rgba(255,255,255,0.06)", border: `2px solid ${BF.jaune}`, borderRadius: 14, padding: "20px 14px", textAlign: "center", cursor: "pointer", position: "relative" }}>
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: BF.jaune, color: "#000", fontSize: 11.7, fontWeight: 800, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>MEILLEURE OFFRE</div>
              <div style={{ fontSize: 14.3, color: "rgba(255,255,255,0.5)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "1px" }}>1 An</div>
              <div style={{ fontSize: 36.4, fontWeight: 900, color: BF.jaune }}>1000 <span style={{ fontSize: 16.9 }}>FCFA</span></div>
              <div style={{ fontSize: 14.3, color: "rgba(255,255,255,0.35)", margin: "4px 0 14px" }}>~83 FCFA/mois</div>
              <div style={{ padding: "9px", background: BF.jaune, borderRadius: 8, color: "#000", fontSize: 16.9, fontWeight: 700 }}>Choisir →</div>
            </div>
          </a>
        </div>
        <a href="/" style={{ marginTop: 24, fontSize: 15.6, color: "rgba(255,255,255,0.35)", textDecoration: "underline" }}>
          Continuer en gratuit
        </a>
      </div>
      <div style={{ textAlign: "center", padding: "16px", color: "rgba(255,255,255,0.2)", fontSize: 14.3 }}>
        © 2025 FasoCV — Tous droits réservés
      </div>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${BF.rouge} 33%, ${BF.jaune} 33%, ${BF.jaune} 66%, ${BF.vert} 66%)` }} />
    </div>
  );
}

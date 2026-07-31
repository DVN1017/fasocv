"use client";
import React, { useEffect, useState } from "react";
import AuthActions from "./AuthActions";

const BF = {
  rouge: "#EF2B2D",
  rougeFonce: "#c01f21",
  jaune: "#FCD116",
  vertFonce: "#007a35",
};

export function LogoBF({ size = 28 }) {
  return (
    <div style={{ position: "relative", width: size, height: size, borderRadius: 6, overflow: "hidden", border: "1.5px solid rgba(0,0,0,0.12)", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: BF.rouge }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: BF.vertFonce }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: BF.jaune, fontSize: size * 0.58, lineHeight: 1, fontWeight: 900, textShadow: "0 0 2px rgba(0,0,0,0.3)", userSelect: "none" }}>★</div>
    </div>
  );
}

export default function Accueil({ onStart, onPremium, onMyCvs, user, onAuth, onSignOut }) {
  const [visible, setVisible] = useState(false);
  const [ligne1, setLigne1] = useState(false);
  const [ligne2, setLigne2] = useState(false);
  const [ligne3, setLigne3] = useState(false);
  const [boutons, setBoutons] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
    setTimeout(() => setLigne1(true), 600);
    setTimeout(() => setLigne2(true), 1200);
    setTimeout(() => setLigne3(true), 1800);
    setTimeout(() => setBoutons(true), 2400);
  }, []);

  const fadeIn = (show) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  });

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(155deg, #0a0f05 0%, #1a1200 45%, ${BF.vertFonce} 100%)`, display: "flex", flexDirection: "column" }}>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${BF.rouge} 33%, ${BF.jaune} 33%, ${BF.jaune} 66%, ${BF.vertFonce} 66%)` }} />
      <nav style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LogoBF size={36} />
          <span style={{ color: "white", fontWeight: 900, fontSize: 26.0, letterSpacing: "-0.5px" }}>Faso<span style={{ color: BF.jaune }}>CV</span></span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {user && onMyCvs && (
            <button
              onClick={onMyCvs}
              style={{ padding: "8px 12px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 8, color: "white", cursor: "pointer", fontSize: 13, fontWeight: 700 }}
            >
              Mes CV
            </button>
          )}
          <AuthActions user={user} onAuth={onAuth} onSignOut={onSignOut} />
        </div>
      </nav>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", textAlign: "center" }}>
        <div style={{ ...fadeIn(visible), display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <span style={{ fontSize: "clamp(22px, 4vw, 32px)", color: "white", fontWeight: 700 }}>
            Salut ! 👋 Bienvenu sur <span style={{ color: BF.jaune }}>FasoCV</span>
          </span>
        </div>
        <div style={{ ...fadeIn(ligne1), marginBottom: 16, maxWidth: 680 }}>
          <h1 style={{ fontSize: "clamp(26px, 5.5vw, 54px)", fontWeight: 900, color: "white", letterSpacing: "-1.5px", lineHeight: 1.15, margin: 0 }}>
            Crée ton CV professionnel<br />
            <span style={{ color: BF.jaune }}>en quelques minutes</span>
          </h1>
        </div>
        <div style={{ ...fadeIn(ligne2), marginBottom: 14, maxWidth: 500 }}>
          <p style={{ fontSize: "clamp(13px, 2vw, 16px)", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, margin: 0 }}>
            Crée, personnalise et télécharge ton CV en PDF —<br />
            <strong style={{ color: "rgba(255,255,255,0.85)" }}></strong>
          </p>
        </div>
        <div style={{ ...fadeIn(boutons), display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 50 }}>
          <button onClick={() => onStart(false)}
            style={{ padding: "14px 36px", background: `linear-gradient(135deg, ${BF.rouge}, ${BF.rougeFonce})`, border: "none", borderRadius: 12, color: "white", cursor: "pointer", fontSize: 19.5, fontWeight: 800, boxShadow: `0 14px 30px ${BF.rouge}55` }}>
            Créer mon CV →
          </button>
          <button onClick={() => onStart(true)}
            style={{ padding: "14px 22px", background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.18)", borderRadius: 12, color: "white", cursor: "pointer", fontSize: 19.5, fontWeight: 600 }}>
            👁 Voir un exemple
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "16px", color: "rgba(255,255,255,0.28)", fontSize: 14.3, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span>© 2025 FasoCV — Tous droits réservés • Fait avec ❤️ pour le Burkina Faso 🇧🇫</span>
        <a href="https://wa.me/22669064476?text=Bonjour%2C%20j'ai%20un%20problème%20avec%20FasoCV%20%3A%20" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "#25D366", borderRadius: 8, textDecoration: "none", color: "white", fontSize: 14.3, fontWeight: 700 }}>
          💬 Nous contacter sur WhatsApp
        </a>
      </div>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${BF.rouge} 33%, ${BF.jaune} 33%, ${BF.jaune} 66%, ${BF.vertFonce} 66%)` }} />
    </div>
  );
}

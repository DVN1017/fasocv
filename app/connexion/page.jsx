"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "../supabase";
import { LogoBF } from "@/components/Accueil";

function AuthClient() {
  const params = useSearchParams();
  const router = useRouter();
  const mode = params?.get("mode") === "inscription" ? "inscription" : "connexion";
  const rawNext = params?.get("next") || "/";
  const nextPath = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/";

  const [email, setEmail] = useState("");
  const [etape, setEtape] = useState("email");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    setCode("");
    setErreur("");
    setEtape("email");
  }, [mode]);

  const titre = useMemo(
    () => (mode === "inscription" ? "Créer un compte" : "Se connecter"),
    [mode]
  );

  const sousTitre = useMemo(
    () => (mode === "inscription"
      ? "Crée ton compte pour sauvegarder ton CV et accéder à toutes les fonctionnalités."
      : "Content de te revoir ! Entre ton email pour recevoir ton lien de connexion."),
    [mode]
  );

  const retourner = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  const envoyerLien = async () => {
    if (!email.trim()) { setErreur("Entre ton email"); return; }
    setLoading(true);
    setErreur("");

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: mode === "inscription" },
    });

    if (error) {
      setErreur("Erreur : " + error.message);
    } else {
      setEtape("envoye");
    }
    setLoading(false);
  };

  const verifierCode = async () => {
    if (!code.trim()) { setErreur("Entre le code"); return; }
    setLoading(true);
    setErreur("");

    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    });

    if (error) {
      setErreur("Code incorrect. Réessaye.");
    } else {
      router.replace(nextPath);
    }
    setLoading(false);
  };

  const switchMode = () => {
    const targetMode = mode === "inscription" ? "connexion" : "inscription";
    const nextQuery = nextPath !== "/" ? `&next=${encodeURIComponent(nextPath)}` : "";
    router.push(`/connexion?mode=${targetMode}${nextQuery}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(155deg, #0a0f05 0%, #1a1200 45%, #0a0a0a 100%)`, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={retourner} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "white", cursor: "pointer", padding: "7px 14px", fontSize: 13, fontWeight: 600 }}>
          ← Retour
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LogoBF size={28} />
          <span style={{ color: "white", fontWeight: 900, fontSize: 20 }}>Faso<span style={{ color: "#EF2B2D" }}>CV</span></span>
        </div>
        <div style={{ width: 80 }} />
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          {etape === "email" && (
            <div style={{ background: "white", borderRadius: 16, padding: "36px 32px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
              <h1 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", margin: "0 0 8px" }}>{titre}</h1>
              <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 28, lineHeight: 1.6 }}>{sousTitre}</p>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Adresse email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErreur(""); }}
                onKeyDown={(e) => e.key === "Enter" && envoyerLien()}
                placeholder="exemple@gmail.com"
                style={{ width: "100%", padding: "11px 14px", border: `1.5px solid ${erreur ? "#EF2B2D" : "#e5e7eb"}`, borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 6 }}
              />
              {erreur && <p style={{ color: "#EF2B2D", fontSize: 12, margin: "0 0 10px" }}>{erreur}</p>}
              <button onClick={envoyerLien} disabled={loading}
                style={{ width: "100%", padding: "13px", background: loading ? "#9ca3af" : "#EF2B2D", color: "white", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", marginTop: 8, marginBottom: 20 }}>
                {loading ? "Envoi en cours..." : "Recevoir le lien de connexion →"}
              </button>
              <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 16, textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
                  {mode === "inscription" ? "Tu as déjà un compte ? " : "Pas encore de compte ? "}
                  <button onClick={switchMode} style={{ background: "none", border: "none", color: "#EF2B2D", cursor: "pointer", fontSize: 12, fontWeight: 700, padding: 0 }}>
                    {mode === "inscription" ? "Se connecter" : "S'inscrire"}
                  </button>
                </p>
              </div>
            </div>
          )}

          {etape === "envoye" && (
            <div style={{ background: "white", borderRadius: 16, padding: "36px 32px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)", textAlign: "center" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>📧</div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0f172a", margin: "0 0 10px" }}>Vérifie ton email</h2>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, marginBottom: 24 }}>
                On a envoyé un lien et un code à <strong>{email}</strong>.<br />
                Clique sur le lien dans l'email ou entre le code ci-dessous.
              </p>
              <button onClick={() => setEtape("code")}
                style={{ width: "100%", padding: "12px", background: "#EF2B2D", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 10 }}>
                Entrer le code à 6 chiffres
              </button>
              <button onClick={() => { setEtape("email"); setEmail(""); }}
                style={{ width: "100%", padding: "10px", background: "none", color: "#9ca3af", border: "none", fontSize: 12, cursor: "pointer" }}>
                Changer d'adresse email
              </button>
            </div>
          )}

          {etape === "code" && (
            <div style={{ background: "white", borderRadius: 16, padding: "36px 32px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0f172a", margin: "0 0 8px" }}>Entre ton code</h2>
              <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>Code envoyé à <strong>{email}</strong></p>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={code}
                onChange={(e) => { setCode(e.target.value.replace(/\D/g, "")); setErreur(""); }}
                onKeyDown={(e) => e.key === "Enter" && verifierCode()}
                placeholder="_ _ _ _ _ _"
                maxLength={6}
                style={{ width: "100%", padding: "14px", border: `1.5px solid ${erreur ? "#EF2B2D" : "#e5e7eb"}`, borderRadius: 8, fontSize: 28, textAlign: "center", letterSpacing: 10, outline: "none", boxSizing: "border-box", marginBottom: 6, fontWeight: 700 }}
              />
              {erreur && <p style={{ color: "#EF2B2D", fontSize: 12, margin: "0 0 10px" }}>{erreur}</p>}
              <button onClick={verifierCode} disabled={loading}
                style={{ width: "100%", padding: "13px", background: loading ? "#9ca3af" : "#EF2B2D", color: "white", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", marginBottom: 10 }}>
                {loading ? "Vérification..." : "Confirmer →"}
              </button>
              <button onClick={() => setEtape("envoye")}
                style={{ width: "100%", padding: "10px", background: "none", color: "#9ca3af", border: "none", fontSize: 12, cursor: "pointer" }}>
                ← Retour
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ConnexionPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Chargement...</div>}>
      <AuthClient />
    </Suspense>
  );
}

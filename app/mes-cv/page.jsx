"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/supabase";

const BF = {
  rouge: "#EF2B2D",
  rougeFonce: "#c01f21",
  vert: "#009A44",
  vertFonce: "#007a35",
};

export default function MesCvPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingList, setLoadingList] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!mounted) return;
        setUser(session?.user ?? null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoadingSession(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      setLoadingSession(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }

    let mounted = true;
    const load = async () => {
      setLoadingList(true);
      const { data, error } = await supabase
        .from("cvs")
        .select("id, titre, updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (!mounted) return;
      if (error) {
        setItems([]);
      } else {
        setItems(data || []);
      }
      setLoadingList(false);
    };

    load();

    return () => {
      mounted = false;
    };
  }, [user]);

  const retourner = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  if (loadingSession) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <span style={{ color: "#475569", fontWeight: 700 }}>Chargement...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", padding: 20 }}>
        <div style={{ maxWidth: 560, margin: "80px auto", background: "white", border: "1px solid #e5e7eb", borderRadius: 14, padding: 22 }}>
          <button onClick={retourner} style={{ marginBottom: 16, padding: "8px 12px", background: "white", border: "1px solid #e5e7eb", borderRadius: 8, color: "#334155", cursor: "pointer", fontWeight: 700 }}>
            ← Retour
          </button>
          <h1 style={{ margin: "0 0 8px", color: "#0f172a", fontSize: 26, fontWeight: 900 }}>Mes CV</h1>
          <p style={{ margin: "0 0 18px", color: "#64748b", lineHeight: 1.6 }}>
            Connecte-toi pour voir et gérer tes CV sauvegardés.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => router.push(`/connexion?mode=connexion&next=${encodeURIComponent("/mes-cv")}`)} style={{ padding: "10px 14px", background: BF.rouge, border: "none", borderRadius: 8, color: "white", cursor: "pointer", fontWeight: 700 }}>
              Se connecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: 20 }}>
      <div style={{ maxWidth: 920, margin: "20px auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={retourner} aria-label="Retour" style={{ width: 40, height: 40, background: "white", border: "1px solid #e5e7eb", borderRadius: 10, color: "#334155", cursor: "pointer", fontSize: 18, fontWeight: 700 }}>
              ←
            </button>
            <h1 style={{ margin: 0, color: "#0f172a", fontSize: 31, fontWeight: 900 }}>Mes CV</h1>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => router.push("/builder?new=1&from=%2Fmes-cv")} style={{ padding: "10px 14px", background: `linear-gradient(135deg, ${BF.vert}, ${BF.vertFonce})`, border: "none", borderRadius: 8, color: "white", cursor: "pointer", fontWeight: 700 }}>
              + Nouveau CV
            </button>
            <button onClick={() => router.push("/")} style={{ padding: "10px 14px", background: "white", border: "1px solid #e5e7eb", borderRadius: 8, color: "#334155", cursor: "pointer", fontWeight: 700 }}>
              Accueil
            </button>
          </div>
        </div>

        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
          {loadingList ? (
            <div style={{ padding: 18, color: "#64748b", fontWeight: 600 }}>Chargement des CV...</div>
          ) : items.length === 0 ? (
            <div style={{ padding: 22, color: "#64748b" }}>
              Aucun CV sauvegardé pour le moment. Clique sur Nouveau CV pour commencer.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 16px", borderBottom: "1px solid #f1f5f9" }}>
                <div>
                  <div style={{ fontSize: 15, color: "#0f172a", fontWeight: 800 }}>{item.titre || "Sans titre"}</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>
                    Modifié le {new Date(item.updated_at).toLocaleString("fr-FR")}
                  </div>
                </div>
                <button onClick={() => router.push(`/builder?cvId=${encodeURIComponent(item.id)}&from=%2Fmes-cv`)} style={{ padding: "8px 12px", background: "white", border: `1px solid ${BF.vert}`, borderRadius: 8, color: BF.vertFonce, cursor: "pointer", fontWeight: 700 }}>
                  Ouvrir
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/supabase";
import { BF } from "./styles";

export default function AuthActions({ user: userProp, onAuth, onSignOut: onSignOutProp, compact = false }) {
  const router = useRouter();
  const [user, setUser] = useState(userProp ?? null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(!userProp);
  const containerRef = useRef(null);

  useEffect(() => {
    if (userProp) {
      setUser(userProp);
      setLoading(false);
      return;
    }

    let isMounted = true;
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!isMounted) return;
        setUser(session?.user ?? null);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [userProp]);

  useEffect(() => {
    const handleClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [menuOpen]);

  const handleAuth = (mode) => {
    if (onAuth) {
      onAuth(mode);
    } else {
      router.push(`/connexion?mode=${mode}`);
    }
  };

  const handleSignOut = async () => {
    setMenuOpen(false);
    if (onSignOutProp) {
      await onSignOutProp();
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
  };

  const userName = user?.email?.split("@")[0] || "Utilisateur";
  const avatarLetter = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <div ref={containerRef} style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
      {loading ? null : user ? (
        <>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: compact ? 0 : 8,
              padding: compact ? "7px 9px" : "7px 12px",
              background: "rgba(255,255,255,0.95)",
              border: "1px solid #e5e7eb",
              borderRadius: 999,
              color: "#111827",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: BF.vert, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13 }}>
              {avatarLetter}
            </div>
            {!compact && <span style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", maxWidth: 110 }}>{userName}</span>}
          </button>
          {menuOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "white", border: "1px solid #e5e7eb", borderRadius: 12, boxShadow: "0 16px 40px rgba(15, 23, 42, 0.12)", minWidth: 180, zIndex: 20 }}>
              <button
                type="button"
                onClick={handleSignOut}
                style={{ width: "100%", padding: "10px 14px", background: "none", border: "none", textAlign: "left", cursor: "pointer", color: "#111827", fontSize: 14, fontWeight: 700 }}
              >
                Déconnexion
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => handleAuth("connexion")}
            style={{ padding: "8px 14px", background: "transparent", border: "1px solid rgba(255,255,255,0.45)", borderRadius: 8, color: "white", cursor: "pointer", fontSize: 14, fontWeight: 700, backdropFilter: "blur(6px)" }}
          >
            Se connecter
          </button>
          <button
            type="button"
            onClick={() => handleAuth("inscription")}
            style={{ padding: "8px 14px", background: BF.rouge, border: "none", borderRadius: 8, color: "white", cursor: "pointer", fontSize: 14, fontWeight: 700 }}
          >
            S'inscrire
          </button>
        </>
      )}
    </div>
  );
}

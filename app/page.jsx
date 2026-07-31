"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./supabase";
import Accueil from "../components/Accueil";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      })
      .finally(() => {
        setSessionLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setSessionLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleStart = (demo = false) => {
    router.push(demo ? "/builder?demo=1" : "/builder");
  };

  const handlePremium = () => router.push("/premium");
  const handleMyCvs = () => router.push("/mes-cv");
  const handleAuth = (mode) => router.push(`/connexion?mode=${mode}`);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (sessionLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0f05" }}>
        <div style={{ color: "white", fontSize: 16 }}>Chargement...</div>
      </div>
    );
  }

  return (
    <Accueil
      onStart={handleStart}
      onPremium={handlePremium}
      onMyCvs={handleMyCvs}
      user={user}
      onAuth={handleAuth}
      onSignOut={handleSignOut}
    />
  );
}

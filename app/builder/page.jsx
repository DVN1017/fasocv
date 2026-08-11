"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCv } from "@/lib/CvContext";
import { StepPersonnel, StepResume, StepExperience, StepFormation, StepCompetences, StepLangues } from "@/components/CvSteps";
import { TemplateModerne, TemplateEpure } from "@/components/CvTemplates";
import { Icon } from "@/components/Icons";
import AuthActions from "@/components/AuthActions";
import { supabase } from "@/app/supabase";
const BF = {
  rouge: "#EF2B2D",
  rougeFonce: "#c01f21",
  jaune: "#FCD116",
  vert: "#009A44",
  vertFonce: "#007a35",
  vertLight: "#e6f7ed",
  jauneLight: "#fff9e0",
};

const STEPS = [
  { id: 0, label: "Personnel" },
  { id: 1, label: "Résumé" },
  { id: 2, label: "Expérience" },
  { id: 3, label: "Formation" },
  { id: 4, label: "Compétences" },
  { id: 5, label: "Langues" },
];

function BuilderClient() {
  const router = useRouter();
  const params = useSearchParams();
  const demo = params?.get("demo") === "1";
  const cvIdParam = params?.get("cvId");
  const forceNewCv = params?.get("new") === "1";
  const rawFrom = params?.get("from") || "";
  const returnPath = rawFrom.startsWith("/") && !rawFrom.startsWith("//") ? rawFrom : "/";
  const { cv, setStep, step, template, setTemplate, updateCv, replaceCv, resetCv } = useCv();
  const [showPreview, setShowPreview] = useState(demo);
  const [isMobile, setIsMobile] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [nbTelechargements, setNbTelechargements] = useState(0);
  const [showModalPremium, setShowModalPremium] = useState(false);
  const [raisonModal, setRaisonModal] = useState("limite");
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [currentCvId, setCurrentCvId] = useState(cvIdParam ?? null);
  const [currentTitre, setCurrentTitre] = useState("");
  const [showSaveTitleModal, setShowSaveTitleModal] = useState(false);
  const [saveTitleValue, setSaveTitleValue] = useState("");
  const [saveTitleFallback, setSaveTitleFallback] = useState("Mon CV");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveNotice, setSaveNotice] = useState("");
  const [cvLoading, setCvLoading] = useState(false);
  const previewRef = useRef(null);

  const handleBuilderBack = () => {
    if (returnPath !== "/") {
      router.push(returnPath);
      return;
    }
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  const connexionPath = `/connexion?mode=connexion&next=${encodeURIComponent(
    `/builder${cvIdParam ? `?cvId=${encodeURIComponent(cvIdParam)}` : forceNewCv ? "?new=1" : ""}${returnPath !== "/" ? `&from=${encodeURIComponent(returnPath)}` : ""}`
  )}`;

  useEffect(() => {
    const saved = parseInt(localStorage.getItem("fasocv_dl") || "0");
    setNbTelechargements(saved);
  }, []);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!mounted) return;
        setUser(session?.user ?? null);
      })
      .finally(() => {
        if (!mounted) return;
        setAuthReady(true);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      setAuthReady(true);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (demo && !cvIdParam && !forceNewCv) {
      const demoCv = {
        personal: { name: "Aminata Sawadogo", title: "Ingénieure Logiciel Senior", phone: "+226 70 12 34 56", email: "aminata@fasocv.bf", location: "Ouagadougou, Burkina Faso", website: "linkedin.com/in/aminata", photo: null },
        summary: "Ingénieure logiciel expérimentée avec plus de 7 ans d'expérience dans le développement d'applications web évolutables. Passionnée par le code propre et la conception centrée sur l'utilisateur.",
        experience: [
          { id: 1, company: "Orange Burkina Faso", role: "Ingénieure Frontend Principale", period: "2021 – Présent", description: "Développement et maintenance d'un portail client desservant plus de 2 millions d'utilisateurs. Réduction du temps de chargement de 40 %." },
          { id: 2, company: "Sonatel Sénégal", role: "Développeuse Full Stack", period: "2018 – 2021", description: "Développement d'une architecture microservices pour la plateforme de facturation." },
        ],
        education: [{ id: 1, institution: "Université de Ouagadougou", degree: "Master en Informatique", year: "2018", description: "Diplômée avec mention." }],
        skills: ["React / Next.js", "Node.js", "Python", "PostgreSQL", "Docker", "AWS", "TypeScript"],
        languages: [{ id: 1, language: "Français", level: "Langue maternelle" }, { id: 2, language: "Anglais", level: "Courant" }, { id: 3, language: "Mooré", level: "Langue maternelle" }],
      };
      updateCv("personal", demoCv.personal);
      updateCv("summary", demoCv.summary);
      updateCv("experience", demoCv.experience);
      updateCv("education", demoCv.education);
      updateCv("skills", demoCv.skills);
      updateCv("languages", demoCv.languages);
    }
  }, [demo, cvIdParam, forceNewCv, updateCv]);

  useEffect(() => {
    setCurrentCvId(cvIdParam ?? null);
  }, [cvIdParam]);

  useEffect(() => {
    if (!forceNewCv) return;
    resetCv();
    setCurrentCvId(null);
    setCurrentTitre("");
    setShowSaveTitleModal(false);
    setSaveTitleValue("");
    setSaveTitleFallback("Mon CV");
    setSaveNotice("");
    setShowPreview(false);
  }, [forceNewCv, resetCv]);

  useEffect(() => {
    if (!showSaveTitleModal) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowSaveTitleModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSaveTitleModal]);

  useEffect(() => {
    if (!authReady || !user || !cvIdParam || forceNewCv) return;

    let mounted = true;
    const loadCv = async () => {
      setCvLoading(true);
      const { data, error } = await supabase
        .from("cvs")
        .select("id, titre, data")
        .eq("id", cvIdParam)
        .eq("user_id", user.id)
        .single();

      if (!mounted) return;

      if (error) {
        setSaveNotice(`Impossible de charger ce CV: ${error.message}`);
      } else if (data?.data) {
        replaceCv(data.data);
        setCurrentCvId(data.id);
        setCurrentTitre(data.titre || "");
        setSaveNotice(`CV chargé : ${data.titre || "Sans titre"}`);
      }
      setCvLoading(false);
    };

    loadCv();

    return () => {
      mounted = false;
    };
  }, [authReady, user, cvIdParam, forceNewCv, replaceCv]);

  const update = (key, value) => updateCv(key, value);

  const saveNewCv = async (rawTitle) => {
    const titreFinal = (rawTitle || saveTitleFallback).trim() || saveTitleFallback;
    const { data, error } = await supabase
      .from("cvs")
      .insert({ user_id: user.id, titre: titreFinal, data: cv })
      .select("id, titre")
      .single();

    if (error || !data) {
      setSaveNotice(`Erreur lors de la sauvegarde: ${error?.message || "inconnue"}`);
      return false;
    }

    setCurrentCvId(data.id);
    setCurrentTitre(data.titre || titreFinal);
    const savedUrl = `/builder?cvId=${encodeURIComponent(data.id)}${returnPath !== "/" ? `&from=${encodeURIComponent(returnPath)}` : ""}`;
    router.replace(savedUrl);
    setSaveNotice("CV sauvegardé.");
    return true;
  };

  const handleConfirmSaveTitle = async () => {
    if (saveLoading) return;
    setSaveLoading(true);
    setSaveNotice("");

    try {
      const saved = await saveNewCv(saveTitleValue);
      if (saved) {
        setShowSaveTitleModal(false);
      }
    } catch (e) {
      setSaveNotice(`Erreur lors de la sauvegarde: ${e?.message || "inconnue"}`);
    }

    setSaveLoading(false);
  };

  const handleSaveCv = async () => {
    if (!authReady) {
      setSaveNotice("Initialisation de la session... réessayez dans un instant.");
      return;
    }

    if (!user) {
      router.push(connexionPath);
      return;
    }

    const fallbackTitle = cv.personal?.title?.trim() || cv.personal?.name?.trim() || "Mon CV";

    if (!currentCvId) {
      setSaveTitleFallback(fallbackTitle);
      setSaveTitleValue(currentTitre || fallbackTitle);
      setShowSaveTitleModal(true);
      return;
    }

    setSaveLoading(true);
    setSaveNotice("");

    try {
      const titreFinal = currentTitre || fallbackTitle;
      const { error } = await supabase
        .from("cvs")
        .update({ titre: titreFinal, data: cv })
        .eq("id", currentCvId)
        .eq("user_id", user.id);

      if (error) {
        setSaveNotice(`Erreur lors de la mise à jour: ${error.message}`);
      } else {
        setCurrentTitre(titreFinal);
        setSaveNotice("CV mis à jour.");
      }
    } catch (e) {
      setSaveNotice(`Erreur lors de la sauvegarde: ${e?.message || "inconnue"}`);
    }

    setSaveLoading(false);
  };

  const handleExportPDF = async () => {
    if (exporting) return;
    if (nbTelechargements >= 5) {
      setRaisonModal("limite");
      setShowModalPremium(true);
      return;
    }

    setExporting(true);
    try {
      const etaitFerme = !showPreview;
      if (etaitFerme) {
        setShowPreview(true);
        await new Promise(r => setTimeout(r, 800));
      }
      const element = previewRef.current;
      if (!element) {
        if (etaitFerme) setShowPreview(false);
        setExporting(false);
        alert("Erreur. Réessayez.");
        return;
      }
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: 794,
        height: 1123,
        windowWidth: 794,
        x: 0,
        y: 0,
      });
      if (nbTelechargements >= 2) {
        const ctx = canvas.getContext("2d");
        ctx.font = "bold 22px Arial";
        ctx.fillStyle = "rgba(239,43,45,0.55)";
        ctx.fillText("🇧🇫 FasoCV", canvas.width - 200, canvas.height - 30);
      }
      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
      const nomFichier = cv.personal.name ? "CV_" + cv.personal.name.replace(/\s+/g, "_") + ".pdf" : "MonCV_FasoCV.pdf";
      pdf.save(nomFichier);
      if (etaitFerme) setShowPreview(false);
      const nouveau = nbTelechargements + 1;
      setNbTelechargements(nouveau);
      localStorage.setItem("fasocv_dl", String(nouveau));
      if (nouveau === 1) {
        setTimeout(() => {
          setRaisonModal("suggestion");
          setShowModalPremium(true);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur export PDF: " + err.message);
    }
    setExporting(false);
  };

  const avecFiligrane = nbTelechargements >= 2 && nbTelechargements < 5;
  const renderedTemplate = useMemo(
    () => template === "moderne"
      ? <TemplateModerne cv={cv} avecFiligrane={avecFiligrane} />
      : <TemplateEpure cv={cv} avecFiligrane={avecFiligrane} />,
    [template, cv, avecFiligrane]
  );

  const dlRestants = Math.max(0, 5 - nbTelechargements);
  const dlInfo = nbTelechargements === 0
    ? { msg: "2 PDF gratuits et propres disponibles", color: BF.vert, bg: BF.vertLight }
    : nbTelechargements < 2
      ? { msg: `${dlRestants} PDF gratuit${dlRestants > 1 ? "s" : ""} propre${dlRestants > 1 ? "s" : ""} restant${dlRestants > 1 ? "s" : ""}`, color: BF.vert, bg: BF.vertLight }
      : nbTelechargements < 5
        ? { msg: `${dlRestants} PDF gratuit${dlRestants > 1 ? "s" : ""} restant${dlRestants > 1 ? "s" : ""} (avec 🇧🇫 FasoCV)`, color: "#92400e", bg: "#fef3c7" }
        : { msg: "Limite gratuite atteinte — Passez Premium pour continuer", color: BF.rouge, bg: BF.rougeLight };

  const ProgressBar = ({ mini = false }) => (
    <div style={{ padding: mini ? "8px 14px 0" : "12px 20px 0", background: "white", borderBottom: "1px solid #f3f4f6", flexShrink: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        {STEPS.map((s, i) => (
          <button key={s.id} onClick={() => setStep(i)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", flex: 1 }}>
            <div style={{ width: mini ? 22 : 26, height: mini ? 22 : 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: i === step ? BF.rouge : i < step ? BF.vertLight : "#f3f4f6", color: i === step ? "white" : i < step ? BF.vert : "#9ca3af", fontSize: mini ? 9 : 10, fontWeight: 800, border: `2px solid ${i === step ? BF.rouge : i < step ? BF.vert : "transparent"}` }}>
              {i < step ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: mini ? 7 : 8, fontWeight: 700, color: i === step ? BF.rouge : "#9ca3af", textTransform: "uppercase" }}>{s.label}</span>
          </button>
        ))}
      </div>
      <div style={{ height: 3, background: "#f3f4f6", borderRadius: 2, marginBottom: 2 }}>
        <div style={{ height: "100%", background: `linear-gradient(90deg, ${BF.rouge}, ${BF.jaune} 50%, ${BF.vert})`, borderRadius: 2, width: `${((step + 1) / STEPS.length) * 100}%`, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );

  const NavButtons = ({ mini = false }) => (
    <div style={{ padding: mini ? "10px 14px" : "12px 20px", borderTop: "1px solid #f3f4f6", background: "white", display: "flex", gap: 8, flexShrink: 0 }}>
      <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
        style={{ flex: 1, padding: mini ? "9px" : "10px 18px", border: "1.5px solid #e5e7eb", borderRadius: 8, background: "white", color: "#374151", cursor: step === 0 ? "not-allowed" : "pointer", fontSize: mini ? 12 : 13, fontWeight: 600, opacity: step === 0 ? 0.35 : 1 }}>
        ← Précédent
      </button>
      {step < STEPS.length - 1
        ? <button onClick={() => setStep(s => s + 1)}
            style={{ flex: 1, padding: mini ? "9px" : "10px 22px", border: "none", borderRadius: 8, background: `linear-gradient(135deg, ${BF.vert}, ${BF.vertFonce})`, color: "white", cursor: "pointer", fontSize: mini ? 12 : 13, fontWeight: 700 }}>
            Suivant →
          </button>
        : <button onClick={handleExportPDF} disabled={exporting}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: mini ? "9px" : "10px 18px", border: "none", borderRadius: 8, background: exporting ? "#9ca3af" : nbTelechargements >= 5 ? BF.rouge : `linear-gradient(135deg, ${BF.vert}, ${BF.vertFonce})`, color: "white", cursor: exporting ? "not-allowed" : "pointer", fontSize: mini ? 12 : 13, fontWeight: 700 }}>
            {nbTelechargements >= 5 ? <><Icon path="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4" size={14} /> Premium</> : <><Icon path="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" size={14} /> {exporting ? "..." : "PDF"}</>}
          </button>}
    </div>
  );

  const stepForms = [
    <StepPersonnel key="p" cv={cv} update={update} />,
    <StepResume key="r" cv={cv} update={update} />,
    <StepExperience key="e" cv={cv} update={update} />,
    <StepFormation key="f" cv={cv} update={update} />,
    <StepCompetences key="c" cv={cv} update={update} />,
    <StepLangues key="l" cv={cv} update={update} />,
  ];

  return (
    <div style={{ height: "100vh", background: "#f1f5f9", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }`}</style>
      <div style={{ position: "absolute", top: -9999, left: 0, width: 794, visibility: "visible", overflow: "visible" }}>
        <div ref={previewRef} data-cv-export="true">
          {renderedTemplate}
        </div>
      </div>
      {showModalPremium && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}><div style={{ background: "white", borderRadius: 16, maxWidth: 440, width: "100%", overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}><div style={{ background: `linear-gradient(135deg, ${BF.rouge}, ${BF.rougeFonce})`, padding: "20px 24px", position: "relative" }}><div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${BF.rouge} 33%, ${BF.jaune} 33%, ${BF.jaune} 66%, ${BF.vert} 66%)` }} /><button onClick={() => setShowModalPremium(false)} style={{ position: "absolute", top: 12, right: 14, background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", color: "white", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>✕</button><div style={{ display: "flex", alignItems: "center", gap: 10, color: "white" }}><span style={{ fontSize: 24 }}>⭐</span><div><div style={{ fontWeight: 900, fontSize: 16 }}>Passer en Premium</div><div style={{ fontSize: 11, opacity: 0.8 }}>{raisonModal === "limite" ? "Vous avez atteint la limite gratuite" : "Débloquez toutes les fonctionnalités"}</div></div></div></div><div style={{ padding: "20px 24px" }}><p style={{ fontSize: 13, color: "#374151", marginBottom: 16, lineHeight: 1.6 }}>🇧🇫 Débloquez toutes les fonctionnalités de <strong>FasoCV Premium</strong> et créez un CV parfait sans filigrane !</p><div style={{ background: BF.vertLight, borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>{["✅ 2 templates professionnels (Moderne + Épuré)", "✅ Photo de profil sur votre CV", "✅ PDF illimité sans filigrane", "✅ Paiement sécurisé Wave & Orange Money"].map((item, i) => (<div key={i} style={{ fontSize: 12, color: BF.vertFonce, marginBottom: i < 3 ? 6 : 0 }}>{item}</div>))}</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}><a href="https://jevxiiyn.mychariow.shop/prd_wk62ty" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}><div style={{ border: `2px solid ${BF.vert}`, borderRadius: 10, padding: "12px 10px", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}><div style={{ fontSize: 10, color: "#6b7280", marginBottom: 4 }}>6 MOIS</div><div style={{ fontSize: 22, fontWeight: 900, color: BF.vert }}>600<span style={{ fontSize: 12 }}> FCFA</span></div><div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>~100 FCFA/mois</div><div style={{ marginTop: 8, padding: "6px", background: BF.vert, borderRadius: 6, color: "white", fontSize: 11, fontWeight: 700 }}>Choisir →</div></div></a><a href="https://jevxiiyn.mychariow.shop/prd_lthl6f" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}><div style={{ border: `2px solid ${BF.jaune}`, borderRadius: 10, padding: "12px 10px", textAlign: "center", cursor: "pointer", position: "relative" }}><div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: BF.jaune, color: "#000", fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 20 }}>MEILLEURE OFFRE</div><div style={{ fontSize: 10, color: "#6b7280", marginBottom: 4 }}>1 AN</div><div style={{ fontSize: 22, fontWeight: 900, color: "#92400e" }}>1000<span style={{ fontSize: 12 }}> FCFA</span></div><div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>~83 FCFA/mois</div><div style={{ marginTop: 8, padding: "6px", background: BF.jaune, borderRadius: 6, color: "#000", fontSize: 11, fontWeight: 700 }}>Choisir →</div></div></a></div><button onClick={() => setShowModalPremium(false)} style={{ width: "100%", padding: "10px", border: "1.5px solid #e5e7eb", borderRadius: 8, background: "white", color: "#6b7280", cursor: "pointer", fontSize: 12 }}>Continuer en gratuit</button></div></div></div>}
      {showSaveTitleModal && (
        <div
          role="presentation"
          onClick={() => setShowSaveTitleModal(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(2, 6, 23, 0.62)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-save-title-heading"
            onClick={(event) => event.stopPropagation()}
            style={{ width: "100%", maxWidth: 460, background: "white", borderRadius: 16, boxShadow: "0 25px 60px rgba(15, 23, 42, 0.3)", overflow: "hidden" }}
          >
            <div style={{ background: `linear-gradient(135deg, ${BF.vert}, ${BF.vertFonce})`, padding: "18px 22px", color: "white", position: "relative" }}>
              <button
                onClick={() => setShowSaveTitleModal(false)}
                style={{ position: "absolute", top: 12, right: 14, width: 28, height: 28, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.2)", color: "white", cursor: "pointer", fontWeight: 700 }}
              >
                ✕
              </button>
              <div id="cv-save-title-heading" style={{ fontSize: 16, fontWeight: 900 }}>Nommer votre CV</div>
              <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4 }}>Choisissez un titre pour le retrouver facilement dans Mes CV.</div>
            </div>
            <div style={{ padding: "18px 22px" }}>
              <label htmlFor="cv-save-title" style={{ display: "block", fontSize: 12, fontWeight: 800, color: "#334155", marginBottom: 8 }}>
                Titre du CV
              </label>
              <input
                id="cv-save-title"
                value={saveTitleValue}
                onChange={(e) => setSaveTitleValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleConfirmSaveTitle();
                  }
                }}
                placeholder="Ex: Développeur Full Stack"
                autoFocus
                style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: 10, padding: "11px 12px", fontSize: 14, color: "#0f172a", outline: "none" }}
              />
              <div style={{ marginTop: 8, fontSize: 11, color: "#64748b" }}>
                Titre proposé: <strong>{saveTitleFallback}</strong>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                <button
                  onClick={() => setShowSaveTitleModal(false)}
                  disabled={saveLoading}
                  style={{ flex: 1, padding: "10px 12px", borderRadius: 9, border: "1px solid #e2e8f0", background: "white", color: "#334155", fontWeight: 700, cursor: "pointer" }}
                >
                  Annuler
                </button>
                <button
                  onClick={handleConfirmSaveTitle}
                  disabled={saveLoading}
                  style={{ flex: 1, padding: "10px 12px", borderRadius: 9, border: "none", background: `linear-gradient(135deg, ${BF.vert}, ${BF.vertFonce})`, color: "white", fontWeight: 800, cursor: saveLoading ? "not-allowed" : "pointer", opacity: saveLoading ? 0.75 : 1 }}
                >
                  {saveLoading ? "Sauvegarde..." : "Sauvegarder"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${BF.rouge} 33%, ${BF.jaune} 33%, ${BF.jaune} 66%, ${BF.vert} 66%)`, flexShrink: 0 }} />
      <header style={{ background: "white", borderBottom: "1px solid #e5e7eb", padding: "0 14px", height: 50, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={handleBuilderBack} style={{ display: "flex", alignItems: "center", gap: 5, background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 7, cursor: "pointer", padding: "5px 10px", fontSize: 14.3, fontWeight: 700, color: "#374151" }}>
            ← Retour
          </button>
          <button onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer" }}>
            <span style={{ fontWeight: 900, fontSize: 20.8, letterSpacing: "-0.5px", color: "#0f172a" }}>Faso<span style={{ color: BF.rouge }}>CV</span></span>
          </button>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {showPreview && (
            <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 7, padding: 2, gap: 1 }}>
              {[{ key: "moderne", label: "Moderne" }, { key: "epure", label: "Épuré" }].map(t => (
                <button key={t.key} onClick={() => setTemplate(t.key)} style={{ padding: "4px 10px", fontSize: 11, fontWeight: 700, borderRadius: 5, border: "none", cursor: "pointer", background: template === t.key ? "white" : "transparent", color: template === t.key ? BF.rouge : "#6b7280", boxShadow: template === t.key ? "0 1px 2px rgba(0,0,0,0.1)" : "none" }}>
                  {t.label}
                </button>
              ))}
            </div>
          )}
          {!showPreview && (
            <button onClick={() => setShowPreview(true)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 7, cursor: "pointer", fontSize: 11, fontWeight: 700, color: "#374151" }}>
              <Icon path="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" size={13} />
              👁 Aperçu
            </button>
          )}
          <button onClick={handleExportPDF} disabled={exporting} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", background: exporting ? "#9ca3af" : nbTelechargements >= 5 ? BF.rouge : `linear-gradient(135deg, ${BF.rouge}, ${BF.rougeFonce})`, border: "none", borderRadius: 7, color: "white", cursor: exporting ? "not-allowed" : "pointer", fontSize: 14.3, fontWeight: 700 }}>
            <Icon path="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" size={12} />
            {exporting ? "..." : nbTelechargements >= 5 ? "🔒" : "PDF"}
          </button>
          {!authReady ? (
            <span style={{ padding: "6px 10px", background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 7, color: "#94a3b8", fontSize: 11, fontWeight: 600 }}>
              Session...
            </span>
          ) : user ? (
            <button
              onClick={handleSaveCv}
              disabled={saveLoading || cvLoading}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", background: saveLoading ? "#9ca3af" : "white", border: `1px solid ${BF.vert}`, borderRadius: 7, color: BF.vertFonce, cursor: saveLoading ? "not-allowed" : "pointer", fontSize: 14.3, fontWeight: 700 }}
            >
              <Icon path="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8" size={12} />
              {saveLoading ? "..." : "Sauvegarder"}
            </button>
          ) : (
            <a href={connexionPath} style={{ padding: "6px 10px", background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 7, color: "#6b7280", cursor: "pointer", fontSize: 11, fontWeight: 600, textDecoration: "none" }}>
              Se connecter pour sauvegarder
            </a>
          )}
          <AuthActions compact />
        </div>
      </header>

      {(saveNotice || cvLoading) && (
        <div style={{ background: "#f8fafc", borderBottom: "1px solid #e5e7eb", padding: "5px 14px", flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: "#475569", fontWeight: 600 }}>
            {cvLoading ? "Chargement du CV..." : saveNotice}
          </span>
        </div>
      )}

      {nbTelechargements > 0 && (
        <div style={{ background: dlInfo.bg, borderBottom: `1px solid ${dlInfo.color}22`, padding: "5px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <span style={{ fontSize: 14.3, color: dlInfo.color, fontWeight: 600 }}>📄 {dlInfo.msg}</span>
          <button onClick={() => { setRaisonModal("suggestion"); setShowModalPremium(true); }} style={{ fontSize: 11, fontWeight: 700, color: BF.rouge, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            ⭐ Passer Premium
          </button>
        </div>
      )}

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {showPreview ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#dde3ea" }}>
            <div style={{ padding: "8px 16px", background: "white", borderBottom: "1px solid #e5e7eb", flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14.3, fontWeight: 700, color: "#374151", letterSpacing: "1px", textTransform: "uppercase" }}>Aperçu en direct</span>
              <span style={{ fontSize: 11, color: "#9ca3af", background: "#f3f4f6", padding: "2px 8px", borderRadius: 4 }}>Format A4</span>
            </div>
            <div style={{ flex: 1, overflow: "auto", padding: "16px 10px", display: "flex", justifyContent: "center" }}>
              <div style={{ transform: isMobile ? "scale(0.36)" : "scale(0.62)", transformOrigin: "top center", width: "210mm", flexShrink: 0, marginBottom: isMobile ? -380 : -160 }}>
                <div style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.28)" }}>
                  {template === "moderne"
                    ? <TemplateModerne cv={cv} avecFiligrane={avecFiligrane} />
                    : <TemplateEpure cv={cv} avecFiligrane={avecFiligrane} />
                  }
                </div>
              </div>
            </div>
            <div style={{ padding: "10px 14px", background: "white", borderTop: "1px solid #e5e7eb", flexShrink: 0 }}>
              <button onClick={handleExportPDF} disabled={exporting} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", background: exporting ? "#9ca3af" : nbTelechargements >= 3 ? BF.rouge : `linear-gradient(135deg, ${BF.rouge}, ${BF.rougeFonce})`, border: "none", borderRadius: 10, color: "white", cursor: "pointer", fontSize: 18.2, fontWeight: 800 }}>
                <Icon path="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" size={16} />
                {nbTelechargements >= 3 ? "Passer Premium pour continuer" : exporting ? "Génération en cours..." : "Télécharger mon CV en PDF"}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <ProgressBar mini={isMobile} />
            <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "14px" : "16px 20px" }}>
              <h2 style={{ fontSize: isMobile ? 15 : 16, fontWeight: 900, color: "#0f172a", margin: "0 0 2px" }}>{STEPS[step].label}</h2>
              <p style={{ fontSize: isMobile ? 10 : 11, color: "#94a3b8", margin: "0 0 12px" }}>Étape {step + 1} sur {STEPS.length}</p>
              {stepForms[step]}
            </div>
            <NavButtons mini={isMobile} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Chargement...</div>}>
      <BuilderClient />
    </Suspense>
  );
}


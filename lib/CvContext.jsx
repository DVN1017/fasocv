"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const EMPTY_CV = {
  personal: { name: "", title: "", phone: "", email: "", location: "", website: "", photo: null },
  summary: "",
  experience: [{ id: 1, company: "", role: "", period: "", description: "" }],
  education: [{ id: 1, institution: "", degree: "", year: "", description: "" }],
  skills: [""],
  languages: [{ id: 1, language: "", level: "Courant" }],
};

const DRAFT_KEY = "fasocv_draft_v1";

function cloneEmptyCv() {
  return JSON.parse(JSON.stringify(EMPTY_CV));
}

function readDraft() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed?.cv || typeof parsed.cv !== "object") return null;

    return {
      cv: parsed.cv,
      template: parsed.template || "moderne",
      step: Number.isInteger(parsed.step) ? parsed.step : 0,
    };
  } catch {
    return null;
  }
}

const CvContext = createContext(null);

export function CvProvider({ children }) {
  const [cv, setCv] = useState(cloneEmptyCv);
  const [template, setTemplate] = useState("moderne");
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const updateCv = useCallback((key, value) => {
    setCv(prev => ({ ...prev, [key]: value }));
  }, []);

  const replaceCv = useCallback((nextCv) => {
    setCv(nextCv && typeof nextCv === "object" ? nextCv : cloneEmptyCv());
  }, []);

  const resetCv = useCallback(() => {
    setCv(cloneEmptyCv());
    setTemplate("moderne");
    setStep(0);

    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(DRAFT_KEY);
      } catch {
        // Ignore storage errors; the in-memory reset still succeeds.
      }
    }
  }, []);

  // Read the browser draft after mount. This avoids server/client hydration
  // mismatches while still restoring the user's work after a refresh.
  useEffect(() => {
    const draft = readDraft();
    if (draft) {
      setCv(draft.cv);
      setTemplate(draft.template);
      setStep(draft.step);
    }
    setHydrated(true);
  }, []);

  // Debounced local persistence protects the user against accidental refresh,
  // navigation and browser interruptions without writing on every keystroke.
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;

    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ cv, template, step, savedAt: Date.now() })
        );
      } catch {
        // Storage can be unavailable/full; never block CV editing because of it.
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, [cv, template, step, hydrated]);

  const value = useMemo(
    () => ({ cv, template, step, updateCv, replaceCv, setTemplate, setStep, resetCv }),
    [cv, template, step, updateCv, replaceCv, resetCv]
  );

  return <CvContext.Provider value={value}>{children}</CvContext.Provider>;
}

export function useCv() {
  const context = useContext(CvContext);
  if (!context) {
    throw new Error("useCv must be used within CvProvider");
  }
  return context;
}

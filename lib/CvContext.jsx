"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

const EMPTY_CV = {
  personal: { name: "", title: "", phone: "", email: "", location: "", website: "", photo: null },
  summary: "",
  experience: [{ id: 1, company: "", role: "", period: "", description: "" }],
  education: [{ id: 1, institution: "", degree: "", year: "", description: "" }],
  skills: [""],
  languages: [{ id: 1, language: "", level: "Courant" }],
};

const CvContext = createContext(null);

export function CvProvider({ children }) {
  const [cv, setCv] = useState(EMPTY_CV);
  const [template, setTemplate] = useState("moderne");
  const [step, setStep] = useState(0);

  const updateCv = (key, value) => setCv(prev => ({ ...prev, [key]: value }));
  const replaceCv = (nextCv) => setCv(nextCv);

  const resetCv = () => {
    setCv(EMPTY_CV);
    setTemplate("moderne");
    setStep(0);
  };

  const value = useMemo(
    () => ({ cv, template, step, updateCv, replaceCv, setTemplate, setStep, resetCv }),
    [cv, template, step]
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

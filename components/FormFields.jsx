"use client";
import React, { useRef } from "react";
import { BF, baseInput } from "./styles";

export function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 }}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={baseInput}
        onFocus={e => e.target.style.borderColor = BF.vert}
        onBlur={e => e.target.style.borderColor = "#e5e7eb"}
      />
    </div>
  );
}

export function Textarea({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <div>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 }}>{label}</label>}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{ ...baseInput, resize: "vertical" }}
        onFocus={e => e.target.style.borderColor = BF.vert}
        onBlur={e => e.target.style.borderColor = "#e5e7eb"}
      />
    </div>
  );
}

export function Select({ label, value, onChange, options }) {
  return (
    <div>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 }}>{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)} style={{ ...baseInput, cursor: "pointer" }}>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

export function PhotoUpload({ photo, onChange }) {
  const fileRef = useRef();
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px", background: "#f9fafb", borderRadius: 12, border: "1.5px solid #e5e7eb", flexWrap: "wrap" }}>
      <div onClick={() => fileRef.current.click()}
        style={{ width: 80, height: 80, borderRadius: "50%", cursor: "pointer", border: `3px dashed ${photo ? BF.vert : "#d1d5db"}`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: photo ? "transparent" : "white", flexShrink: 0, transition: "all 0.2s" }}>
        {photo
          ? <img src={photo} alt="Photo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <div style={{ textAlign: "center", color: "#9ca3af" }}><span style={{ fontSize: 24 }}>📷</span><div style={{ fontSize: 8, marginTop: 2, fontWeight: 700 }}>PHOTO</div></div>
        }
      </div>
      <div style={{ flex: 1, minWidth: 160 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#374151", marginBottom: 3 }}>Photo de profil</div>
        <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 8, lineHeight: 1.5 }}>Optionnel. Améliore votre CV.</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => fileRef.current.click()} style={{ padding: "5px 12px", background: BF.vertLight, border: `1.5px solid ${BF.vert}`, borderRadius: 8, color: BF.vertFonce, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>
            Importer
          </button>
          {photo && <button onClick={() => onChange(null)} style={{ padding: "5px 10px", background: BF.rougeLight, border: `1.5px solid ${BF.rouge}`, borderRadius: 8, color: BF.rouge, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>Supprimer</button>}
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
    </div>
  );
}

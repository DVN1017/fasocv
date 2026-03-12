export default function FasoCV() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(155deg, #0a0f05 0%, #1a1200 45%, #0a0a0a 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "'Segoe UI', sans-serif", textAlign: "center", padding: 20
    }}>
      <div style={{ marginBottom: 32 }}>
        <span style={{ fontSize: 48, fontWeight: 900, color: "white" }}>
          Faso<span style={{ color: "#EF2B2D" }}>CV</span>
        </span>
      </div>

      <div style={{ fontSize: 52, marginBottom: 20 }}>🔧</div>

      <h1 style={{ color: "white", fontSize: 26, fontWeight: 800, margin: "0 0 12px" }}>
        Maintenance en cours
      </h1>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, maxWidth: 400, lineHeight: 1.7, margin: "0 0 32px" }}>
        Nous améliorons FasoCV pour vous offrir une meilleure expérience.<br/>
        Le site sera de retour très prochainement.
      </p>

      <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "14px 28px" }}>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
          Des questions ? <a href="https://wa.me/22669064476" style={{ color: "#EF2B2D", textDecoration: "none", fontWeight: 700 }}>Contactez-nous sur WhatsApp</a>
        </span>
      </div>

      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, marginTop: 48 }}>© 2025 FasoCV</p>
    </div>
  );
}

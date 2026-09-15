// Shared Open Graph / Twitter card visual (1200x630).
// Rendered by next/og (satori): inline styles only, no Tailwind,
// no external fonts or images — everything is local and deterministic.
export function OgCard({ locale, title, tagline }: { locale: string; title: string; tagline: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "72px 80px",
        backgroundColor: "#0b1020",
        color: "#ffffff",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            backgroundColor: "#1e46d6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 800,
          }}
        >
          X
        </div>
        <div style={{ marginLeft: 16, fontSize: 24, letterSpacing: 4, color: "#dbe6fe" }}>
          XPLOR DIGITAL · {locale.toUpperCase()}
        </div>
      </div>
      <div style={{ marginTop: 32, fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>{title}</div>
      <div style={{ marginTop: 20, fontSize: 30, lineHeight: 1.4, color: "#94a3b8" }}>{tagline}</div>
      <div style={{ marginTop: 40, width: 120, height: 8, borderRadius: 4, backgroundColor: "#1e46d6" }} />
    </div>
  );
}

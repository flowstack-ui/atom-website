import { ImageResponse } from "next/og";

export const alt = "Atom UI — Behavior at the smallest useful unit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#071114", color: "#edf8f8", fontFamily: "sans-serif" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", background: "radial-gradient(circle at 78% 42%, #124b53 0, #071114 45%)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", opacity: .2, backgroundImage: "linear-gradient(#62dbe4 1px, transparent 1px), linear-gradient(90deg, #62dbe4 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "62%", padding: "74px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 650 }}><div style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #62dbe4", borderRadius: "50%" }}><div style={{ width: 10, height: 10, borderRadius: "50%", background: "#62dbe4" }} /></div>Atom UI</div>
        <div style={{ display: "flex", marginTop: 44, fontSize: 72, fontWeight: 650, lineHeight: .98, letterSpacing: -4 }}>Behavior at the smallest useful unit.</div>
        <div style={{ display: "flex", marginTop: 30, color: "#afc9cb", fontSize: 26 }}>Accessible, headless React primitives.</div>
      </div>
      <div style={{ position: "absolute", right: 88, top: 118, width: 330, height: 330, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #36767d", borderRadius: "50%", transform: "rotate(-18deg)" }}><div style={{ width: 110, height: 110, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "#10363b", boxShadow: "0 0 80px #1f8e99" }}><div style={{ width: 26, height: 26, borderRadius: "50%", background: "#62dbe4" }} /></div><div style={{ position: "absolute", right: 29, top: 35, width: 24, height: 24, borderRadius: "50%", background: "#3c79f5" }} /></div>
    </div>,
    size,
  );
}

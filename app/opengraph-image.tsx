import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// One generated OG image for every page (Next picks it up by file name).
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#e8f3f2" }}>
        <div style={{ fontSize: 34, color: "#0f6e6a" }}>{site.role}</div>
        <div style={{ fontSize: 84, fontWeight: 700, color: "#1c2230", marginTop: 16 }}>{site.name}</div>
        <div style={{ fontSize: 34, color: "#5b6475", marginTop: 24 }}>Case studies and personal projects</div>
      </div>
    ),
    size,
  );
}

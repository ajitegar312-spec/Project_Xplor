import { ImageResponse } from "next/og";

// Served as the apple-touch-icon (180x180 PNG), generated at build/request
// time — no binary asset or external image needed.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1e46d6",
          borderRadius: 40,
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <span style={{ fontSize: 110, fontWeight: 800, color: "#ffffff" }}>X</span>
      </div>
    ),
    { ...size }
  );
}

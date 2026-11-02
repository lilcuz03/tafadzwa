import { ImageResponse } from "next/og";

export const alt = "taachii | Fullstack Web & Mobile Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#08090a",
        backgroundImage:
          "radial-gradient(circle at 10% 6%, rgba(34,211,238,0.38), transparent 45%), radial-gradient(circle at 94% 100%, rgba(251,146,60,0.32), transparent 45%)",
        color: "#fafafa",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 46,
          fontWeight: 700,
          letterSpacing: -2,
        }}
      >
        taachii<span style={{ color: "#fb923c" }}>.</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 1.03,
            letterSpacing: -4,
          }}
        >
          Websites and apps built to stand out.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 32,
            color: "#a1a1aa",
          }}
        >
          Next.js · React Native · Flutter · Durban, South Africa
        </div>
      </div>
    </div>,
    { ...size },
  );
}

import { ImageResponse } from "next/og";

// Shared branded share image. Each page's opengraph-image.tsx calls this with its own title.
export function ogImage(title: string, subtitle: string) {
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
            fontSize: 112,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -5,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 34,
            color: "#a1a1aa",
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}

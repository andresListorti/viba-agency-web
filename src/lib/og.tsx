import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

export async function renderOg({ title, kicker }: { title: string; kicker: string }) {
  const font = await readFile(join(process.cwd(), "assets/Aileron-Black.otf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          color: "#f5f4f0",
          padding: "72px 80px",
          fontFamily: "Aileron",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 44, letterSpacing: -2 }}>
          <span>
            viba<span style={{ color: "rgba(245,244,240,.5)" }}>.</span>
          </span>
          <span style={{ fontSize: 26, letterSpacing: 0, color: "rgba(245,244,240,.5)" }}>{kicker}</span>
        </div>
        <div style={{ fontSize: title.length > 22 ? 104 : 140, lineHeight: 0.9, letterSpacing: -6, maxWidth: 1000 }}>{title}</div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Aileron", data: font, weight: 900, style: "normal" }] }
  );
}

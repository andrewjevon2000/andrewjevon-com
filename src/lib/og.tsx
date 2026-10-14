/**
 * og.tsx — helper bersama untuk dynamic OG image (next/og ImageResponse).
 * Dipakai oleh src/app/opengraph-image.tsx, twitter-image.tsx, dan varian
 * per-route case study. Warna mengikuti token Aurora (DESIGN.md):
 *   Aurora Light: bg #ffffff · txt #141414 · dim #5f5f68 · dimmer #6f6f78
 *   accent biru #2f7cf6 → #1d4ed8
 *
 * Catatan: sengaja tidak memuat font kustom (Hanken Grotesk) agar build tidak
 * bergantung pada fetch jaringan — next/og memakai font default bawaannya.
 */
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;

const GRAD = "linear-gradient(100deg, #2f7cf6, #1d4ed8)";

type OgArgs = {
  /** Label mono kecil di atas judul, mis. "PORTFOLIO · andrewjevon.com". */
  eyebrow: string;
  /** Judul besar (nama / klien). */
  title: string;
  /** Bagian subjudul non-gradient. */
  subtitleLead: string;
  /** Bagian subjudul yang di-render gradient violet→cyan. */
  subtitleAccent: string;
};

export function ogImageResponse({ eyebrow, title, subtitleLead, subtitleAccent }: OgArgs) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Eyebrow — label mono */}
        <div
          style={{
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6f6f78",
          }}
        >
          {eyebrow}
        </div>

        {/* Judul + subjudul */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#141414",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 28,
              fontSize: 40,
              color: "#5f5f68",
            }}
          >
            <span>{subtitleLead}</span>
            <span
              style={{
                backgroundImage: GRAD,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {subtitleAccent}
            </span>
          </div>
        </div>

        {/* Aksen bar gradient di bawah */}
        <div
          style={{
            width: 240,
            height: 8,
            borderRadius: 999,
            backgroundImage: GRAD,
          }}
        />
      </div>
    ),
    { ...OG_SIZE }
  );
}

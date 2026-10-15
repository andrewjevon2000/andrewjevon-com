import { OG_SIZE, OG_CONTENT_TYPE, ogImageResponse } from "@/lib/og";

export const alt = "Andrew Jevon · Growth Digital Marketer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImageResponse({
    eyebrow: "PORTFOLIO · andrewjevon.com",
    title: "Andrew Jevon",
    subtitleLead: "Growth Digital Marketer · ",
    subtitleAccent: "Performance, SEO, Web, UX",
  });
}

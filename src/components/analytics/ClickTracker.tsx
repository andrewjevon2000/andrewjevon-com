"use client";

import { useEffect } from "react";
import { track, type TrackEvent } from "@/lib/analytics";

/* Satu listener klik untuk seluruh situs: elemen dengan data-track="<event>"
   (plus data-location / data-project opsional) mengirim satu event GA4.
   Komponen server cukup menambah atribut data-*, tanpa jadi client component.
   Hanya elemen terdekat yang dihitung, jadi satu klik = satu event. */
export default function ClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const { track: event, location, project } = el.dataset;
      if (!event) return;
      const params: Record<string, string> = {};
      if (location) params.cta_location = location;
      if (project) params.project = project;
      track(event as TrackEvent, params);
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

/* Event analytics (GA4 via gtag dari @next/third-parties).
   - Tidak melakukan apa pun bila GA4 belum dimuat (NEXT_PUBLIC_GA_ID kosong).
   - JANGAN pernah mengirim nama, email atau isi pesan dari form. Hanya nama event,
     lokasi CTA, slug project, dan kategori tetap (mis. topik form). */

export type TrackEvent =
  | "hero_work_click"
  | "case_study_click"
  | "contact_cta_click"
  | "email_click"
  | "form_start"
  | "form_submit_success"
  | "form_submit_error";

type Params = Record<string, string | number>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: TrackEvent, params: Params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

"use client";

import { useEffect, useRef, useState } from "react";
import { contact } from "@/lib/content";
import { track } from "@/lib/analytics";
import { CircleAlert, CircleCheck } from "@/components/ui/Lucide";

/* Form kontak dengan dua mode:
   1. Formspree (NEXT_PUBLIC_FORMSPREE_ENDPOINT diisi, format https://formspree.io/f/<id>):
      kirim via fetch, status Sending… → sukses HANYA setelah server membalas OK.
      Gagal → input tetap, tombol coba lagi + opsi email.
   2. Belum ada endpoint: tombol berlabel jelas "buka aplikasi email" (mailto, terisi).
      Tidak pernah menampilkan "terkirim" karena kami tidak tahu apakah email dikirim.
   Tanpa JS: form tetap bisa dikirim (action = endpoint Formspree atau mailto).
   Analytics: hanya nama event + topik (pilihan tetap). Nama/email/isi pesan TIDAK dikirim. */

const ENDPOINT = (process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "").trim();
const LIVE = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(ENDPOINT);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "name" | "email" | "topic" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "success" | "error";

const empty: Values = { name: "", email: "", topic: "", message: "" };

function mailtoHref(v: Values) {
  const subject = encodeURIComponent(`${v.topic || "Hello"} · ${v.name || "Website contact"}`);
  const body = encodeURIComponent(`${v.message}\n\n${v.name}\n${v.email}`);
  return `mailto:${contact.email}?subject=${subject}&body=${body}`;
}

export default function ContactForm() {
  const f = contact.form;
  const formRef = useRef<HTMLFormElement>(null);
  const started = useRef(false);
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  /* Validasi bawaan browser tetap aktif tanpa JS; dengan JS kita pakai pesan sendiri di dekat field. */
  useEffect(() => {
    if (formRef.current) formRef.current.noValidate = true;
  }, []);

  function validate(values: Values): Errors {
    const e: Errors = {};
    if (!values.name.trim()) e.name = f.errors.name;
    if (!values.email.trim()) e.email = f.errors.email;
    else if (!EMAIL_RE.test(values.email.trim())) e.email = f.errors.emailFormat;
    if (!values.message.trim()) e.message = f.errors.message;
    return e;
  }

  function update(field: Field, value: string) {
    setV((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function onFirstInteraction() {
    if (started.current) return;
    started.current = true;
    track("form_start");
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate(v);
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#cf-${first}`)?.focus();
      return;
    }

    if (!LIVE) {
      track("email_click", { cta_location: "contact_form" });
      window.location.href = mailtoHref(v);
      return;
    }

    setStatus("sending");
    const honeypot = (formRef.current?.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: v.name.trim(),
          email: v.email.trim(),
          topic: v.topic || "Not specified",
          message: v.message.trim(),
          _subject: `andrewjevon.com: ${v.topic || "New message"}`,
          _gotcha: honeypot,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setV(empty);
        track("form_submit_success", { form_topic: v.topic || "none" });
      } else {
        setStatus("error");
        track("form_submit_error", { reason: "server", status_code: res.status });
      }
    } catch {
      setStatus("error");
      track("form_submit_error", { reason: "network" });
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center gap-3 rounded-[50px] bg-card p-10 text-center shadow-soft">
        <CircleCheck className="h-10 w-10 text-ink" />
        <p className="text-[24px] font-semibold tracking-[-0.04em] text-ink">{f.success.title}</p>
        <p className="text-[16px] font-medium text-muted">{f.success.body}</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-light mt-2 border border-card-3 px-5">
          Send another message
        </button>
      </div>
    );
  }

  const input =
    "w-full rounded-[18px] border border-muted/60 bg-white px-4 py-3 text-[16px] text-ink placeholder:text-muted focus:border-blue focus:outline-none aria-[invalid=true]:border-ink";
  const label = "mb-2 block text-[15px] font-semibold text-ink";
  const sending = status === "sending";

  const fieldError = (field: Field) =>
    errors[field] ? (
      <p id={`cf-${field}-error`} className="mt-2 flex items-center gap-1.5 text-[14px] font-semibold text-ink">
        <CircleAlert className="h-4 w-4 shrink-0" /> {errors[field]}
      </p>
    ) : null;

  const aria = (field: Field) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `cf-${field}-error` : undefined,
  });

  return (
    <form
      ref={formRef}
      action={LIVE ? ENDPOINT : `mailto:${contact.email}`}
      method="post"
      encType={LIVE ? undefined : "text/plain"}
      onSubmit={submit}
      onFocus={onFirstInteraction}
      aria-busy={sending || undefined}
      className="flex flex-col gap-6 rounded-[50px] bg-card p-6 shadow-soft md:p-8"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            {f.name.label}
          </label>
          <input id="cf-name" name="name" required autoComplete="name" placeholder={f.name.placeholder} className={input} value={v.name} onChange={(e) => update("name", e.target.value)} {...aria("name")} />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>
            {f.email.label}
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder={f.email.placeholder} className={input} value={v.email} onChange={(e) => update("email", e.target.value)} {...aria("email")} />
          {fieldError("email")}
        </div>
      </div>
      <div>
        <label htmlFor="cf-topic" className={label}>
          {f.topic.label} <span className="font-medium text-muted">({f.topic.optional})</span>
        </label>
        <select id="cf-topic" name="topic" className={`${input} appearance-auto`} value={v.topic} onChange={(e) => update("topic", e.target.value)}>
          <option value="">{f.topic.placeholder}</option>
          {f.topic.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cf-message" className={label}>
          {f.message.label}
        </label>
        <textarea id="cf-message" name="message" required rows={5} placeholder={f.message.placeholder} className={`${input} min-h-[140px] resize-y`} value={v.message} onChange={(e) => update("message", e.target.value)} {...aria("message")} />
        {fieldError("message")}
      </div>

      {/* Honeypot anti-spam Formspree: tersembunyi dari pengguna & pembaca layar */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {status === "error" && (
        <div role="alert" className="flex flex-col gap-3 rounded-[28px] bg-white p-5 shadow-softer">
          <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
            <CircleAlert className="h-5 w-5 shrink-0" /> {f.error}
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="submit" className="btn btn-dark px-4 text-[15px]">
              {f.retry}
            </button>
            <a href={mailtoHref(v)} className="btn btn-light border border-card-3 px-4 text-[15px]" data-track="email_click" data-location="form_error">
              Send it by email instead
            </a>
          </div>
        </div>
      )}

      {status !== "error" && (
        <button type="submit" disabled={sending} className="btn btn-dark w-full py-3 disabled:cursor-wait disabled:opacity-70">
          {sending ? f.sending : LIVE ? f.submit : f.submitEmail}
        </button>
      )}
      {!LIVE && <p className="-mt-2 text-center text-[14px] font-medium leading-[1.4] text-muted">{f.emailModeNote}</p>}
    </form>
  );
}

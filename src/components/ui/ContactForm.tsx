"use client";

import { useState } from "react";
import { contact } from "@/lib/content";

/* Form tanpa backend: kirim lewat mailto (isi form jadi badan email).
   Tanpa JS, tombol tetap membuka email kosong ke alamat yang sama. */
export default function ContactForm() {
  const [v, setV] = useState({ name: "", email: "", topic: "", message: "" });
  const f = contact.form;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`${v.topic || "Hello"} · ${v.name || "Website contact"}`);
    const body = encodeURIComponent(`${v.message}\n\n${v.name}\n${v.email}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }

  const input =
    "w-full rounded-[18px] border border-card-2 bg-white px-4 py-3 text-[14px] text-ink placeholder:text-muted/70 focus:border-blue focus:outline-none";
  const label = "hand mb-2 block text-[18px] text-blue";

  return (
    <form
      action={`mailto:${contact.email}`}
      method="post"
      encType="text/plain"
      onSubmit={submit}
      className="flex flex-col gap-6 rounded-[50px] bg-card p-6 shadow-soft md:p-8"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            {f.name.label}
          </label>
          <input id="name" name="name" autoComplete="name" placeholder={f.name.placeholder} className={input} value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            {f.email.label}
          </label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder={f.email.placeholder} className={input} value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} />
        </div>
      </div>
      <div>
        <label htmlFor="topic" className={label}>
          {f.topic.label}
        </label>
        <input id="topic" name="topic" placeholder={f.topic.placeholder} className={input} value={v.topic} onChange={(e) => setV({ ...v, topic: e.target.value })} />
      </div>
      <div>
        <label htmlFor="message" className={label}>
          {f.message.label}
        </label>
        <textarea id="message" name="message" rows={4} placeholder={f.message.placeholder} className={`${input} min-h-[120px] resize-y`} value={v.message} onChange={(e) => setV({ ...v, message: e.target.value })} />
      </div>
      <button type="submit" className="btn btn-dark w-full py-3">
        {f.submit}
      </button>
    </form>
  );
}

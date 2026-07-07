"use client";

import { useState } from "react";
import { contact } from "@/lib/content";

/* F7: copy-email button — klik = salin ke clipboard + label "✓ copied" */
export default function EmailButton() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="cursor-pointer rounded-[14px] border border-line bg-panel px-[30px] py-[18px] font-mono text-[clamp(14px,2vw,19px)] text-txt transition-all duration-300 hover:border-accent hover:shadow-[0_0_40px_-8px_var(--accent-glow)]"
    >
      {contact.email}
      <span className="ml-3 text-[13px] text-accent">
        {copied ? contact.emailCopiedLabel : contact.emailCopyLabel}
      </span>
    </button>
  );
}

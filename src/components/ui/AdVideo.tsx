"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "@/components/ui/Lucide";

/* Video iklan di kartu: utuh (object-contain), tidak dipotong, tidak ditarik.
   Baru dimuat dan diputar saat terlihat, tanpa suara dan berulang.
   Tap untuk menyalakan suara. Reduced motion: tidak autoplay, tap untuk memutar. */
export default function AdVideo({
  src,
  poster,
  soundOn,
  soundOff,
}: {
  src: string;
  poster: string;
  soundOn: string;
  soundOff: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = src;
          if (!reduce) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (!v.src) v.src = src;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  };

  return (
    <button type="button" onClick={toggle} className="group relative block h-full w-full" aria-label={muted ? soundOn : soundOff}>
      <video
        ref={ref}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        className="relative block h-full w-full object-contain"
      />
      <span className="absolute bottom-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-ink/70 text-white backdrop-blur-md" aria-hidden>
        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </span>
    </button>
  );
}

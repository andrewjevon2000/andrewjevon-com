/* Adaptive quality (DESIGN.md WebGL / PRD F4):
   jumlah partikel & DPR cap ditentukan dari deviceMemory + hardwareConcurrency.
   Desktop ~110–300 partikel, mobile ≤ 50. DPR cap 1.5 mobile / 2 desktop. */

declare global {
  interface Navigator {
    deviceMemory?: number;
  }
}

export type Quality = {
  particleCount: number;
  dpr: number;
  isMobile: boolean;
};

export function getQuality(): Quality {
  const isMobile = window.innerWidth < 820;
  const mem = navigator.deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency ?? 4;

  let particleCount: number;
  if (isMobile) {
    particleCount = mem <= 2 || cores <= 4 ? 30 : 45;
  } else if (mem >= 8 && cores >= 8) {
    particleCount = 220;
  } else if (mem <= 4 || cores <= 4) {
    particleCount = 110;
  } else {
    particleCount = 160;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
  return { particleCount: Math.min(particleCount, isMobile ? 50 : 300), dpr, isMobile };
}

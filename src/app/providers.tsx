"use client";

import Link from "next/link";
import { Theme } from "@astryxdesign/core/theme";
import { LinkProvider } from "@astryxdesign/core/Link";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";

export function Providers({ children }: { children: React.ReactNode }) {
  // mode dark permanen — situs ini dark-only (PRD F9)
  return (
    <Theme theme={neutralTheme} mode="dark">
      <LinkProvider component={Link}>{children}</LinkProvider>
    </Theme>
  );
}

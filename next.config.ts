import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  /* URL lama dari situs Framer masih terindeks Google (mis. /projects/maka-motors).
     301 ke halaman baru supaya ranking dan tautan lama tidak hilang. */
  async redirects() {
    return [
      { source: "/projects/:slug", destination: "/work/:slug", permanent: true },
      { source: "/projects", destination: "/#works-section", permanent: true },
      { source: "/work", destination: "/#works-section", permanent: true },
    ];
  },
};

export default nextConfig;

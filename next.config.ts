import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  metadataBase: new URL("https://flashusdts.shop"),
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;

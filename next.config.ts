import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.4.36"],
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

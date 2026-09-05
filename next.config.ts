import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tnazul-dev.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "tnazul-dev-441395444088-ap-south-1-an.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

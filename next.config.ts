import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
    remotePatterns:[
      {
        protocol: "https",
        hostname: "slinkybuilding-us.backendless.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/**",
      },

    ],
  }
};

export default nextConfig;

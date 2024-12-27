import type { NextConfig } from "next";

const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'prd.place',
              pathname: '/**',
          },
      ],
  },
};

export default nextConfig;

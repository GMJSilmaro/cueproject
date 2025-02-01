import type { NextConfig } from 'next';
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: (config) => {
    config.resolve.alias['@radix-ui/react-select'] = path.resolve(__dirname, 'node_modules/@radix-ui/react-select');
    return config;
  },
  images: {
    domains: ['picsum.photos', 'api.dicebear.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**',
      },
    ],
  },
};

export default nextConfig;

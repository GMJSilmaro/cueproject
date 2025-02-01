import type { NextConfig } from 'next';
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'cueprojectdjs-git-main-gilberts-projects-584a51b2.vercel.app', 'cueprojectdjs-git-main-gilberts-projects-584a51b2.vercel.app', 'https://cueprojectdjs.vercel.app/']
    }
  },
  webpack: (config) => {
    config.resolve.alias['@radix-ui/react-select'] = path.resolve(__dirname, 'node_modules/@radix-ui/react-select');
    return config;
  },
  images: {
    domains: ['picsum.photos', 'api.dicebear.com', 'lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;

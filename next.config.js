/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'cueprojectdjs-git-main-gilberts-projects-584a51b2.vercel.app', 'https://cueprojectdjs.vercel.app']
    },
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), '@prisma/client', 'bcrypt'];
    }
    config.resolve.alias['@radix-ui/react-select'] = require('path').resolve(__dirname, 'node_modules/@radix-ui/react-select');
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
  poweredByHeader: false,
};

module.exports = nextConfig; 
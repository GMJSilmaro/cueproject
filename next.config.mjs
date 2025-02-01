/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    serverActions: true,
    optimizePackageImports: ['@radix-ui/react-icons', '@heroicons/react'],
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  },
  output: 'standalone',
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), '@prisma/client', 'bcrypt'];
    }
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
  }
};

export default nextConfig; 
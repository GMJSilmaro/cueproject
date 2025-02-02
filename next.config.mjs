/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', '@heroicons/react'],
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  },
  output: 'standalone',
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    if (!config.externals) {
      config.externals = [];
    }
    if (Array.isArray(config.externals)) {
      config.externals = [...config.externals, '@prisma/client', 'bcrypt'];
    }
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });
    return config;
  },
  // Ensure CSS/SCSS modules are handled properly
  sassOptions: {
    includePaths: ['./styles'],
  },
  // Enable source maps in production for better debugging
  productionBrowserSourceMaps: true,
};

export default nextConfig; 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for optimized Docker deployments
  output: 'standalone',

  // Reduce build time by skipping type checking (run separately)
  typescript: {
    ignoreBuildErrors: false,
  },

  // Optimize images
  images: {
    unoptimized: true,
  },

  // Enable experimental features for faster dev
  experimental: {
    // Optimize package imports for faster builds
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      'recharts',
      'date-fns',
    ],
  },

  // Turbopack configuration
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig

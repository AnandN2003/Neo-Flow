/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ["gateway.pinata.cloud", "ipfs.io", "cloudflare-ipfs.com"],
    // Remove unoptimized for production
    formats: ['image/webp', 'image/avif'],
  },

  // Remove trailingSlash for better SEO
  // trailingSlash: true,

  // Add security headers for production
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Webpack configuration for handling node modules in browser
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Only disable cache in production builds, keep it enabled in dev for better HMR
    if (!dev) {
      config.cache = false;
    }
    
    // Optimize for disk space only in production
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxSize: 244000,
        },
      };
    }

    return config;
  },

  // Environment variables
  env: {
    CUSTOM_KEY: "my-value",
  },

  // Updated experimental features (removed deprecated reactRoot)
  experimental: {
    // Modern experimental features for current Next.js versions
    serverComponentsExternalPackages: [],
  },

  // Headers for security (only in production)
  async headers() {
    // Only apply caching headers in production
    if (process.env.NODE_ENV !== 'production') {
      return [];
    }
    
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

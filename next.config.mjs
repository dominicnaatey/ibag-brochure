import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack configuration to silence webpack config detection
  turbopack: {},
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(gstatic|googleapis)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
        }
      }
    },
    {
      // Same-origin only: static font assets
      urlPattern: ({ url }) => url.origin === self.location.origin && /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i.test(url.pathname),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-font-assets',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
        }
      }
    },
    {
      // Same-origin only: static image assets
      urlPattern: ({ url }) => url.origin === self.location.origin && /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i.test(url.pathname),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-image-assets',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    },
    {
      // Same-origin only: API routes
      urlPattern: ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/api/'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'apis',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        },
        networkTimeoutSeconds: 10
      }
    }
  ]
});

export default withPWAConfig(nextConfig);

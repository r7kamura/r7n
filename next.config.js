/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: "/api/feed",
        source: "/feed.xml",
      },
    ];
  },
};

module.exports = nextConfig;

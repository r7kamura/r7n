/** @type {import('next').NextConfig} */

const nextConfig = {
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

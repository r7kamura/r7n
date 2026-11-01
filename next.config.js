/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  output: "export",
  reactStrictMode: true,
};

module.exports = nextConfig;

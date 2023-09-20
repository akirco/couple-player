/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pic.lzzypic.com',
      },
      {
        protocol: 'https',
        hostname: 'pic.wujinpp.com',
      },
    ],
  },
};

module.exports = nextConfig;

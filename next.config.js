/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pic.wujinpp.com',
      },
      {
        protocol: 'https',
        hostname: 'pic.wlongimg.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.heimuer.tv',
      },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
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

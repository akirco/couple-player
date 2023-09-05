/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pic.lzzypic.com',
      },
    ],
  },
};

module.exports = nextConfig;

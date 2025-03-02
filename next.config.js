/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pic.wujinpp.com",
      },
      {
        protocol: "https",
        hostname: "pic.wlongimg.com",
      },
      {
        protocol: "https",
        hostname: "assets.heimuer.tv",
      },
      {
        protocol: "https",
        hostname: "pic.youkupic.com",
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

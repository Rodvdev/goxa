/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Disable Next.js built-in ESLint integration
  },
};

module.exports = nextConfig; 
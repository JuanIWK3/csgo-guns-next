/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['static.wikia.nocookie.net', '2.bp.blogspot.com'],
    loader: 'custom',
    path: '/',
  },
};

module.exports = nextConfig;

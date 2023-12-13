/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["cloud.appwrite.io", "links.papareact.com"],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "storage.googleapis.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;

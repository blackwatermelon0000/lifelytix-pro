import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: true, // 308 redirect
      },
    ];
  },
}

module.exports = nextConfig;

export default nextConfig;

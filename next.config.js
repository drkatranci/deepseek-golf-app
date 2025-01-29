

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: false, // Disable worker threads
    cpus: 1, // Limit the build process to use only 1 CPU
  },
  // You can add other config options here if needed
  reactStrictMode: true, // Enable React Strict Mode
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
    memoryBasedWorkersCount: true
  },
  allowedDevOrigins: [
    'ais-dev-vaqqeg7mzzpql57z5mtq2r-406872955515.europe-west2.run.app',
    'ais-pre-vaqqeg7mzzpql57z5mtq2r-406872955515.europe-west2.run.app'
  ],
};

export default nextConfig;

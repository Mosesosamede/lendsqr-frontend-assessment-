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
    'https://moses-0-0-lendsqr-fe-test.vercel.app/',
    'https://moses-0-0-lendsqr-fe-test.vercel.app/'
  ],
};

export default nextConfig;

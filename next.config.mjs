/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
        port: '',
        pathname: '/v1/storage/buckets/**/files/**/view',
      },
    ],
  },
  outputFileTracing: true,
  experimental: {
    appDir: true,
  },
};

export default nextConfig;

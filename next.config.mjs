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
    appDir: true, // Aktivera detta om du använder app-mappen i Next.js 13 eller senare
  },
};

export default nextConfig;

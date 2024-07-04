/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
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
  webpack: (config, { isServer }) => {
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.emit.tapAsync('LogFilesPlugin', (compilation, callback) => {
          console.log('Assets being emitted:', Object.keys(compilation.assets));
          callback();
        });
      }
    });

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;

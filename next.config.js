/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
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
    if (isServer) {
      console.log("Building server-side...");
    } else {
      console.log("Building client-side...");
    }

    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.emit.tapAsync('LogFilesPlugin', (compilation, callback) => {
          console.log('Assets being emitted:', Object.keys(compilation.assets));
          callback();
        });
      }
    });

    return config;
  },
};

module.exports = nextConfig;

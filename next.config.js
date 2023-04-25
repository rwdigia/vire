/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: [new URL(process.env.NEXT_PUBLIC_ADOBE_COMMERCE_URL).hostname],
  },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
  output: 'standalone',
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
      })
    : (config) => config;

module.exports = withBundleAnalyzer(nextConfig);

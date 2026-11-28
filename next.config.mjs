/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The catalog metadata is derived locally. Include it in the first HTML head.
  htmlLimitedBots: /.*/,
};

export default nextConfig;

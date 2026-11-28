/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The catalog metadata is derived locally. Include it in the first HTML head.
  htmlLimitedBots: /.*/,
  // Each locale has its own root layout and document language.
  experimental: { globalNotFound: true },
  async redirects() {
    return [{
      source: "/product-category/routes/marshrut-petrovskaya-venetsiya",
      destination: "/routes/petrovskaya-venetsiya",
      permanent: true,
    }];
  },
};

export default nextConfig;

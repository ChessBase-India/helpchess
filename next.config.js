/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // story thumbnails used in the hero collage
    remotePatterns: [{ protocol: "https", hostname: "cbin.b-cdn.net" }],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

module.exports = nextConfig;

import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.tonapi.io",
        port: "",
        pathname: "**"
      },
      {
        protocol: "http",
        hostname: "**.tonapi.io",
        port: "",
        pathname: "**"
      },
    ]
  }
};

export default withNextIntl(nextConfig);
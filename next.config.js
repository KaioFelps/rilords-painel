/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["rilords-mu.vercel.app"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rilords-mu.vercel.app",
        port: "80",
        pathname: "assets/img/**/**",
      }
    ],
  }
}

module.exports = nextConfig

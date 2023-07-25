/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "192.168.15.187",
      },
      {
        hostname: "find-a-friend-api-srvo.onrender.com",
      },
    ],
  },
};

module.exports = nextConfig;

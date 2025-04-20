/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i3.ytimg.com", // Allow YouTube thumbnails
        port: "",
        pathname: "/vi/**", // Allow paths starting with /vi/
      },
    ],
  },
};

export default nextConfig;

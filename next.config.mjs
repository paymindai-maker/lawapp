/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["firebase-admin", "@google-cloud/firestore", "@opentelemetry/api"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
}

export default nextConfig

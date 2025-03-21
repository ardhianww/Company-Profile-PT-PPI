/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vrleemvx3wvysqm2.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;


// // next.config.js
// module.exports = {
//   eslint: {
//     ignoreDuringBuilds: true, // Nonaktifkan ESLint selama build
//   },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // সব ধরনের এক্সটার্নাল ইমেজ হোস্ট করার অনুমতি দেওয়ার জন্য
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;

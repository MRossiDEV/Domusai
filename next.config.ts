import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Seed/demo property photos.
      { protocol: "https", hostname: "images.unsplash.com" },
      // Supabase Storage, once property images are uploaded there instead
      // of pasted as external URLs.
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/**" },
    ],
  },
};

export default nextConfig;

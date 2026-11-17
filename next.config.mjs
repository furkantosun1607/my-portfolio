import mdx from "@next/mdx";
import { fileURLToPath } from "node:url";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/work/automate-design-handovers-with-a-figma-to-code-pipeline",
        destination: "/work/tsn-agentic",
        permanent: true,
      },
      {
        source: "/work/ai-social-media-management",
        destination: "/work/sociact",
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withMDX(nextConfig);

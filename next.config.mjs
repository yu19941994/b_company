import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import createMDX from "@next/mdx";
import withBundleAnalyzer from "@next/bundle-analyzer";
import million from "million/compiler";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  compiler:
    process.env.NEXT_PUBLIC_DEV_MODE === "true"
      ? {}
      : {
          removeConsole: {
            exclude: ["error"],
          },
        },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sat-web-frontend.s3.ap-northeast-1.amazonaws.com",
        port: "",
        pathname: "/**/**",
      },
      {
        protocol: "https",
        hostname: "d3t3b8rxwl4mjf.cloudfront.net",
        port: "",
        pathname: "/**/**",
      },
    ],
    formats: ["image/webp"],
  },

  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?urll
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    config.module.rules.push({
      test: /\.(mp3|wav|m4a)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/audio/",
          outputPath: "static/audio/",
          name: "[name].[ext]",
        },
      },
    });
    return config;
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm, rehypeKatex, remarkMath],
    rehypePlugins: [],
  },
});

export default bundleAnalyzer(withMDX(nextConfig));

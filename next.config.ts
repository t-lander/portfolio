import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    cacheComponents: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.ctfassets.net",
                port: "",
                pathname: "/**",
            },
        ],
    },
    turbopack: {
        rules: {
            "*.md": {
                loaders: [{ loader: "raw-loader", options: {} }],
                as: "*.js",
            },
            "*.graphql": {
                loaders: [{ loader: "graphql-tag/loader", options: {} }],
                as: "*.js",
            },
        },
        resolveExtensions: ["*.graphql", ".tsx", ".ts", ".jsx", ".js", ".json"],
    },
};

export default nextConfig;

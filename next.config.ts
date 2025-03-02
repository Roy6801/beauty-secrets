import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
		],
	},
	experimental: {
		reactCompiler: true,
	},
	transpilePackages: ["lucide-react"],
};

export default nextConfig;

import { withVercelToolbar } from "@vercel/toolbar/plugins/next";
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

export default withVercelToolbar()(nextConfig);

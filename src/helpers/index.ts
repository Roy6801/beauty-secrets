import { env } from "@/env";

export const getEnv = () => {
	return {
		isDev: env.NODE_ENV === "development",
		isProd: env.NODE_ENV === "production",
	};
};

export { withProtection } from "./protected-route";

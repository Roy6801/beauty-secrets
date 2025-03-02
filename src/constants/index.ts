import { getEnv } from "@/helpers";

const { isDev } = getEnv();

export const MDX_PROCESSING_ENDPOINT = "/api/process/mdx-to-html";
export const WEBSITE_URL = isDev
	? "http://localhost:3000"
	: "https://beauty-secrets.com";

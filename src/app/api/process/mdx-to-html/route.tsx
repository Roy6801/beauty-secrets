import { env } from "@/env";
import { withProtection } from "@/helpers";
import { getRehypePlugins, getRemarkPlugins } from "@/plugins";
import { type EvaluateOptions, evaluate } from "@mdx-js/mdx";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import type { NextRequest } from "next/server";
// biome-ignore  lint/style/noNamespaceImport: This is a valid import
import * as runtime from "react/jsx-runtime";

const getStaticMarkup = async (component: React.ReactNode) => {
	const ReactDOMServer = (await import("react-dom/server")).default;
	const staticMarkup = ReactDOMServer.renderToStaticMarkup(component);
	return staticMarkup;
};

async function handleRequest(req: NextRequest) {
	try {
		const { mdx } = await req.json();
		const { default: MDXContent } = await evaluate(mdx, {
			...runtime,
			remarkPlugins: getRemarkPlugins(),
			rehypePlugins: getRehypePlugins(),
		} as EvaluateOptions);

		const htmlString = await getStaticMarkup(<MDXContent />);

		// Set up jsdom to create a virtual window object
		const window = new JSDOM("").window;

		// Initialize DOMPurify with the virtual window
		const DOMPurify = createDOMPurify(window);

		// Sanitize the HTML string
		const sanitizedHtml = DOMPurify.sanitize(htmlString);

		return Response.json({ compiled: sanitizedHtml });
	} catch (_error) {
		return Response.json(
			{ error: "Failed to process MDX content" },
			{ status: 500 },
		);
	}
}

export const { POST } = withProtection({
	method: "POST",
	handler: handleRequest,
	token: env.API_PROTECTION_TOKEN,
});

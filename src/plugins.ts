/* --- REHYPE PLUGINS --- */
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";

/* --- REMARK PLUGINS --- */
import remarkBreaks from "remark-breaks";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";

export const getRemarkPlugins = () => [remarkGfm, remarkEmoji, remarkBreaks];

/* --- REHYPE SANITIZE --- */
const eventRegex = /^on/i;

const customSchema = {
	...defaultSchema,
	tagNames: defaultSchema.tagNames?.filter(
		(tag) => !["script", "style", "iframe", "embed"].includes(tag),
	),
	attributes: {
		...defaultSchema.attributes,
		"*": (defaultSchema.attributes?.["*"] || []).filter(
			(attr) => !eventRegex.test(attr as string),
		),
		a: [...(defaultSchema.attributes?.a || []), "target", "rel"],
	},
	protocols: {
		...defaultSchema.protocols,
		href: ["http", "https", "mailto"],
		src: ["http", "https"],
	},
};

export const getRehypePlugins = () => [
	rehypeRaw,
	[rehypeSanitize, customSchema],
	rehypeSlug,
	[rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
	rehypeAutolinkHeadings,
];

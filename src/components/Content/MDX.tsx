/* -----------------Helpers--------------- */
import { cn } from "@/lib/utils";
import { type EvaluateOptions, evaluate } from "@mdx-js/mdx";

/* -----------------Globals--------------- */
// biome-ignore  lint/style/noNamespaceImport: This is a valid import
import * as runtime from "react/jsx-runtime";

/* -----------------Types--------------- */
import type { TextProps } from "./types";

export type MDXProps<T extends React.ElementType = "div"> = {
	textContent: string;
} & Omit<TextProps<T>, "children">;

const MDX = async ({ textContent, className }: MDXProps) => {
	if (!textContent) {
		return null;
	}

	const { default: MDXContent } = await evaluate(
		textContent,
		runtime as EvaluateOptions,
	);

	return (
		<div className={cn("prose prose-lg portable-text-link", className)}>
			<MDXContent />
		</div>
	);
};

export default MDX;

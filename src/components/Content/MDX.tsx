/* -----------------Helpers--------------- */
import { cn } from "@/lib/utils";
import { type EvaluateOptions, evaluate } from "@mdx-js/mdx";

/* -----------------Globals--------------- */
// biome-ignore  lint/style/noNamespaceImport: This is a valid import
import * as runtime from "react/jsx-runtime";

export type MDXProps = {
	textContent: string;
	className?: string;
};

const MDX = async ({ textContent, className }: MDXProps) => {
	if (!textContent) {
		return null;
	}

	const { default: MDXContent } = await evaluate(
		textContent,
		runtime as EvaluateOptions,
	);

	return (
		<div className={cn("prose lg:prose-lg text-foreground", className)}>
			<MDXContent />
		</div>
	);
};

export default MDX;

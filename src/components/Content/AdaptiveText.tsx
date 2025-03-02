import MDX from "./MDX";
import PortableText, { type PortableContent } from "./PortableText";

/* -----------------Utils--------------- */
import { cn } from "@/lib/utils";

/* -----------------Types--------------- */
import type { TextProps } from "./types";

export type AdaptiveTextContent = string | PortableContent;

export type AdaptiveTextProps = {
	textContent?: AdaptiveTextContent | null;
} & Omit<TextProps<"div">, "as" | "children">;

function AdaptiveText({ className, textContent, ...props }: AdaptiveTextProps) {
	if (textContent == null) {
		return null;
	}

	return (
		<>
			{typeof textContent === "string" ? (
				<MDX
					textContent={textContent}
					className={cn("mt-6 text-foreground text-lg leading-8", className)}
				/>
			) : (
				<PortableText value={textContent} className={className} {...props} />
			)}
		</>
	);
}

export default AdaptiveText;

import MDX from "./MDX";
import PortableText, { type PortableContent } from "./PortableText";

/* -----------------Utils--------------- */
import { cn } from "@/lib/utils";

export type AdaptiveTextContent = string | PortableContent;

export type AdaptiveTextProps = {
	textContent?: AdaptiveTextContent | null;
	className?: string;
};

const AdaptiveText = ({
	className,
	textContent,
	...props
}: AdaptiveTextProps) => {
	if (textContent == null) {
		return null;
	}

	return (
		<>
			{typeof textContent === "string" ? (
				<MDX
					textContent={textContent}
					className={cn(
						"mt-6 text-lg leading-8 md:text-xl lg:text-2xl",
						className,
					)}
				/>
			) : (
				<PortableText
					value={textContent}
					className={cn(
						"mt-6 text-lg leading-8 md:text-xl lg:text-2xl",
						className,
					)}
					{...props}
				/>
			)}
		</>
	);
};

export default AdaptiveText;

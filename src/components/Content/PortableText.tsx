import { PortableText as PText, type PortableTextProps } from "next-sanity";

/* -----------------Helpers--------------- */
import { cn } from "@/lib/utils";
import type { TypedObject } from "sanity";

export type PortableContent = TypedObject | TypedObject[];

type PortableContentProps = {
	as?: React.ElementType;
	value?: PortableContent | null;
	className?: string;
} & Omit<PortableTextProps, "value">;

const PortableText = ({
	as,
	className,
	value,
	...props
}: PortableContentProps) => {
	if (value == null) {
		return null;
	}

	const Component = as ?? "div";

	return (
		<Component className={cn("text-foreground leading-8", className)}>
			<PText value={value} {...props} />
		</Component>
	);
};

export default PortableText;

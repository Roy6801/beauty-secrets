import { PortableText as PText, type PortableTextProps } from "next-sanity";
/* -----------------Constants--------------- */
import { defaultAlignment, textPosition } from "./constants";

/* -----------------Types--------------- */
import type { TextProps } from "./types";

/* -----------------Helpers--------------- */
import { cn } from "@/lib/utils";
import type { TypedObject } from "sanity";

export type PortableContent = TypedObject | TypedObject[];

type TextPropsWithoutChildren<T extends React.ElementType> = Omit<
	TextProps<T>,
	"children"
>;

type PortableContentProps<T extends React.ElementType = "p"> = Omit<
	React.ComponentPropsWithoutRef<T>,
	keyof TextPropsWithoutChildren<T>
> &
	TextPropsWithoutChildren<T> &
	Omit<PortableTextProps, "value"> & {
		value?: PortableContent | null;
	};

function PortableText<T extends React.ElementType = "p">({
	as,
	className,
	textAlign = defaultAlignment,
	value,
	...props
}: PortableContentProps<T>) {
	if (value == null) {
		return null;
	}

	const Component = as ?? "div";

	return (
		<Component
			className={cn(
				"mt-6 text-foreground text-lg leading-8",
				textPosition[textAlign],
				className,
			)}
		>
			<PText value={value} {...props} />
		</Component>
	);
}

export default PortableText;

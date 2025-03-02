import AdaptiveText from "./AdaptiveText";
/* -----------------Components--------------- */
import Label from "./Label";
import MDX from "./MDX";
import MDXClient from "./MDXClient";
import PortableText from "./PortableText";
import Text from "./Text";
import Title from "./Title";

/* -----------------Constants--------------- */
import { contentPosition, defaultAlignment } from "./constants";

/* -----------------Types--------------- */
import type { AdaptiveTextContent } from "./AdaptiveText";
import type { MDXProps } from "./MDX";
import type { PortableContent } from "./PortableText";
import type { TitleProps } from "./Title";
import type { ContentProps, TextProps } from "./types";

/* -----------------Helpers--------------- */
import { cn } from "@/lib/utils";

function Content<T extends React.ElementType = "div">({
	as,
	className,
	containerClassName,
	children,
	justifyContent = defaultAlignment,
}: Omit<React.ComponentPropsWithoutRef<T>, keyof ContentProps<T>> &
	ContentProps<T>) {
	if (children == null) {
		return null;
	}

	const Component = as ?? "div";

	return (
		<Component className={cn("mx-auto max-w-7xl", className)}>
			<div
				className={cn(
					"max-w-2xl",
					contentPosition[justifyContent],
					containerClassName,
				)}
			>
				{children}
			</div>
		</Component>
	);
}

Content.Label = Label;
Content.Title = Title;
Content.Text = Text;
Content.PortableText = PortableText;
Content.AdaptiveText = AdaptiveText;
Content.MDX = MDX;
Content.MDXClient = MDXClient;

export { Content, Label, Title, Text, PortableText, MDX };
export type {
	ContentProps,
	TextProps,
	TitleProps,
	PortableContent,
	AdaptiveTextContent,
	MDXProps,
};

/* -----------------Constants--------------- */
import { defaultAlignment, textPosition } from "./constants";

/* -----------------Types--------------- */
import type { TextProps } from "./types";

/* -----------------Helpers--------------- */
import { cn } from "@/lib/utils";

function Text<T extends React.ElementType = "p">({
	as,
	className,
	children,
	textAlign = defaultAlignment,
}: Omit<React.ComponentPropsWithoutRef<T>, keyof TextProps<T>> & TextProps<T>) {
	if (children == null) {
		return null;
	}

	const Component = as ?? "p";

	return (
		<Component
			className={cn(
				"mt-6 text-foreground text-lg leading-8",
				textPosition[textAlign],
				className,
			)}
		>
			{children}
		</Component>
	);
}

export default Text;

/* -----------------Constants--------------- */
import { defaultAlignment, textPosition } from "./constants";

/* -----------------Types--------------- */
import type { TextProps } from "./types";

/* -----------------Helpers--------------- */
import { cn } from "@/lib/utils";

function Label<T extends React.ElementType = "label">({
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
				"mt-1 font-semibold text-base text-secondary leading-7",
				textPosition[textAlign],
				className,
			)}
		>
			{children}
		</Component>
	);
}

export default Label;

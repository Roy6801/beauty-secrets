/* -----------------Helpers--------------- */
import { cn } from "@/lib/utils";

type LabelProps = {
	as?: React.ElementType;
	children?: React.ReactNode;
	className?: string;
};

const Label = ({ as, className, children }: LabelProps) => {
	if (children == null) {
		return null;
	}

	const Component = as ?? "p";

	return (
		<Component
			className={cn(
				"mt-1 font-semibold text-secondary text-xs leading-7 md:text-sm lg:text-base",
				className,
			)}
		>
			{children}
		</Component>
	);
};

export default Label;

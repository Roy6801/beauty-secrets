import { cn } from "@/lib/utils";
import { ActionButton, type ActionButtonProps } from "./ActionButton";

export const ActionGroup = ({
	actions,
	className,
	buttonClassName,
}: {
	actions?: ActionButtonProps[];
	className?: string;
	buttonClassName?: string;
}) => {
	if (!actions || actions.length === 0) {
		return null;
	}

	return (
		<div className={cn("flex gap-4", className)}>
			{actions.map((action) => (
				<ActionButton
					key={action.name}
					{...action}
					className={buttonClassName}
				/>
			))}
		</div>
	);
};

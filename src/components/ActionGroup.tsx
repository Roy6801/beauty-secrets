import { cn } from "@/lib/utils";
import { ActionButton, type ActionButtonProps } from "./ActionButton";

type Position = "start" | "center" | "end";

type Props = {
	actions: ActionButtonProps[] | undefined;
	align?: Position;
	justify?: Position;
	className?: string;
};

const alignStyle = (align: Position | undefined) => {
	switch (align) {
		case "start":
			return "items-start";
		case "center":
			return "items-center";
		case "end":
			return "items-end";
		default:
			return "items-center";
	}
};

const justifyStyle = (justify: Position | undefined) => {
	switch (justify) {
		case "start":
			return "justify-start";
		case "center":
			return "justify-center";
		case "end":
			return "justify-end";
		default:
			return "justify-center";
	}
};

export const ActionGroup = ({ actions, align, justify, className }: Props) => {
	if (actions == null) {
		return null;
	}

	return (
		<div
			className={cn(
				"group flex h-auto w-auto items-center justify-end gap-x-5",
				alignStyle(align),
				justifyStyle(justify),
				className,
			)}
		>
			{actions.map((action) => (
				<ActionButton key={action.name} {...action} />
			))}
		</div>
	);
};

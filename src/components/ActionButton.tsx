import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icon, type IconName } from "./Icon";
import { Button } from "./ui/button";

type ButtonVariant =
	| "default"
	| "destructive"
	| "outline"
	| "secondary"
	| "ghost"
	| "link";

export type ActionButtonProps = {
	name: string;
	href: string;
	variant?: ButtonVariant;
	external?: boolean;
	iconLeft?: IconName;
	iconRight?: IconName;
};

export const ActionButton = ({
	name,
	href,
	variant,
	external,
	iconLeft,
	iconRight,
	className,
}: ActionButtonProps & {
	className?: string;
}) => {
	const classes = cn(
		"flex items-center gap-x-2 text-xs lg:text-sm lg:font-semibold rounded-sm",
		{
			"px-6 py-4 lg:px-8 lg:py-6": variant !== "link",
		},
		className,
	);

	return (
		<Link
			href={href}
			target={external ? "_blank" : "_self"}
			rel={external ? "noopener noreferrer" : ""}
		>
			<Button className={classes} variant={variant}>
				{iconLeft && <Icon name={iconLeft} />}
				{name}
				{iconRight && <Icon name={iconRight} />}
			</Button>
		</Link>
	);
};

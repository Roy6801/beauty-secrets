import { Icon, type IconName } from "@/components/Icon";
/* -----------------Components--------------- */
import { Button } from "@/components/ui/button";

/* -----------------Helpers--------------- */
import { cn } from "@/lib/utils";

/* -----------------Globals--------------- */
import Link from "next/link";

export type ActionButtonProps = {
	name: string;
	href?: string;
	external?: boolean;
	primary?: boolean;
	iconLeft?: IconName | null;
	iconRight?: IconName | null;
	onClick?: () => void;
	buttonVariant?: "default" | "link";
	className?: string;
	disabled?: boolean;
};

const ActionButtonHoc = ({
	children,
	href,
	external,
}: {
	children: React.ReactNode;
	href?: string;
	external?: boolean;
}) => {
	if (href) {
		return (
			<Link
				passHref
				href={href}
				target={external ? "_blank" : "_self"}
				rel={external ? "noopener noreferrer" : ""}
			>
				{children}
			</Link>
		);
	}
	return children;
};

export const ActionButton = ({
	name,
	href,
	external,
	primary,
	iconLeft,
	iconRight,
	onClick,
	buttonVariant = "default",
	className,
	disabled,
}: ActionButtonProps) => {
	if (!primary) {
		buttonVariant = "link";
	}

	return (
		<ActionButtonHoc href={href} external={external}>
			<Button
				size="sm"
				variant={buttonVariant}
				onClick={onClick}
				className={cn("flex items-center gap-2", className, {
					"font-semibold text-primary-foreground": primary && href,
					"font-bold text-secondary": !primary && href,
					"px-0 font-semibold": buttonVariant === "link",
				})}
				disabled={disabled}
			>
				{!!iconLeft && <Icon name={iconLeft} size={16} />}
				{name}
				{!!iconRight && <Icon name={iconRight} size={16} />}
			</Button>
		</ActionButtonHoc>
	);
};

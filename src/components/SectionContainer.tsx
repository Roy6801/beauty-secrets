import { cn } from "@/lib/utils";

type Props = {
	id?: string;
	className?: string;
	containerClassName?: string;
	children?: React.ReactNode;
};

export const SectionContainer = ({
	id,
	className,
	containerClassName,
	children,
}: Props) => {
	return (
		<section id={id} className={containerClassName}>
			<div className={cn("mx-auto max-w-7xl px-6 lg:px-8", className)}>
				{children}
			</div>
		</section>
	);
};

/* -----------------Components--------------- */
import { type LucideProps, icons } from "lucide-react";

export type IconName = keyof typeof icons;

export interface IconProps extends LucideProps {
	name: IconName;
}

export const Icon = ({ name, ...props }: IconProps) => {
	const LucideIcon = icons[name];

	if (!LucideIcon) {
		throw new Error(`Icon ${name} not found`);
	}

	return <LucideIcon {...props} />;
};

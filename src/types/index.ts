import type { AdaptiveTextContent } from "@/components/Content";

import type { ActionButtonProps } from "@/components/ActionButton";
import type { TitleProps } from "@/components/Content";

export type ImageDetails = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
};

export type SectionHeader<T extends React.ElementType = "h1"> = {
	heading?: string;
	description?: AdaptiveTextContent;
	actions?: ActionButtonProps[];
	className?: string;
} & TitleProps<T>;

export type SectionWithImage<T extends React.ElementType = "h1"> = {
	heroImage: ImageDetails;
	sectionId?: string;
} & SectionHeader<T>;

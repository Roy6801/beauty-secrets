import type { AdaptiveTextContent } from "@/components/Content";

import type { ActionButtonProps } from "@/components/ActionButton";
import type { TitleProps } from "@/components/Content";

export type ImageDetails = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
};

export type SectionHeader = {
	heading?: string;
	description?: AdaptiveTextContent;
	actions?: ActionButtonProps[];
	className?: string;
} & TitleProps;

export type SectionWithImage = {
	heroImage: ImageDetails;
	sectionId?: string;
} & SectionHeader;

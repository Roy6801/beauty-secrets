import type { ActionButtonProps } from "@/components/ActionButton";
import { ActionGroup } from "@/components/ActionGroup";
import { Content } from "@/components/Content";
import { SectionContainer } from "@/components/SectionContainer";
import { cn } from "@/lib/utils";
import type { SectionHeader } from "@/types";
import type { ImageDetails } from "@/types";
import Image from "next/image";

type ImageWithContentProps = {
	image: ImageDetails;
	imagePosition?: "left" | "right";
	sectionId?: string;
	className?: string;
	actions?: ActionButtonProps[];
} & SectionHeader;

const ImageWithContent = ({
	title,
	highlightText,
	titleSuffix,
	description,
	image,
	imagePosition = "left",
	actions,
	sectionId,
	className,
}: ImageWithContentProps) => {
	const isImageLeft = imagePosition === "left";

	return (
		<SectionContainer id={sectionId} className={className}>
			<div
				className={cn(
					"grid items-center gap-12 md:grid-cols-2",
					isImageLeft ? "" : "md:grid-flow-dense",
				)}
			>
				<div
					className={cn(
						"relative h-[400px] overflow-hidden rounded-lg",
						!isImageLeft && "md:col-start-2",
					)}
				>
					<Image
						src={image.src}
						alt={image.alt}
						fill
						className="object-cover"
					/>
				</div>
				<div className="space-y-6">
					<Content>
						<Content.Title
							title={title}
							highlightText={highlightText}
							titleSuffix={titleSuffix}
						/>
						<Content.AdaptiveText textContent={description} />
						<ActionGroup actions={actions} justify="start" className="pt-4" />
					</Content>
				</div>
			</div>
		</SectionContainer>
	);
};

export default ImageWithContent;

import { ActionGroup } from "@/components/ActionGroup";
import { Content } from "@/components/Content";
import { SectionContainer } from "@/components/SectionContainer";
import { cn } from "@/lib/utils";
import type { SectionWithImage } from "@/types";
import Image from "next/image";

const LeftCenterWithBackgroundImage = ({
	title,
	highlightText,
	titleSuffix,
	description,
	heroImage,
	actions,
	sectionId,
	className,
}: SectionWithImage) => {
	return (
		<SectionContainer id={sectionId} className={cn("relative", className)}>
			<div className="absolute inset-0 z-0">
				<Image
					src={heroImage.src}
					alt={heroImage.alt}
					fill
					className="object-cover brightness-[0.6]"
					priority
				/>
			</div>
			<Content>
				<Content.Title
					title={title}
					highlightText={highlightText}
					titleSuffix={titleSuffix}
				/>
				<Content.AdaptiveText textContent={description} />
				<ActionGroup actions={actions} />
			</Content>
		</SectionContainer>
	);
};

export default LeftCenterWithBackgroundImage;

import { ActionGroup } from "@/components/ActionGroup";
import { Content } from "@/components/Content";
import { SectionContainer } from "@/components/SectionContainer";
import type { SectionWithImage } from "@/types";
import Image from "next/image";

const HeroWithBackground = ({
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
		<SectionContainer
			id={sectionId}
			className={className}
			containerClassName="relative overflow-hidden h-[520px]"
		>
			<Image
				src={heroImage.src}
				alt={heroImage.alt}
				width={640}
				height={360}
				className="absolute inset-0 size-full object-cover brightness-[0.3]"
				priority
			/>

			<div className="absolute inset-0 z-10 mx-auto flex w-full max-w-none flex-col items-start justify-center px-6 lg:max-w-7xl lg:px-8">
				<Content.Title
					title={title}
					highlightText={highlightText}
					titleSuffix={titleSuffix}
					className="text-white"
				/>
				<Content.AdaptiveText
					textContent={description}
					className="text-white"
				/>
				<ActionGroup
					actions={actions}
					className="mt-8 justify-start"
					buttonClassName="flex-grow"
				/>
			</div>
		</SectionContainer>
	);
};

export default HeroWithBackground;

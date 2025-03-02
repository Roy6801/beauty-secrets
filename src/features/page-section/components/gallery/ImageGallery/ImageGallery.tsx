import { ActionButton } from "@/components/ActionButton";
import { Content } from "@/components/Content";
import Masonry from "@/components/Masonry";
import { SectionContainer } from "@/components/SectionContainer";
import type { SectionHeader } from "@/types";
import type { ImageDetails } from "@/types";
import Image from "next/image";

type GalleryItem = ImageDetails & {
	title?: string;
};

type ImageGalleryProps = {
	images: GalleryItem[];
	columns?: number;
	viewMoreLink?: string;
	viewMoreText?: string;
	sectionId?: string;
	className?: string;
} & SectionHeader;

const ImageGallery = ({
	title,
	highlightText,
	titleSuffix,
	description,
	images,
	columns = 3,
	viewMoreLink,
	viewMoreText = "View More",
	sectionId,
	className,
}: ImageGalleryProps) => {
	// Convert images to React nodes for Masonry
	const imageItems = images.map((image, index) => (
		<div
			key={index.toString()}
			className="relative aspect-square overflow-hidden rounded-lg"
		>
			<Image
				src={image.src}
				alt={image.alt || image.title || `Gallery image ${index + 1}`}
				fill
				className="object-cover transition-transform hover:scale-105"
			/>
		</div>
	));

	return (
		<SectionContainer id={sectionId} className={className}>
			<div className="mx-auto mb-12 max-w-3xl text-center">
				<Content>
					<Content.Title
						title={title}
						highlightText={highlightText}
						titleSuffix={titleSuffix}
						textAlign="center"
					/>
					<Content.AdaptiveText textContent={description} textAlign="center" />
				</Content>
			</div>

			<Masonry
				items={imageItems}
				columnBreakpoints={{
					sm: 1,
					md: 2,
					lg: columns,
					xl: columns,
				}}
				className="gap-4"
				fillOrder="middleFirst"
			/>

			{viewMoreLink && (
				<div className="mt-8 text-center">
					<ActionButton
						name={viewMoreText}
						href={viewMoreLink}
						buttonVariant="default"
					/>
				</div>
			)}
		</SectionContainer>
	);
};

export default ImageGallery;

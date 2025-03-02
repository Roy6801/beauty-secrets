import { Content } from "@/components/Content";
import { SectionContainer } from "@/components/SectionContainer";
import type { SectionHeader } from "@/types";
import Image from "next/image";

export type TestimonialItem = {
	name: string;
	service: string;
	comment: string;
	rating: number;
	avatarUrl?: string;
};

type TestimonialCardsProps = {
	testimonials: TestimonialItem[];
	sectionId?: string;
	className?: string;
} & SectionHeader;

const TestimonialCards = ({
	title,
	highlightText,
	titleSuffix,
	description,
	testimonials,
	sectionId,
	className,
}: TestimonialCardsProps) => {
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
			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{testimonials.map((testimonial, index) => (
					<div
						key={index.toString()}
						className="rounded-lg border bg-background p-6"
					>
						<div className="mb-4 flex items-center gap-4">
							<div className="relative h-12 w-12 overflow-hidden rounded-full">
								<Image
									src={
										testimonial.avatarUrl ||
										`/placeholder.svg?height=100&width=100&text=${testimonial.name.charAt(0)}`
									}
									alt={testimonial.name}
									fill
									className="object-cover"
								/>
							</div>
							<div>
								<h4 className="font-semibold">{testimonial.name}</h4>
								<p className="text-muted-foreground text-sm">
									{testimonial.service}
								</p>
							</div>
						</div>
						<p className="italic">{testimonial.comment}</p>
						<div className="mt-4 flex">
							{Array.from({ length: 5 }).map((_, i) => (
								<svg
									key={i.toString()}
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill={i < testimonial.rating ? "currentColor" : "none"}
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="text-primary"
								>
									<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
								</svg>
							))}
						</div>
					</div>
				))}
			</div>
		</SectionContainer>
	);
};

export default TestimonialCards;

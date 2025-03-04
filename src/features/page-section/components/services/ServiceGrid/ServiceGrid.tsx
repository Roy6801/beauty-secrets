import {
	ActionButton,
	type ActionButtonProps,
} from "@/components/ActionButton";
import { Content, type AdaptiveTextContent } from "@/components/Content";
import { Icon, type IconName } from "@/components/Icon";
import { SectionContainer } from "@/components/SectionContainer";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SectionHeader } from "@/types";

type Item = {
	name: string;
	description: AdaptiveTextContent;
	icon?: IconName;
	caption?: AdaptiveTextContent;
	action?: ActionButtonProps;
};

type Props = {
	items: Item[];
	sectionId?: string;
	className?: string;
} & SectionHeader;

const ServiceGrid = ({
	title,
	highlightText,
	titleSuffix,
	description,
	items,
	sectionId,
	className,
}: Props) => {
	return (
		<SectionContainer
			id={sectionId}
			className={cn("flex flex-col gap-16", className)}
			containerClassName="pt-24 pb-32"
		>
			<div className="mx-auto max-w-4xl text-center">
				<Content.Title
					title={title}
					highlightText={highlightText}
					titleSuffix={titleSuffix}
					as="h2"
					className="text-4xl md:text-5xl lg:text-6xl"
				/>
				<Content.AdaptiveText
					textContent={description}
					className="text-base md:text-lg lg:text-xl"
				/>
			</div>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{items.map((item, index) => (
					<Card
						key={index.toString()}
						className="group transition-all hover:shadow-md"
					>
						<CardHeader>
							{item.icon && (
								<div className="mb-2 text-primary">
									<Icon name={item.icon} className="h-6 w-6" />
								</div>
							)}
							<CardTitle>
								<Content.Title
									title={item.name}
									as="h3"
									className="font-semibold text-base md:text-lg lg:text-xl"
								/>
							</CardTitle>
							<CardDescription>
								<Content.AdaptiveText
									textContent={item.description}
									className="text-xs md:text-sm lg:text-base"
								/>
							</CardDescription>
						</CardHeader>

						<CardContent>
							{item.caption && (
								<Content.AdaptiveText
									textContent={item.caption}
									className="font-medium text-sm md:text-base lg:text-lg"
								/>
							)}
						</CardContent>

						{item.action && (
							<CardFooter>
								<ActionButton {...item.action} />
							</CardFooter>
						)}
					</Card>
				))}
			</div>
		</SectionContainer>
	);
};

export default ServiceGrid;

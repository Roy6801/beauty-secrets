import { ActionButton } from "@/components/ActionButton";
import { Content } from "@/components/Content";
import { Icon, type IconName } from "@/components/Icon";
import { SectionContainer } from "@/components/SectionContainer";
import type { SectionHeader } from "@/types";

export type ServiceItem = {
	name: string;
	description: string;
	price: number;
	icon: IconName;
	learnMoreLink?: string;
};

type ServiceGridProps = {
	services: ServiceItem[];
	sectionId?: string;
	className?: string;
} & SectionHeader;

const ServiceGrid = ({
	title,
	highlightText,
	titleSuffix,
	description,
	services,
	sectionId,
	className,
}: ServiceGridProps) => {
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
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{services.map((service, index) => (
					<div
						key={index.toString()}
						className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-md"
					>
						<div className="mb-4 text-primary">
							<Icon name={service.icon} className="h-6 w-6" />
						</div>
						<h3 className="font-semibold text-xl">{service.name}</h3>
						<p className="mt-2 text-muted-foreground">{service.description}</p>
						<p className="mt-4 font-medium">Starting from ${service.price}</p>
						{service.learnMoreLink && (
							<ActionButton
								name="Learn more"
								href={service.learnMoreLink}
								buttonVariant="link"
								className="mt-2 h-auto p-0"
							/>
						)}
					</div>
				))}
			</div>
		</SectionContainer>
	);
};

export default ServiceGrid;

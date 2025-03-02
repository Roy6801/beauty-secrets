import { Content } from "@/components/Content";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { SectionContainer } from "@/components/SectionContainer";
import { Button } from "@/components/ui/button";
import type { SectionHeader } from "@/types";

export type ContactInfo = {
	type: "address" | "phone" | "email" | "hours";
	icon: IconName;
	content: string;
	hoursDetails?: string[];
};

export type SocialLink = {
	platform: string;
	icon: IconName;
	url: string;
};

export type ServiceOption = {
	label: string;
	value: string;
};

type ContactWithFormProps = {
	contactInfo: ContactInfo[];
	socialLinks?: SocialLink[];
	serviceOptions?: ServiceOption[];
	formTitle?: string;
	formSubmitText?: string;
	formEndpoint?: string;
	sectionId?: string;
	className?: string;
} & SectionHeader;

const ContactWithForm = ({
	title,
	highlightText,
	titleSuffix,
	description,
	contactInfo,
	socialLinks,
	serviceOptions,
	formTitle = "Send us a message",
	formSubmitText = "Send Message",
	formEndpoint,
	sectionId,
	className,
}: ContactWithFormProps) => {
	return (
		<SectionContainer id={sectionId} className={className}>
			<div className="grid gap-12 md:grid-cols-2">
				<div>
					<Content>
						<Content.Title
							title={title}
							highlightText={highlightText}
							titleSuffix={titleSuffix}
						/>
						<Content.AdaptiveText textContent={description} />
					</Content>

					<div className="mt-8 space-y-4">
						{contactInfo.map((info, index) => (
							<div key={index.toString()} className="flex items-start gap-3">
								<Icon name={info.icon} className="mt-1 h-5 w-5 text-primary" />
								<div>
									{info.type === "hours" ? (
										<div>
											<p>{info.content}</p>
											{info.hoursDetails?.map((hour, idx) => (
												<p
													key={idx.toString()}
													className="text-muted-foreground"
												>
													{hour}
												</p>
											))}
										</div>
									) : (
										<span>{info.content}</span>
									)}
								</div>
							</div>
						))}
					</div>

					{socialLinks && socialLinks.length > 0 && (
						<div className="mt-8 flex gap-4">
							{socialLinks.map((link, index) => (
								<Button
									key={index.toString()}
									size="icon"
									variant="outline"
									asChild
								>
									<a href={link.url} target="_blank" rel="noopener noreferrer">
										<Icon name={link.icon} className="h-5 w-5" />
										<span className="sr-only">{link.platform}</span>
									</a>
								</Button>
							))}
						</div>
					)}
				</div>

				<div className="rounded-lg border bg-background p-6">
					<h3 className="mb-4 font-semibold text-xl">{formTitle}</h3>
					<form className="space-y-4" action={formEndpoint} method="POST">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<label htmlFor="name" className="font-medium text-sm">
									Name
								</label>
								<input
									id="name"
									name="name"
									placeholder="Your name"
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								/>
							</div>
							<div className="space-y-2">
								<label htmlFor="email" className="font-medium text-sm">
									Email
								</label>
								<input
									id="email"
									name="email"
									type="email"
									placeholder="Your email"
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								/>
							</div>
						</div>
						<div className="space-y-2">
							<label htmlFor="phone" className="font-medium text-sm">
								Phone
							</label>
							<input
								id="phone"
								name="phone"
								placeholder="Your phone number"
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							/>
						</div>

						{serviceOptions && serviceOptions.length > 0 && (
							<div className="space-y-2">
								<label htmlFor="service" className="font-medium text-sm">
									Service Interested In
								</label>
								<select
									id="service"
									name="service"
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								>
									<option value="">Select a service</option>
									{serviceOptions.map((option, index) => (
										<option key={index.toString()} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</div>
						)}

						<div className="space-y-2">
							<label htmlFor="message" className="font-medium text-sm">
								Message
							</label>
							<textarea
								id="message"
								name="message"
								placeholder="Your message"
								rows={4}
								className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							/>
						</div>
						<Button type="submit" className="w-full">
							{formSubmitText}
						</Button>
					</form>
				</div>
			</div>
		</SectionContainer>
	);
};

export default ContactWithForm;

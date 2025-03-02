import { websiteUrl } from "@/constants";
import type { OGImage } from "../types";
import type { TemplateData } from "../types";

export const getOGImage = (
	useVercelOG: boolean,
	ogTemplate: TemplateData | null,
	imageUrl: string,
	title: string,
): OGImage[] => {
	if (!(useVercelOG && ogTemplate)) {
		return [{ url: imageUrl, width: 1200, height: 630, alt: title }];
	}

	const templateType = ogTemplate?.defaultTemplate ? "default" : "featured";
	const ogEndpoint =
		templateType === "featured" ? "/api/og/featured" : "/api/og/default";
	const searchParams = new URLSearchParams();

	if (templateType === "featured" && ogTemplate.featuredTemplate) {
		const featured = ogTemplate.featuredTemplate;
		searchParams.set("title", featured.title);
		searchParams.set("tagline", featured.tagline);
		searchParams.set("image", featured.imageUrl);
		if (featured.iconUrl) {
			searchParams.set("icon", featured.iconUrl);
		}
		searchParams.set("size", "512");
		searchParams.set("frame", featured.frame);
	} else if (ogTemplate.defaultTemplate) {
		const defaultTemplate = ogTemplate.defaultTemplate;
		searchParams.set("title", defaultTemplate.title);
		if (defaultTemplate.highlightText) {
			searchParams.set("highlightText", defaultTemplate.highlightText);
		}
		if (defaultTemplate.titleSuffix) {
			searchParams.set("titleSuffix", defaultTemplate.titleSuffix);
		}
	}

	const ogImageUrl = `${websiteUrl}${ogEndpoint}?${searchParams.toString()}`;
	return [{ url: ogImageUrl, width: 1200, height: 630, alt: title }];
};

export const getOGUrl = (slug: string) => {
	if (slug.startsWith("/")) {
		return `${websiteUrl}${slug}`;
	}
	return `${websiteUrl}/${slug}`;
};

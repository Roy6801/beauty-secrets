import type { DYNAMIC_PAGE_QUERYResult } from "~/sanity.types";

export type Sections = NonNullable<
	NonNullable<DYNAMIC_PAGE_QUERYResult>["sections"]
>;

export type Section = Sections[number];

export type Fields = Record<string, string | object>;

export type SanityImage = {
	_type: "image";
	asset?: {
		_ref: string;
	};
};

export type OGImage = {
	url: string;
	width: number;
	height: number;
	alt: string;
};

export type TemplateData = {
	defaultTemplate?: {
		title: string;
		highlightText?: string;
		titleSuffix?: string;
	};
	featuredTemplate?: {
		title: string;
		tagline: string;
		imageUrl: string;
		frame: string;
		iconUrl?: string;
	};
};

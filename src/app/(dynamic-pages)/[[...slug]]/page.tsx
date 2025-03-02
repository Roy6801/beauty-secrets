import {
	ALL_DYNAMIC_PAGES_QUERY,
	DYNAMIC_PAGE_QUERY,
	type TemplateData,
	buildQueryString,
	cleanSlug,
	evaluateSections,
	getOGImage,
	getOGUrl,
	resolvePath,
} from "@/features/dynamic-page";
import { DYNAMIC_PAGE_METADATA_QUERY } from "@/features/dynamic-page/queries";
import { sanityFetch } from "@/sanity/lib/live";
import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import { notFound } from "next/navigation";

const getAllDynamicPagesData = async (
	isGeneratingStaticParams?: boolean,
	disableStega?: boolean,
) => {
	const { data } = await sanityFetch({
		query: ALL_DYNAMIC_PAGES_QUERY,
		perspective: isGeneratingStaticParams ? "published" : "previewDrafts",
		stega: !disableStega,
	});

	return data;
};

export const generateStaticParams = async () => {
	const data = await getAllDynamicPagesData(true, true);

	if (!data) {
		return [];
	}

	const dynamicPages = data.filter(
		(page): page is { slug: string } => !!page.slug,
	);

	return dynamicPages.map((page) => {
		const stegaClearedSlug = stegaClean(page.slug);
		// Clean the slug before creating segments
		const segments = cleanSlug(stegaClearedSlug);

		return {
			slug: segments,
		};
	});
};

export const generateMetadata = async (props: {
	params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> => {
	const { slug = [] } = await props.params;
	const matchPath = resolvePath(slug);

	const { data } = await sanityFetch({
		query: DYNAMIC_PAGE_METADATA_QUERY,
		params: { slug: matchPath },
		perspective: "published",
		stega: false,
	});

	if (!data?.metadata) {
		return {};
	}

	const {
		title,
		description,
		imageUrl,
		siteName,
		openGraph,
		twitter,
		useVercelOG,
		ogTemplate,
	} = data.metadata;

	const stegaClearedTitle = stegaClean(title);
	const stegaClearedDescription = stegaClean(description);
	const stegaClearedImageUrl = stegaClean(imageUrl);
	const stegaClearedSiteName = stegaClean(siteName);
	const stegaClearedType = stegaClean(openGraph?.type);
	const stegaClearedCard = stegaClean(twitter?.card);

	const images = getOGImage(
		Boolean(useVercelOG),
		ogTemplate as TemplateData,
		stegaClearedImageUrl || "",
		stegaClearedTitle || "",
	);
	const ogUrl = getOGUrl(stegaClean(data.slug) || "");

	const pageMetadata = {
		title: stegaClearedTitle,
		description: stegaClearedDescription,
		openGraph: {
			title: stegaClearedTitle,
			description: stegaClearedDescription,
			images,
			type: stegaClearedType,
			siteName: stegaClearedSiteName,
			url: ogUrl,
		},
		twitter: {
			title: stegaClearedTitle,
			description: stegaClearedDescription,
			images,
			card: stegaClearedCard,
			site: stegaClearedSiteName,
		},
	} as Metadata;

	return pageMetadata;
};

// biome-ignore lint/suspicious/noExplicitAny: For dynamic rendering
const buildPage = (sectionComponents: any) => {
	return sectionComponents.map(
		// @ts-ignore
		({ component, componentData, section, category }, index) => {
			const Component = component;
			return (
				<Component
					key={`${section}-${category}-${index.toString()}`}
					{...componentData}
				/>
			);
		},
	);
};

const DynamicPage = async (props: { params: Promise<{ slug?: string[] }> }) => {
	const { slug = [] } = await props.params;
	const matchPath = resolvePath(slug);

	const { data } = await sanityFetch({
		query: DYNAMIC_PAGE_QUERY,
		params: { slug: matchPath },
	});

	if (!data?.sections) {
		notFound();
	}

	const query = buildQueryString(data?.sections || []);

	const { data: dynamicPageData } = await sanityFetch({
		query,
		params: { slug: matchPath },
	});

	const sectionComponents = evaluateSections(dynamicPageData.sections);

	return <>{buildPage(sectionComponents)}</>;
};

export default DynamicPage;

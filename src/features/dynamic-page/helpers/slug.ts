export const cleanSlug = (slug: string | string[]): string[] => {
	if (typeof slug === "string") {
		return slug
			.replace(/^\/+|\/+$/g, "")
			.split("/")
			.filter(Boolean);
	}
	return slug.filter(Boolean);
};

export const resolvePath = (slug: string | string[]): string => {
	const segments = cleanSlug(slug);
	return segments.length > 0 ? `/${segments.join("/")}` : "/";
};

export const getPageNameByRootPath = (slug: string | string[]): string => {
	const segments = cleanSlug(slug);
	const rootPath = segments.length > 0 ? segments[0]! : "splash";
	return rootPath;
};

import { defineQuery } from "next-sanity";

export const ALL_DYNAMIC_PAGES_QUERY = defineQuery(`*[_type == "dynamicPage"]{
	"slug": slug.current,
	}`);

export const DYNAMIC_PAGE_QUERY = defineQuery(`
	*[_type == "dynamicPage" && slug.current == $slug][0]{
	title,
	"slug": slug.current,
	"sections": sections[]->{
		title,
		category,
		section,
	}
}`);

export const DYNAMIC_PAGE_METADATA_QUERY = defineQuery(`
	*[_type == "dynamicPage" && slug.current == $slug][0]{
		title,
		"slug": slug.current,
		"metadata": metadata{
			title,
			description,
			useVercelOG,
			"imageUrl": image.asset->url,
			siteName,
			ogTemplate{
				templateType,
				defaultTemplate{
					title,
					highlightText,
					titleSuffix,
				},
				featuredTemplate{
					"imageUrl": image.asset->url,
					"iconUrl": icon.asset->url,
					title,
					tagline,
					frame,
				}
			},
			openGraph{
				type,
			},
			twitter{
				card,
			}
		}
	}`);

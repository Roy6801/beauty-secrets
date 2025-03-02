import { sectionMap } from "@/features/page-section/__generated__/map";
import { defineQuery, stegaClean } from "next-sanity";
import type { Sections } from "../types";

export const buildQueryString = (sections: Sections) => {
	let queryStructure = "";

	for (const sectionObj of sections) {
		const { section, category } = sectionObj;

		if (!(section && category)) {
			continue;
		}

		const stegaClearedCategory = stegaClean(category);
		const stegaClearedSection = stegaClean(section);

		const sectionQuery =
			// @ts-ignore
			sectionMap[stegaClearedCategory]?.[stegaClearedSection]?.query;

		if (!sectionQuery) {
			continue;
		}

		queryStructure += `
			${stegaClearedSection}{
				${sectionQuery}
			},
		`;
	}

	return defineQuery(`*[_type == "dynamicPage" && slug.current == $slug][0]{
		"title": title,
		"slug": slug.current,
		"sections": sections[]->{
			title,
			category,
			section,
			${queryStructure}
		}
	}`);
};

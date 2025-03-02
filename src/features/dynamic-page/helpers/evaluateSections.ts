import { components } from "@/features/page-section/__generated__/components";
import { stegaClean } from "next-sanity";
import type { Sections } from "../types";

export const evaluateSections = (sections: Sections) => {
	return sections.map((sectionObj) => {
		const { section, category } = sectionObj;

		if (!(section && category)) {
			throw new Error("Section or category is missing");
		}

		const stegaClearedCategory = stegaClean(category);
		const stegaClearedSection = stegaClean(section);

		const componentMatch = components[stegaClearedCategory]?.find(
			(component) => component.name === stegaClearedSection,
		);

		if (!componentMatch) {
			throw new Error("Valid component not found");
		}

		const componentData =
			sectionObj[stegaClearedSection as keyof typeof sectionObj];

		// console.log({ componentData });

		return {
			section: stegaClearedSection,
			category: stegaClearedCategory,
			component: componentMatch.component,
			componentData,
		};
	});
};

import type { SchemaTypeDefinition } from "sanity";

import { actionType } from "./actionType";
import { dynamicPageType } from "./dynamicPage/dynamicPageType";
import { pageMetadataType } from "./dynamicPage/pageMetadataType";
import { pageSectionType } from "./dynamicPage/pageSectionType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [dynamicPageType, pageMetadataType, pageSectionType, actionType],
};

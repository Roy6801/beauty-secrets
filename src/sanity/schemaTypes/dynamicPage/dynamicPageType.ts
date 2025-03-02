import { defineField, defineType } from "sanity";
import { pageMetadataType } from "./pageMetadataType";

export const dynamicPageType = defineType({
	name: "dynamicPage",
	title: "Dynamic Page",
	type: "document",
	groups: [
		{
			name: "details",
			title: "Page Details",
		},
		{
			name: "sections",
			title: "Page Sections",
		},
		{
			name: "metadata",
			title: "Page Metadata",
		},
	],
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: "The title of the page",
			validation: (Rule) => Rule.required(),
			group: "details",
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description: "The slug of the page",
			validation: (Rule) => Rule.required(),
			group: "details",
		}),
		defineField({
			name: "sections",
			type: "array",
			title: "Sections",
			description: "The sections of the page",
			of: [{ type: "reference", to: [{ type: "pageSection" }] }],
			validation: (Rule) => Rule.required(),
			group: "sections",
		}),
		pageMetadataType,
	],
});

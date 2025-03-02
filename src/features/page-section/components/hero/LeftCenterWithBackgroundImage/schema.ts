import { defineField } from "sanity";

export default defineField({
	name: "LeftCenterWithBackgroundImage",
	type: "object",
	title: "Hero: Left Center With Background",
	hidden: ({ parent }) =>
		!(
			parent?.category === "hero" &&
			parent?.section === "LeftCenterWithBackgroundImage"
		),
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "highlightText",
			type: "string",
			title: "Highlight Text",
		}),
		defineField({
			name: "titleSuffix",
			type: "string",
			title: "Title Suffix",
		}),
		defineField({
			name: "description",
			type: "array",
			title: "Description",
			of: [{ type: "block" }],
		}),
		defineField({
			name: "heroImage",
			type: "image",
			title: "Hero Image",
			fields: [
				{
					name: "alt",
					type: "string",
					title: "Alternative Text",
				},
			],
		}),
		defineField({
			name: "actions",
			type: "array",
			title: "Actions",
			of: [{ type: "actionButton" }],
		}),
	],
});

import { defineField } from "sanity";

export default defineField({
	name: "HeroWithBackground",
	type: "object",
	title: "Hero: Hero With Background",
	hidden: ({ parent }) =>
		!(parent?.category === "hero" && parent?.section === "HeroWithBackground"),
	fields: [
		defineField({
			name: "sectionId",
			type: "string",
			title: "Section ID",
		}),
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
			of: [{ type: "action" }],
		}),
	],
});

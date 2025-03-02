import { defineField } from "sanity";

export default defineField({
	name: "ImageWithContent",
	type: "object",
	title: "About: Image With Content",
	hidden: ({ parent }) =>
		!(parent?.category === "about" && parent?.section === "ImageWithContent"),
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
			name: "image",
			type: "image",
			title: "Image",
			fields: [
				{
					name: "alt",
					type: "string",
					title: "Alternative Text",
				},
			],
		}),
		defineField({
			name: "imagePosition",
			type: "string",
			title: "Image Position",
			options: {
				list: [
					{ title: "Left", value: "left" },
					{ title: "Right", value: "right" },
				],
			},
			initialValue: "left",
		}),
		defineField({
			name: "actions",
			type: "array",
			title: "Actions",
			of: [{ type: "actionButton" }],
		}),
		defineField({
			name: "sectionId",
			type: "string",
			title: "Section ID",
			initialValue: "about",
		}),
	],
});

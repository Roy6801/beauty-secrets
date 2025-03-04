import { defineField } from "sanity";

export default defineField({
	name: "ImageGallery",
	type: "object",
	title: "Gallery: Image Gallery",
	hidden: ({ parent }) =>
		!(parent?.category === "gallery" && parent?.section === "ImageGallery"),
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
			name: "columns",
			type: "number",
			title: "Number of Columns",
			options: {
				list: [
					{ title: "2", value: 2 },
					{ title: "3", value: 3 },
					{ title: "4", value: 4 },
				],
			},
			initialValue: 4,
		}),
		defineField({
			name: "images",
			type: "array",
			title: "Gallery Images",
			of: [
				{
					type: "image",
					fields: [
						{
							name: "alt",
							type: "string",
							title: "Alternative Text",
						},
						{
							name: "title",
							type: "string",
							title: "Image Title",
						},
					],
				},
			],
		}),
		defineField({
			name: "viewMoreLink",
			type: "string",
			title: "View More Link",
		}),
		defineField({
			name: "viewMoreText",
			type: "string",
			title: "View More Button Text",
			initialValue: "View More",
		}),
	],
});

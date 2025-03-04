import { defineField } from "sanity";

export default defineField({
	name: "ServiceGrid",
	type: "object",
	title: "Services: Service Grid",
	hidden: ({ parent }) =>
		!(parent?.category === "services" && parent?.section === "ServiceGrid"),
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
			name: "items",
			type: "array",
			title: "Service Items",
			validation: (Rule) =>
				Rule.required().min(2).error("At least one service item is required"),
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "name",
							type: "string",
							title: "Service Name",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "description",
							type: "array",
							title: "Description",
							of: [{ type: "block" }],
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "icon",
							type: "string",
							title: "Icon Name",
							description: "Lucide icon name",
						}),
						defineField({
							name: "caption",
							type: "array",
							title: "Caption",
							of: [{ type: "block" }],
						}),
						defineField({
							name: "action",
							type: "action",
							title: "Action Button",
						}),
					],
				},
			],
		}),
	],
});

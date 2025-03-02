import { defineField } from "sanity";

export default defineField({
	name: "ServiceGrid",
	type: "object",
	title: "Services: Service Grid",
	hidden: ({ parent }) =>
		!(parent?.category === "services" && parent?.section === "ServiceGrid"),
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
			name: "services",
			type: "array",
			title: "Services",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "name",
							type: "string",
							title: "Service Name",
						}),
						defineField({
							name: "description",
							type: "text",
							title: "Description",
						}),
						defineField({
							name: "price",
							type: "number",
							title: "Starting Price",
						}),
						defineField({
							name: "icon",
							type: "string",
							title: "Icon Name",
							description: "Lucide icon name",
						}),
						defineField({
							name: "learnMoreLink",
							type: "string",
							title: "Learn More Link",
						}),
					],
				},
			],
		}),
		defineField({
			name: "sectionId",
			type: "string",
			title: "Section ID",
			initialValue: "services",
		}),
	],
});

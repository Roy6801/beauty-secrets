import { defineField } from "sanity";

export default defineField({
	name: "TestimonialCards",
	type: "object",
	title: "Testimonials: Testimonial Cards",
	hidden: ({ parent }) =>
		!(
			parent?.category === "testimonials" &&
			parent?.section === "TestimonialCards"
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
			name: "testimonials",
			type: "array",
			title: "Testimonials",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "name",
							type: "string",
							title: "Client Name",
						}),
						defineField({
							name: "service",
							type: "string",
							title: "Service Used",
						}),
						defineField({
							name: "comment",
							type: "text",
							title: "Testimonial Comment",
						}),
						defineField({
							name: "rating",
							type: "number",
							title: "Rating (1-5)",
							validation: (Rule) => Rule.min(1).max(5),
						}),
						defineField({
							name: "avatar",
							type: "image",
							title: "Client Avatar",
						}),
					],
				},
			],
		}),
		defineField({
			name: "sectionId",
			type: "string",
			title: "Section ID",
			initialValue: "testimonials",
		}),
	],
});

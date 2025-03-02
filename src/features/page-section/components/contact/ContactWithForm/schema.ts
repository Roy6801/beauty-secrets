import { defineField } from "sanity";

export default defineField({
	name: "ContactWithForm",
	type: "object",
	title: "Contact: Contact With Form",
	hidden: ({ parent }) =>
		!(parent?.category === "contact" && parent?.section === "ContactWithForm"),
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
			name: "formTitle",
			type: "string",
			title: "Form Title",
			initialValue: "Send us a message",
		}),
		defineField({
			name: "formSubmitText",
			type: "string",
			title: "Form Submit Button Text",
			initialValue: "Send Message",
		}),
		defineField({
			name: "formEndpoint",
			type: "string",
			title: "Form Submission Endpoint",
		}),
		defineField({
			name: "contactInfo",
			type: "array",
			title: "Contact Information",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "type",
							type: "string",
							title: "Type",
							options: {
								list: [
									{ title: "Address", value: "address" },
									{ title: "Phone", value: "phone" },
									{ title: "Email", value: "email" },
									{ title: "Hours", value: "hours" },
								],
							},
						}),
						defineField({
							name: "icon",
							type: "string",
							title: "Icon Name",
							description: "Lucide icon name",
						}),
						defineField({
							name: "content",
							type: "string",
							title: "Content",
						}),
						defineField({
							name: "hoursDetails",
							type: "array",
							title: "Hours Details",
							hidden: ({ parent }) => parent?.type !== "hours",
							of: [{ type: "string" }],
						}),
					],
				},
			],
		}),
		defineField({
			name: "socialLinks",
			type: "array",
			title: "Social Links",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "platform",
							type: "string",
							title: "Platform Name",
						}),
						defineField({
							name: "icon",
							type: "string",
							title: "Icon Name",
							description: "Lucide icon name",
						}),
						defineField({
							name: "url",
							type: "string",
							title: "URL",
						}),
					],
				},
			],
		}),
		defineField({
			name: "serviceOptions",
			type: "array",
			title: "Service Options",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "label",
							type: "string",
							title: "Label",
						}),
						defineField({
							name: "value",
							type: "string",
							title: "Value",
						}),
					],
				},
			],
		}),
		defineField({
			name: "sectionId",
			type: "string",
			title: "Section ID",
			initialValue: "contact",
		}),
	],
});

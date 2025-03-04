import { defineField } from "sanity";

export const pageMetadataType = defineField({
	name: "metadata",
	title: "Metadata",
	type: "object",
	description: "The metadata for the page",
	validation: (Rule) => Rule.required(),
	group: "metadata",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			type: "text",
			title: "Description",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "useVercelOG",
			type: "boolean",
			title: "Use Vercel OG Image Generation",
			description:
				"Toggle between regular image upload and Vercel OG image generation",
			initialValue: true,
		}),
		defineField({
			name: "image",
			type: "image",
			title: "Image",
			validation: (Rule) =>
				Rule.custom((field, context) => {
					// @ts-ignore - context.document type is not properly inferred
					if (!(context.document?.metadata?.useVercelOG || field)) {
						return "Image is required when not using Vercel OG";
					}
					return true;
				}),
			// @ts-ignore
			hidden: ({ document }) => document?.metadata?.useVercelOG,
		}),
		defineField({
			name: "ogTemplate",
			type: "object",
			title: "OG Template Type",
			// @ts-ignore
			hidden: ({ document }) => !document?.metadata?.useVercelOG,
			fields: [
				defineField({
					name: "templateType",
					type: "string",
					title: "Template Type",
					options: {
						list: [
							{ title: "Default", value: "default" },
							{ title: "Featured", value: "featured" },
						],
					},
					initialValue: "default",
				}),
				// Default template fields
				defineField({
					name: "defaultTemplate",
					type: "object",
					title: "Default Template Settings",
					hidden: ({ parent }) => parent?.templateType !== "default",
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
					],
				}),
				// Featured template fields
				defineField({
					name: "featuredTemplate",
					type: "object",
					title: "Featured Template Settings",
					hidden: ({ parent }) => parent?.templateType !== "featured",
					fields: [
						defineField({
							name: "image",
							type: "image",
							title: "Featured Image",
						}),
						defineField({
							name: "icon",
							type: "image",
							title: "Icon",
						}),
						defineField({
							name: "title",
							type: "string",
							title: "Title",
						}),
						defineField({
							name: "tagline",
							type: "string",
							title: "Tagline",
						}),
						defineField({
							name: "frame",
							type: "string",
							title: "Frame Style",
							description: "Choose the frame style for the OG image",
							options: {
								list: [
									{ title: "Default", value: "default" },
									{ title: "Cover", value: "cover" },
									{ title: "Mobile", value: "mobile" },
								],
							},
							initialValue: "default",
						}),
					],
				}),
			],
		}),
		defineField({
			name: "siteName",
			type: "string",
			title: "Site Name",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "openGraph",
			type: "object",
			title: "Open Graph",
			fields: [
				defineField({
					name: "type",
					type: "string",
					title: "Type",
					options: {
						list: [
							{ title: "Website", value: "website" },
							{ title: "Article", value: "article" },
							{ title: "Profile", value: "profile" },
							{ title: "Book", value: "book" },
							{ title: "Video", value: "video" },
							{ title: "Music", value: "music" },
						],
					},
					initialValue: "website",
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
		defineField({
			name: "twitter",
			type: "object",
			title: "Twitter",
			fields: [
				defineField({
					name: "card",
					type: "string",
					title: "Card",
					options: {
						list: [
							{ title: "Summary Large Image", value: "summary_large_image" },
							{ title: "Summary", value: "summary" },
							{ title: "App", value: "app" },
							{ title: "Player", value: "player" },
						],
					},
					initialValue: "summary_large_image",
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
	],
});

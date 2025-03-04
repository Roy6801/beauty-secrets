import { defineType } from "sanity";

export const actionType = defineType({
	name: "action",
	title: "Action",
	type: "object",
	fields: [
		{
			name: "name",
			title: "Button Text",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "href",
			title: "Button Link",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "variant",
			title: "Button Style",
			type: "string",
			options: {
				list: [
					{ title: "Default", value: "default" },
					{ title: "Destructive", value: "destructive" },
					{ title: "Outline", value: "outline" },
					{ title: "Secondary", value: "secondary" },
					{ title: "Ghost", value: "ghost" },
					{ title: "Link", value: "link" },
				],
			},
			initialValue: "default",
		},
		{
			name: "external",
			title: "Redirect Externally",
			type: "boolean",
			initialValue: false,
		},
		{
			name: "iconRight",
			title: "Icon Right",
			type: "string",
		},
		{
			name: "iconLeft",
			title: "Icon Left",
			type: "string",
		},
	],
});

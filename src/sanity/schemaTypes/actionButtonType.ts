import { defineType } from "sanity";

export const actionButtonType = defineType({
	name: "actionButton",
	title: "Action Button",
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
			name: "primary",
			title: "Is Primary Button",
			type: "boolean",
			initialValue: false,
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

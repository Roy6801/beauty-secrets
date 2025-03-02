import {
	type SectionCategory,
	categories,
	schemas,
	sections,
} from "@/features/page-section/__generated__/map";
import { type StringInputProps, defineType, useFormValue } from "sanity";
import { defineField } from "sanity";

const OverrideListOptions = (props: StringInputProps) => {
	const parent = useFormValue([...props.path.slice(0, -1)]);
	const schemaType = props.schemaType;

	// @ts-ignore
	schemaType.options.list = schemaType.options.listGenerator({
		parent,
		path: props.path,
	});
	return props.renderDefault(props);
};

export const pageSectionType = defineType({
	name: "pageSection",
	title: "Page Section",
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: "The title of the section",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "category",
			type: "string",
			title: "Category",
			description: "The category of the section",
			validation: (Rule) => Rule.required(),
			options: {
				list: [...categories],
			},
		}),
		defineField({
			name: "section",
			type: "string",
			title: "Section",
			description: "The section component of the page",
			components: {
				input: OverrideListOptions,
			},
			hidden: ({ parent }) => !parent?.category,
			options: {
				// @ts-ignore
				listGenerator: ({ parent }: { parent: { category?: string } }) => {
					if (!parent?.category) {
						return [];
					}
					const sectionNames = sections[parent?.category as SectionCategory];
					return sectionNames || [];
				},
			},
			validation: (Rule) => Rule.required(),
		}),
		...Object.values(schemas),
	],
});

import { defineField } from "sanity";

export const getThemeOptions = () =>
	defineField({
		name: "theme",
		title: "Theme",
		type: "string",
		options: {
			list: [
				{ title: "Light", value: "light" },
				{ title: "Dark", value: "dark" },
				{ title: "Neutral", value: "neutral" },
			],
		},
	});

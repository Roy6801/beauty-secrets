export type Size = "sm" | "md" | "lg" | "xl";

export type Breakpoints = {
	[key in Size]: number;
};

export type MsasonryProps = {
	items: React.ReactNode[];
	columnBreakpoints?: Breakpoints;
	windowBreakpoints?: Breakpoints;
	fillOrder?: "regular" | "middleFirst";
	className?: string;
};

export type Position = "left" | "right" | "center";

type BaseProps<T extends React.ElementType> = {
	children?: React.ReactNode;
	as?: T;
	className?: string;
};

export type ContentProps<T extends React.ElementType> = {
	justifyContent?: Position;
	containerClassName?: string;
} & BaseProps<T>;

export type TextProps<T extends React.ElementType> = {
	textAlign?: Position;
} & BaseProps<T>;

import type { Position } from "./types";

export const contentPosition: Record<Position, string> = {
	left: "mr-auto",
	right: "ml-auto",
	center: "mx-auto",
};

export const textPosition: Record<Position, string> = {
	left: "text-left",
	center: "text-center",
	right: "text-right",
};

export const defaultAlignment: Position = "left";

"use client";

/* -----------------Globals--------------- */
import type React from "react";
import { useEffect, useState } from "react";

/* -----------------Helpers--------------- */
import { cn } from "@/lib/utils";
import { createColumnsMiddleOrder, createColumnsRegularOrder } from "./helpers";

/* -----------------Constants--------------- */
import {
	defaultColumnBreakpoints,
	defaultWindowBreakpoints,
} from "./constants";

/* -----------------Types--------------- */
import type { MsasonryProps, Size } from "./types";

const Masonry = ({
	items,
	columnBreakpoints = defaultColumnBreakpoints,
	windowBreakpoints = defaultWindowBreakpoints,
	fillOrder = "regular",
	className,
}: MsasonryProps) => {
	const [numColumns, setNumColumns] = useState<number>(columnBreakpoints.sm);
	const [columns, setColumns] = useState<React.ReactNode[][]>([]);

	const handleResize = () => {
		const width = window.innerWidth;
		let currentSize: Size = "sm";

		if (width >= windowBreakpoints.xl) {
			currentSize = "xl";
		} else if (width >= windowBreakpoints.lg) {
			currentSize = "lg";
		} else if (width >= windowBreakpoints.md) {
			currentSize = "md";
		}

		setNumColumns(columnBreakpoints[currentSize]);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: Valid use case
	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Valid use case
	useEffect(() => {
		if (fillOrder === "middleFirst") {
			setColumns(createColumnsMiddleOrder(items, numColumns));
		} else {
			setColumns(createColumnsRegularOrder(items, numColumns));
		}
	}, [numColumns, items]);

	return (
		<div className={cn("flex w-full", className)}>
			{columns.map((column, columnIndex) => (
				<div key={columnIndex.toString()} className="flex flex-1 flex-col">
					{column.map((item, itemIndex) => (
						<div key={itemIndex.toString()} className="flex p-1">
							{item}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Masonry;

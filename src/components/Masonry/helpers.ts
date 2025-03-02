const sumOfNaturalNumbers = (n: number) => (n * (n + 1)) / 2;

const getMiddleIndex = (numColumns: number) => {
	const n = numColumns - 1;
	return Math.floor(sumOfNaturalNumbers(n) / numColumns);
};

const getColumnFillOrder = (middleIndex: number, numColumns: number) => {
	const indices = [middleIndex];

	const addIndex = (index: number) => {
		if (index >= 0 && index < numColumns) {
			indices.push(index);
		}
	};

	const fillOrderEven = (i: number) => {
		addIndex(middleIndex + i);
		addIndex(middleIndex - i);
	};

	const fillOrderOdd = (i: number) => {
		addIndex(middleIndex - i);
		addIndex(middleIndex + i);
	};

	for (let i = 1; indices.length < numColumns; i++) {
		if (numColumns % 2 === 0) {
			fillOrderEven(i);
		} else {
			fillOrderOdd(i);
		}
	}

	return indices;
};

export const createColumnsMiddleOrder = (
	items: React.ReactNode[],
	numColumns: number,
) => {
	const newColumns: React.ReactNode[][] = Array.from(
		{ length: numColumns },
		() => [],
	);

	const middleIndex = getMiddleIndex(numColumns);
	const indices = getColumnFillOrder(middleIndex, numColumns);

	items.forEach((item, index) => {
		const columnIndex = indices[index % numColumns];
		if (typeof columnIndex === "number") {
			newColumns[columnIndex]?.push(item);
		}
	});

	return newColumns;
};

export const createColumnsRegularOrder = (
	items: React.ReactNode[],
	numColumns: number,
) => {
	const newColumns: React.ReactNode[][] = Array.from(
		{ length: numColumns },
		() => [],
	);

	items.forEach((item, index) => {
		const columnIndex = index % numColumns;
		newColumns[columnIndex]?.push(item);
	});

	return newColumns;
};

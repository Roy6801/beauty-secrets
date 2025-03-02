import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Directory paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, "..");
const SECTIONS_DIR = path.join(ROOT_DIR, "src/features/page-section");
const GENERATED_DIR = path.join(SECTIONS_DIR, "__generated__");

// File patterns
const COMPONENTS_DIR_NAME = "components";

// Generated file content
const GENERATED_FILE_HEADER =
	"// This file is auto-generated. Do not edit directly.\n\n";

const isValidComponentDirectory = (
	entry: { isDirectory: () => boolean },
	fullPath: string,
): boolean => {
	const pathParts = fullPath.split(path.sep);
	const componentDirIndex = pathParts.indexOf(COMPONENTS_DIR_NAME);

	// Check if this is a directory under a category folder
	// e.g., components/hero/MobileFrameRight or components/marketing/LogoClouds
	return (
		entry.isDirectory() &&
		fullPath.includes(COMPONENTS_DIR_NAME) &&
		componentDirIndex >= 0 &&
		pathParts.length === componentDirIndex + 3 // components/category/componentName
	);
};

const extractExports = (
	dirPath: string,
): { componentName: string; hasSchema: true; hasQuery: true } => {
	const dirName = path.basename(dirPath);
	return {
		componentName: dirName,
		hasSchema: true,
		hasQuery: true,
	};
};

const findSectionComponents = async (
	dir: string,
): Promise<
	Array<{
		path: string;
		exportName: string;
		hasSchema: boolean;
		hasQuery: boolean;
	}>
> => {
	const components: Array<{
		path: string;
		exportName: string;
		hasSchema: boolean;
		hasQuery: boolean;
	}> = [];
	const entries = await fs.readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			if (isValidComponentDirectory(entry, fullPath)) {
				const { componentName, hasSchema } = extractExports(fullPath);
				components.push({
					path: fullPath,
					exportName: componentName,
					hasSchema,
					hasQuery: true,
				});
				// biome-ignore lint/suspicious/noConsoleLog lint/suspicious/noConsole: Logging
				console.log(`✅ Found component: ${componentName} in ${fullPath}`);
			} else {
				components.push(...(await findSectionComponents(fullPath)));
			}
		}
	}

	return components;
};

const getCategoryAndPath = (
	dir: string,
): {
	category: string | undefined;
	relativePath: string;
} => {
	const pathParts = dir.split(path.sep);
	const componentDirIndex = pathParts.indexOf(COMPONENTS_DIR_NAME);
	const category = pathParts[componentDirIndex + 1];

	// Get path only up to the category directory
	const categoryPath = pathParts.slice(0, componentDirIndex + 2).join(path.sep);
	const relativePath = path.relative(GENERATED_DIR, categoryPath);

	return {
		category,
		relativePath,
	};
};

const buildComponentsAndImports = (
	componentFiles: Array<{
		path: string;
		exportName: string;
		hasSchema: boolean;
		hasQuery: boolean;
	}>,
): {
	components: Record<string, string[]>;
	imports: string[];
	schemaImports: string[];
	queryImports: string[];
	schemasMap: Record<string, string>;
	queriesMap: Record<string, string>;
} => {
	const components: Record<string, string[]> = {};
	const imports: string[] = [];
	const schemaImports: string[] = [];
	const queryImports: string[] = [];
	const schemasMap: Record<string, string> = {};
	const queriesMap: Record<string, string> = {};

	for (const {
		path: file,
		exportName,
		hasSchema,
		hasQuery,
	} of componentFiles) {
		const { category, relativePath } = getCategoryAndPath(file);

		if (!category) {
			// biome-ignore lint/suspicious/noConsoleLog lint/suspicious/noConsole: Logging
			console.warn(`❌ No category found for File: ${file}`);
			continue;
		}

		if (!components[category]) {
			components[category] = [];
		}

		components[category].push(exportName);

		// Import component without Section suffix
		imports.push(
			`import { default as ${exportName} } from "${relativePath}/${exportName}/${exportName}";`,
		);

		if (hasSchema) {
			const schemaName = `${exportName}Schema`;
			schemaImports.push(
				`import { default as ${schemaName} } from "${relativePath}/${exportName}/schema";`,
			);
			schemasMap[exportName] = schemaName;
		}

		if (hasQuery) {
			const queryName = `${exportName}Query`;
			queryImports.push(
				`import { default as ${queryName} } from "${relativePath}/${exportName}/query";`,
			);
			queriesMap[exportName] = queryName;
		}

		// biome-ignore lint/suspicious/noConsoleLog lint/suspicious/noConsole: Logging
		console.log(`📦 Added ${exportName} to category: ${category}`);
	}

	return {
		components,
		imports,
		schemaImports,
		queryImports,
		schemasMap,
		queriesMap,
	};
};

const generateComponentsContent = (
	imports: string[],
	components: Record<string, string[]>,
): string => {
	const componentsString = Object.entries(components)
		.map(([category, comps]) => {
			const componentObjects = comps.map((comp) => {
				return `{ name: "${comp}", component: ${comp} }`;
			});
			return `${category}: [${componentObjects.join(", ")}],`;
		})
		.join("\n\t");

	return `${GENERATED_FILE_HEADER}${imports.join("\n")}

export const components = {
\t${componentsString}
} as const;
`;
};

const generateMapContent = (
	components: Record<string, string[]>,
	schemasMap: Record<string, string>,
	queriesMap: Record<string, string>,
	schemaImports: string[],
	queryImports: string[],
): string => {
	const sectionsMapping = Object.entries(components).reduce(
		(acc, [category, components]) => {
			acc[category] = components;
			return acc;
		},
		{} as Record<string, string[]>,
	);

	const categoryList = Object.keys(components).sort();

	const sectionMapString = Object.entries(components)
		.map(([category, componentNames]) => {
			const componentMappings = componentNames
				.map(
					(name) => `"${name}": {
			name: "${name}",
			schema: ${schemasMap[name]},
			query: ${queriesMap[name]}
		}`,
				)
				.join(",\n\t\t");

			return `${category}: {
		${componentMappings}
	}`;
		})
		.join(",\n\t");

	const schemasString = Object.entries(schemasMap)
		.map(([key, value]) => `\t"${key}": ${value}`)
		.join(",\n");

	const queriesString = Object.entries(queriesMap)
		.map(([key, value]) => `\t"${key}": ${value}`)
		.join(",\n");

	return `${GENERATED_FILE_HEADER}${schemaImports.join("\n")}
${queryImports.join("\n")}

export const sections = ${JSON.stringify(sectionsMapping, null, 2)} as const;

export type SectionName = (typeof sections)[keyof typeof sections][number];

export const categories = ${JSON.stringify(categoryList)} as const;

export type SectionCategory = (typeof categories)[number];

/**
 * Flat map of all section schemas.
 * Used for simplified schema definitions and type checking.
 */
export const schemas = {
${schemasString}
} as const;

/**
 * Flat map of all section queries.
 * Used for simplified query access and type checking.
 */
export const queries = {
${queriesString}
} as const;

/**
 * Nested map of all sections organized by category.
 * Provides quick access to component data with proper typing.
 * 
 * Example:
 * const heroSection = sectionMap.hero.MobileFrameRight;
 * // { name: string, schema: Schema, query: Query }
 */
export const sectionMap = {
	${sectionMapString}
} as const;

export type SectionComponent = {
	name: string;
	schema: unknown;
	query: unknown;
};

export type SectionMapType = typeof sectionMap;
`;
};

const writeOutputFiles = async (
	componentsContent: string,
	mapContent: string,
): Promise<void> => {
	await fs.mkdir(GENERATED_DIR, { recursive: true });

	await fs.writeFile(
		path.join(GENERATED_DIR, "components.ts"),
		componentsContent,
	);
	await fs.writeFile(path.join(GENERATED_DIR, "map.ts"), mapContent);

	// biome-ignore lint/suspicious/noConsoleLog lint/suspicious/noConsole: Logging
	console.log("✨ Generated section components and categories successfully!");
};

const generateComponentsMap = async () => {
	// biome-ignore lint/suspicious/noConsoleLog lint/suspicious/noConsole: Logging
	console.log("🔍 Starting component map generation...");

	const componentFiles = await findSectionComponents(SECTIONS_DIR);

	// biome-ignore lint/suspicious/noConsoleLog lint/suspicious/noConsole: Logging
	console.log(`📊 Found ${componentFiles.length} components total`);

	const {
		components,
		imports,
		schemaImports,
		queryImports,
		schemasMap,
		queriesMap,
	} = buildComponentsAndImports(componentFiles);
	const componentsOutput = generateComponentsContent(imports, components);
	const mapOutput = generateMapContent(
		components,
		schemasMap,
		queriesMap,
		schemaImports,
		queryImports,
	);

	await writeOutputFiles(componentsOutput, mapOutput);
};

generateComponentsMap().catch((error) => {
	// biome-ignore lint/suspicious/noConsoleLog lint/suspicious/noConsole: Logging
	console.error(`❌ Failed to generate component map: ${error.message}`);
});

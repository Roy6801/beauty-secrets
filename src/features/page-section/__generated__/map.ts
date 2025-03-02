// This file is auto-generated. Do not edit directly.

export const sections = {} as const;

export type SectionName = (typeof sections)[keyof typeof sections][number];

export const categories = [] as const;

export type SectionCategory = (typeof categories)[number];

/**
 * Flat map of all section schemas.
 * Used for simplified schema definitions and type checking.
 */
export const schemas = {} as const;

/**
 * Flat map of all section queries.
 * Used for simplified query access and type checking.
 */
export const queries = {} as const;

/**
 * Nested map of all sections organized by category.
 * Provides quick access to component data with proper typing.
 *
 * Example:
 * const heroSection = sectionMap.hero.MobileFrameRight;
 * // { name: string, schema: Schema, query: Query }
 */
export const sectionMap = {} as const;

export type SectionComponent = {
	name: string;
	schema: unknown;
	query: unknown;
};

export type SectionMapType = typeof sectionMap;

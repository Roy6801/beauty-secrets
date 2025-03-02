// This file is auto-generated. Do not edit directly.

import { default as LeftCenterWithBackgroundImageQuery } from "../components/hero/LeftCenterWithBackgroundImage/query";
import { default as LeftCenterWithBackgroundImageSchema } from "../components/hero/LeftCenterWithBackgroundImage/schema";

export const sections = {
	hero: ["LeftCenterWithBackgroundImage"],
} as const;

export type SectionName = (typeof sections)[keyof typeof sections][number];

export const categories = ["hero"] as const;

export type SectionCategory = (typeof categories)[number];

/**
 * Flat map of all section schemas.
 * Used for simplified schema definitions and type checking.
 */
export const schemas = {
	LeftCenterWithBackgroundImage: LeftCenterWithBackgroundImageSchema,
} as const;

/**
 * Flat map of all section queries.
 * Used for simplified query access and type checking.
 */
export const queries = {
	LeftCenterWithBackgroundImage: LeftCenterWithBackgroundImageQuery,
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
	hero: {
		LeftCenterWithBackgroundImage: {
			name: "LeftCenterWithBackgroundImage",
			schema: LeftCenterWithBackgroundImageSchema,
			query: LeftCenterWithBackgroundImageQuery,
		},
	},
} as const;

export type SectionComponent = {
	name: string;
	schema: unknown;
	query: unknown;
};

export type SectionMapType = typeof sectionMap;

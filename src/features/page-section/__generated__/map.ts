// This file is auto-generated. Do not edit directly.

import { default as ImageWithContentQuery } from "../components/about/ImageWithContent/query";
import { default as ImageWithContentSchema } from "../components/about/ImageWithContent/schema";
import { default as ContactWithFormQuery } from "../components/contact/ContactWithForm/query";
import { default as ContactWithFormSchema } from "../components/contact/ContactWithForm/schema";
import { default as ImageGalleryQuery } from "../components/gallery/ImageGallery/query";
import { default as ImageGallerySchema } from "../components/gallery/ImageGallery/schema";
import { default as LeftCenterWithBackgroundImageQuery } from "../components/hero/LeftCenterWithBackgroundImage/query";
import { default as LeftCenterWithBackgroundImageSchema } from "../components/hero/LeftCenterWithBackgroundImage/schema";
import { default as ServiceGridQuery } from "../components/services/ServiceGrid/query";
import { default as ServiceGridSchema } from "../components/services/ServiceGrid/schema";
import { default as TestimonialCardsQuery } from "../components/testimonials/TestimonialCards/query";
import { default as TestimonialCardsSchema } from "../components/testimonials/TestimonialCards/schema";

export const sections = {
	contact: ["ContactWithForm"],
	testimonials: ["TestimonialCards"],
	gallery: ["ImageGallery"],
	about: ["ImageWithContent"],
	hero: ["LeftCenterWithBackgroundImage"],
	services: ["ServiceGrid"],
} as const;

export type SectionName = (typeof sections)[keyof typeof sections][number];

export const categories = [
	"about",
	"contact",
	"gallery",
	"hero",
	"services",
	"testimonials",
] as const;

export type SectionCategory = (typeof categories)[number];

/**
 * Flat map of all section schemas.
 * Used for simplified schema definitions and type checking.
 */
export const schemas = {
	ContactWithForm: ContactWithFormSchema,
	TestimonialCards: TestimonialCardsSchema,
	ImageGallery: ImageGallerySchema,
	ImageWithContent: ImageWithContentSchema,
	LeftCenterWithBackgroundImage: LeftCenterWithBackgroundImageSchema,
	ServiceGrid: ServiceGridSchema,
} as const;

/**
 * Flat map of all section queries.
 * Used for simplified query access and type checking.
 */
export const queries = {
	ContactWithForm: ContactWithFormQuery,
	TestimonialCards: TestimonialCardsQuery,
	ImageGallery: ImageGalleryQuery,
	ImageWithContent: ImageWithContentQuery,
	LeftCenterWithBackgroundImage: LeftCenterWithBackgroundImageQuery,
	ServiceGrid: ServiceGridQuery,
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
	contact: {
		ContactWithForm: {
			name: "ContactWithForm",
			schema: ContactWithFormSchema,
			query: ContactWithFormQuery,
		},
	},
	testimonials: {
		TestimonialCards: {
			name: "TestimonialCards",
			schema: TestimonialCardsSchema,
			query: TestimonialCardsQuery,
		},
	},
	gallery: {
		ImageGallery: {
			name: "ImageGallery",
			schema: ImageGallerySchema,
			query: ImageGalleryQuery,
		},
	},
	about: {
		ImageWithContent: {
			name: "ImageWithContent",
			schema: ImageWithContentSchema,
			query: ImageWithContentQuery,
		},
	},
	hero: {
		LeftCenterWithBackgroundImage: {
			name: "LeftCenterWithBackgroundImage",
			schema: LeftCenterWithBackgroundImageSchema,
			query: LeftCenterWithBackgroundImageQuery,
		},
	},
	services: {
		ServiceGrid: {
			name: "ServiceGrid",
			schema: ServiceGridSchema,
			query: ServiceGridQuery,
		},
	},
} as const;

export type SectionComponent = {
	name: string;
	schema: unknown;
	query: unknown;
};

export type SectionMapType = typeof sectionMap;
